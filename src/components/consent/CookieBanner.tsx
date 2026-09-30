"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { saveConsent, useConsent } from "@/lib/consent";
import CookieChoices, { type Choices } from "./CookieChoices";

type View = "default" | "manage";

const learnMore = (
  <Link
    href="/cookie-policy"
    className="font-medium text-[var(--color-brand-primary)] underline underline-offset-2 hover:text-[var(--color-brand-deep)]"
  >
    Learn more
  </Link>
);

export default function CookieBanner() {
  const consent = useConsent();
  const [view, setView] = useState<View>("default");
  const [choices, setChoices] = useState<Choices>({ analytics: false, marketing: false });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);

  // Move focus to the heading after the visitor changes view, so screen readers announce it.
  useEffect(() => {
    if (shouldFocus.current) {
      shouldFocus.current = false;
      headingRef.current?.focus();
    }
  }, [view]);

  // Only shown until a choice is saved (changing it later happens on the Cookie Policy page).
  if (consent !== null) return null;

  function goTo(next: View) {
    shouldFocus.current = true;
    setView(next);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="cookie-banner fixed inset-x-0 bottom-0 z-[200] max-h-[90dvh] overflow-y-auto border-t border-[var(--color-divider)] bg-white shadow-[0_-8px_24px_rgba(13,122,95,.12),0_-2px_6px_rgba(0,0,0,.05)]"
    >
      <div className="mx-auto max-w-[1200px] px-4 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
        {view === "default" ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
            <div className="min-w-0 md:max-w-[68ch] md:flex-1">
              <h2
                id="cookie-banner-title"
                ref={headingRef}
                tabIndex={-1}
                className="mb-1.5 text-[18px] leading-[1.25] tracking-[-0.3px] outline-none"
              >
                We respect your privacy
              </h2>
              <p className="m-0 text-[13.5px] leading-[1.6] text-[var(--color-text-secondary)]">
                We use cookies to improve your browsing experience, deliver personalized ads or content, and analyze our
                traffic. By clicking &ldquo;Accept&rdquo;, you consent to our use of cookies. {learnMore}
              </p>
            </div>
            <div className="flex shrink-0 items-stretch gap-2 md:ml-auto">
              <button
                type="button"
                onClick={() => goTo("manage")}
                aria-label="Manage cookie preferences"
                title="Manage cookie preferences"
                className="btn btn-ghost btn-still min-h-11 w-11 shrink-0 !px-0"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => saveConsent({ analytics: false, marketing: false })}
                // .btn resets border to none in globals.css, which beats utility classes
                style={{ border: "1.5px solid var(--color-text-disabled)" }}
                className="btn btn-still min-h-11 flex-1 bg-white text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] md:w-[130px] md:flex-none"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => saveConsent({ analytics: true, marketing: true })}
                className="btn btn-primary btn-still min-h-11 flex-[1.3] md:w-[170px] md:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 md:max-w-[68ch]">
              <h2
                id="cookie-banner-title"
                ref={headingRef}
                tabIndex={-1}
                className="mb-1.5 text-[18px] leading-[1.25] tracking-[-0.3px] outline-none"
              >
                Manage cookie preferences
              </h2>
              <p className="m-0 text-[13.5px] leading-[1.6] text-[var(--color-text-secondary)]">
                Choose which cookies you&apos;re happy for us to use. {learnMore}
              </p>
            </div>
            <CookieChoices
              idPrefix="cookie"
              value={choices}
              onChange={setChoices}
              className="mb-4 flex flex-col gap-2 md:grid md:grid-cols-3"
            />
            <div className="flex items-stretch gap-2 md:justify-end">
              <button type="button" onClick={() => goTo("default")} className="btn btn-outline btn-still min-h-11 flex-1 md:w-[130px] md:flex-none">
                Back
              </button>
              <button
                type="button"
                onClick={() => saveConsent(choices)}
                className="btn btn-primary btn-still min-h-11 flex-[1.4] md:w-[170px] md:flex-none"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
