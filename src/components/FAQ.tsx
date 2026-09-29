"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How do you vet your mechanics?",
    a: "Every mechanic is checked before they can take a booking, we verify their qualifications, confirm they're insured, and run a DBS background check. After that, it's down to you: mechanics who consistently score below 4.5 stars are removed from the platform.",
  },
  {
    q: "How does pricing work? Are there any hidden fees?",
    a: "The price you see upfront is the labour charge only, confirmed before you book. If your mechanic finds that parts are needed, we'll get in touch to confirm the cost and get your go-ahead before doing any extra work, you'll never get a surprise bill.",
  },
  {
    q: "What if something goes wrong after the job?",
    a: "Fill in our support form and we'll get back to you, usually within one working day. From there, we'll work with you directly to get it sorted.",
  },
  {
    q: "Where does the work get done?",
    a: "Your car is looked after at one of our trusted partner garages here in Bristol. Book online, drop it off at your chosen time, and we'll keep you updated until it's ready to collect.",
  },
];

const HELP_HREF = "/support";
const HELP_BTN =
  "items-center gap-2 mt-6 px-5 py-2.5 bg-transparent text-[#0D7A5F] font-[family-name:var(--font-rubik)] font-semibold text-[14px] rounded-lg border-[1.5px] border-[#0D7A5F] hover:bg-[#ECF7EF] transition-all";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#FBFDFC] border-t border-[#DADCDB] py-24 md:py-16" id="support">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-14 items-start">
          {/* Left */}
          <div className="reveal">
            <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
              FAQ
            </span>
            <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold tracking-[-0.5px] leading-[1.15]">
              Questions we hear a lot.
            </h2>
            <p className="text-[#595C5B] text-[16px] leading-[1.7] mt-3.5">
              Can&apos;t find what you&apos;re looking for? Drop us a line, we&apos;re usually back within a few hours.
            </p>
            {/* Desktop: sits under the intro. Mobile: moves below the accordion (see end of list). */}
            <a href={HELP_HREF} className={`hidden md:inline-flex ${HELP_BTN}`}>
              Visit our help centre
            </a>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white border rounded-2xl px-5 overflow-hidden transition-all duration-300 reveal ${open === i ? "border-[#0D7A5F] shadow-[0_4px_12px_rgba(13,122,95,0.08)]" : "border-[#DADCDB] hover:border-[#b0bab5]"}`}
              >
                <button
                  className="w-full flex justify-between items-center gap-4 py-4 text-left font-[family-name:var(--font-open-sans)] font-bold text-[16px] text-[#1A1E1D]"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  {faq.q}
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open === i ? "bg-[#0D7A5F] text-white rotate-45" : "bg-[#ECF7EF] text-[#0D7A5F]"}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3.5 h-3.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div 
                  className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
                  style={{ 
                    gridTemplateRows: open === i ? "1fr" : "0fr",
                    opacity: open === i ? 1 : 0
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5">
                      <p className="text-[14.5px] leading-[1.7] text-[#595C5B]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="md:hidden flex justify-center">
              <a href={HELP_HREF} className={`inline-flex ${HELP_BTN}`}>
                Visit our help centre
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
