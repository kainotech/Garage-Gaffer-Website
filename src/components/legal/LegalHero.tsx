import type { ReactNode } from "react";

export default function LegalHero({
  eyebrow,
  title,
  meta,
  intro,
  notice,
}: {
  eyebrow: string;
  title: string;
  meta: string;
  intro: ReactNode;
  notice?: ReactNode;
}) {
  return (
    <section className="bg-[#FBFDFC] border-b border-[#DADCDB] pt-20 pb-16 md:pt-16 md:pb-12">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="reveal">
          <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
            {eyebrow}
          </span>
          <h1 className="font-[family-name:var(--font-open-sans)] text-[40px] md:text-[32px] font-extrabold leading-[1.1] tracking-[-1px] text-[#1A1E1D] mb-3">
            {title}
          </h1>
          <p className="font-[family-name:var(--font-rubik)] text-[13.5px] text-[#8A8D8C] mb-6">
            {meta}
          </p>
          <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B]">
            {intro}
          </p>
        </div>

        {notice && (
          <div className="reveal mt-6 flex gap-2.5 items-start bg-[#FFFCE4] border border-[#F9C339]/50 rounded-[8px] px-4 py-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A1E1D"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 mt-[3px]"
              aria-hidden="true"
            >
              <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.71 3.86a2 2 0 0 0-3.42 0Z" />
            </svg>
            <p className="font-[family-name:var(--font-rubik)] text-[13.5px] leading-[1.6] text-[#1A1E1D]">
              {notice}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
