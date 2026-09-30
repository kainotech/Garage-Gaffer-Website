"use client";

import { useState } from "react";
import { saveConsent, useConsent } from "@/lib/consent";
import CookieChoices, { type Choices } from "./CookieChoices";

// Inline version of the banner's "manage" view, for the Cookie Policy page.
export default function CookiePreferences() {
  const consent = useConsent();
  const [draft, setDraft] = useState<Choices | null>(null);
  const [saved, setSaved] = useState(false);
  const value = draft ?? consent ?? { analytics: false, marketing: false };

  return (
    <div className="mb-5 rounded-[var(--radius-xl)] border border-[var(--color-divider)] bg-white p-4 shadow-[var(--shadow-sm)] sm:p-5">
      <CookieChoices
        idPrefix="policy-cookie"
        value={value}
        onChange={(next) => {
          setDraft(next);
          setSaved(false);
        }}
        className="mb-4 flex flex-col gap-2"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => {
            saveConsent(value);
            setDraft(null);
            setSaved(true);
          }}
          className="btn btn-primary btn-still min-h-11 sm:min-w-[170px]"
        >
          Save preferences
        </button>
        <p role="status" className="m-0 text-[13.5px] text-[var(--color-text-secondary)]">
          {saved ? "Saved. Your choice applies straight away." : consent === null ? "You haven't made a choice yet." : ""}
        </p>
      </div>
    </div>
  );
}
