import { useSyncExternalStore } from "react";

export type Consent = { analytics: boolean; marketing: boolean };

const STORAGE_KEY = "gg_cookie_consent";
const CHANGE_EVENT = "gg-consent-change";
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage blocked: behave as "no choice made"
  }
}

function parse(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (
      typeof data?.analytics !== "boolean" ||
      typeof data?.marketing !== "boolean" ||
      typeof data?.savedAt !== "number" ||
      Date.now() - data.savedAt > MAX_AGE_MS
    ) {
      return null;
    }
    return { analytics: data.analytics, marketing: data.marketing };
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange); // other tabs
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * The visitor's saved choice. `undefined` until the browser has hydrated (so
 * nothing consent-related renders on the server), then `null` if they haven't
 * chosen yet (or their choice expired), otherwise the choice.
 */
export function useConsent(): Consent | null | undefined {
  const raw = useSyncExternalStore<string | null | undefined>(subscribe, readRaw, () => undefined);
  return raw === undefined ? undefined : parse(raw);
}

// Google Analytics cookies set once GTM/GA4 has run (_ga, _ga_<id>, _gid, _gat*).
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => /^(_ga(_.*)?|_gid|_gat.*)$/.test(n));
  const parts = window.location.hostname.split(".");
  const domains = [undefined, ...parts.slice(0, -1).map((_, i) => "." + parts.slice(i).join("."))];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function saveConsent(choice: Consent) {
  const wasAnalytics = parse(readRaw())?.analytics === true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...choice, savedAt: Date.now() }));
  } catch {
    // storage blocked: the choice can't be remembered, so nothing is enabled
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  if (wasAnalytics && !choice.analytics) {
    // GTM is already running in this page; the only way to stop it is to reload.
    clearAnalyticsCookies();
    window.location.reload();
  }
}
