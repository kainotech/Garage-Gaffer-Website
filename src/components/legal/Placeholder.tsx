/**
 * Flags a value that hasn't been confirmed yet (e.g. a company number or a
 * commercial policy default) so it's easy to spot before this page goes live.
 * Uses the existing warning tokens from DESIGN.md — nothing new introduced.
 */
export default function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-[#FFFCE4] border border-[#F9C339]/60 rounded-[4px] px-1.5 py-0.5 text-[#1A1E1D] font-medium whitespace-nowrap">
      {children}
    </span>
  );
}
