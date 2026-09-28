import type { ReactNode } from "react";

/**
 * Numbered clause wrapper for Terms / Cookie Policy pages. Styles plain
 * semantic markup (p, ul, li, strong) via descendant selectors so section
 * content can be written as clean prose, not per-tag Tailwind classes.
 */
export default function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-8 border-t border-[#DADCDB] first:border-t-0 first:pt-0">
      <h2 className="reveal font-[family-name:var(--font-open-sans)] text-[22px] font-bold leading-[1.3] text-[#1A1E1D] mb-4">
        <span className="text-[#0D7A5F]">{number}. </span>
        {title}
      </h2>
      <div
        className="reveal font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B]
          [&>p]:mb-5 [&>p:last-child]:mb-0
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5 [&_ul]:space-y-2
          [&_li]:leading-[1.7]
          [&_strong]:text-[#1A1E1D] [&_strong]:font-semibold
          [&_a]:text-[#0D7A5F] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#055240]"
      >
        {children}
      </div>
    </section>
  );
}
