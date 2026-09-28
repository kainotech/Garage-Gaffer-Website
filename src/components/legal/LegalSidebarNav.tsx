"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Left-hand section nav for long legal pages. Sticky and active-section
 * aware on desktop; collapses to a boxed list above the content on mobile.
 */
export default function LegalSidebarNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        });
        const topmost = items.find((item) => visible.current.has(item.id));
        if (topmost) setActiveId(topmost.id);
      },
      { rootMargin: "-100px 0px -66% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 lg:mb-0 lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto
        bg-[#F5F7F6] border border-[#DADCDB] rounded-xl p-5
        lg:bg-transparent lg:border-0 lg:rounded-none lg:p-0"
    >
      <span className="block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#8A8D8C] mb-3 px-3 lg:px-3">
        On this page
      </span>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-0.5 list-none p-0 m-0">
        {items.map((item, i) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`flex gap-2.5 font-[family-name:var(--font-rubik)] text-[13.5px] leading-[1.4] py-1.5 px-3 rounded-md transition-colors ${
                  active
                    ? "bg-[#ECF7EF] text-[#0D7A5F] font-semibold"
                    : "text-[#595C5B] hover:text-[#1A1E1D]"
                }`}
              >
                <span className={active ? "text-[#0D7A5F] tabular-nums" : "text-[#8A8D8C] tabular-nums"}>
                  {i + 1}.
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
