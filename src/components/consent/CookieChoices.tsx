"use client";

import CookieCheckRow from "./CookieCheckRow";

export type Choices = { analytics: boolean; marketing: boolean };

// The three cookie categories, shared by the banner and the Cookie Policy page.
export default function CookieChoices({
  idPrefix,
  value,
  onChange,
  className,
}: {
  idPrefix: string;
  value: Choices;
  onChange: (next: Choices) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <CookieCheckRow
        id={`${idPrefix}-necessary`}
        label="Necessary"
        description="Keep the site working, like remembering your booking details as you move between steps."
        checked
        disabled
      />
      <CookieCheckRow
        id={`${idPrefix}-analytics`}
        label="Analytics"
        description="Help us understand how the site is used so we can improve it (Google Analytics)."
        checked={value.analytics}
        onChange={(analytics) => onChange({ ...value, analytics })}
      />
      <CookieCheckRow
        id={`${idPrefix}-marketing`}
        label="Marketing"
        description="Used to show you relevant ads and content. We don't currently use any marketing cookies."
        checked={value.marketing}
        onChange={(marketing) => onChange({ ...value, marketing })}
      />
    </div>
  );
}
