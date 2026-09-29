import type { ReactNode } from "react";

export interface CategoryAccent {
  accent: string;
  well: string;
}

export const CATEGORY_ACCENTS: CategoryAccent[] = [
  { accent: "#0D7A5F", well: "#ECF7EF" },
  { accent: "#066599", well: "#E6F3FA" },
  { accent: "#31A7A8", well: "#E4F6F6" },
];

export function accentForIndex(index: number): CategoryAccent {
  return CATEGORY_ACCENTS[index % CATEGORY_ACCENTS.length];
}

export const CATEGORY_ICONS: Record<string, ReactNode> = {
  all: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </>
  ),
  servicing: (
    <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Zm7.43-2.5c.04-.33.07-.66.07-1s-.03-.67-.07-1l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.3 7.3 0 0 0-1.73-1L14.5 2.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5l-.34 2.03c-.63.22-1.2.54-1.73.94l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64L4.57 10.5c-.04.33-.07.66-.07 1s.03.67.07 1l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .6.22l2.49-1c.53.4 1.1.72 1.73.94l.34 2.03a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5l.34-2.03c.63-.22 1.2-.54 1.73-.94l2.49 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.64L19.43 13Z" />
  ),
  brakes: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
    />
  ),
  "engine-mechanical": (
    <path d="M22.7 19 13.6 9.9c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6l-3 3-4.3-4.3C.6 7.1 1 10.1 3 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1 0-1.4Z" />
  ),
  "exhaust-emissions": (
    <path d="M6.5 19a4.5 4.5 0 1 1 .5-8.98A5.5 5.5 0 0 1 17.5 8.06 4 4 0 0 1 17 19H6.5Z" />
  ),
  "electrical-diagnostics": <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  "suspension-steering": (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 17.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      />
      <circle cx="12" cy="12" r="2.3" />
      <rect x="11" y="4.5" width="2" height="6" rx="1" />
      <rect x="11" y="4.5" width="2" height="6" rx="1" transform="rotate(120 12 12)" />
      <rect x="11" y="4.5" width="2" height="6" rx="1" transform="rotate(240 12 12)" />
    </>
  ),
  "heating-air-conditioning": (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2a2.5 2.5 0 0 0-2.5 2.5v8.6a4.5 4.5 0 1 0 5 0V4.5A2.5 2.5 0 0 0 12 2Zm0 3a1 1 0 0 1 1 1v7.35l.7.5a2.5 2.5 0 1 1-3.4 0l.7-.5V6a1 1 0 0 1 1-1Z"
    />
  ),
  "bodywork-cosmetic": (
    <>
      <rect x="8" y="9" width="8" height="13" rx="2" />
      <rect x="10" y="5" width="4" height="4" rx="1" />
      <rect x="10.5" y="2" width="3" height="2.4" rx="1" />
      <circle cx="6" cy="8" r="1.1" />
      <circle cx="18" cy="6" r="1.1" />
      <circle cx="5.5" cy="4.5" r="0.9" />
    </>
  ),
  "ev-hybrid": (
    <>
      <rect x="6" y="9" width="12" height="10" rx="3" />
      <rect x="9" y="4" width="2.2" height="6" rx="1.1" />
      <rect x="12.8" y="4" width="2.2" height="6" rx="1.1" />
      <rect x="10.5" y="19" width="3" height="3" rx="1" />
    </>
  ),
  "cooling-system": (
    <path d="M12 2s6 7.4 6 11.5A6 6 0 1 1 6 13.5C6 9.4 12 2 12 2z" />
  ),
  "fuel-system": (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v18h1a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1V3Zm2.5 1.5v6h4v-6h-4Z"
      />
      <path d="M14.5 8h1.7L19 10.8v6.7a1.5 1.5 0 0 1-3 0v-3.5a1 1 0 0 0-1-1h-.5V8Z" />
    </>
  ),
};

export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className ?? "w-4 h-4"}
      aria-hidden="true"
    >
      {CATEGORY_ICONS[slug]}
    </svg>
  );
}
