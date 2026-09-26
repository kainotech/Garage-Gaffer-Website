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
  servicing: (
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  ),
  brakes: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  "engine-mechanical": (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  "exhaust-emissions": (
    <path d="M17.5 19H9a5 5 0 1 1 1.5-9.8A6 6 0 0 1 22 12.5a4.5 4.5 0 0 1-4.5 6.5z" />
  ),
  "electrical-diagnostics": <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  "suspension-steering": (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
    </>
  ),
  "heating-air-conditioning": (
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  ),
  "bodywork-cosmetic": (
    <>
      <rect x="3" y="6" width="12" height="5" rx="1.5" />
      <path d="M9 11v4M9 15h4a2 2 0 0 1 2 2v3" />
    </>
  ),
  "ev-hybrid": (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M10 3V1M14 3V1M11 8l-2 4h3l-2 4" />
    </>
  ),
  "cooling-system": (
    <path d="M12 2s6 7.4 6 11.5A6 6 0 1 1 6 13.5C6 9.4 12 2 12 2z" />
  ),
  "fuel-system": (
    <>
      <path d="M4 21V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15" />
      <path d="M4 11h7M3 21h11" />
      <path d="M15 8h1.5L19 10.5V18a1.5 1.5 0 0 1-3 0v-4h-1" />
    </>
  ),
};

export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-4 h-4"}
      aria-hidden="true"
    >
      {CATEGORY_ICONS[slug]}
    </svg>
  );
}
