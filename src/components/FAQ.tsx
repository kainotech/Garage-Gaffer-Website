"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How do you vet your mechanics?",
    a: "Every mechanic on Garage Gaffer goes through a proper check-up before they take a single booking. We verify qualifications, confirm public liability insurance, run DBS background checks, and review work history. After that, your ratings and reviews do the rest — mechanics who consistently drop below 4.5 stars are removed from the platform.",
  },
  {
    q: "How does pricing work? Are there any hidden fees?",
    a: "Your quote is fully inclusive — parts, labour, VAT and the mechanic's call-out are all in one price. If your mechanic spots something unexpected on the day (say a worn brake disc during a pad change), they'll stop, explain what they've found, and get your approval before doing any extra work. You'll never get a surprise bill.",
  },
  {
    q: "What if something goes wrong after the job?",
    a: "Every job comes with a 12-month workmanship warranty, plus the manufacturer warranty on any new parts. If anything's not right, message us and we'll sort it — usually with a free return visit from your original mechanic. You're never on your own once the spanner is down.",
  },
  {
    q: "Will a mobile mechanic void my manufacturer warranty?",
    a: "No — your servicing can be carried out by any qualified mechanic using the right parts, without affecting your warranty (it's a piece of EU law called Block Exemption). Our mechanics stamp your service book and keep a digital record, so your car's history is all neatly in one place.",
  },
  {
    q: "Where can the mechanic work on my car?",
    a: "Your driveway, the street outside your house, your office car park, a friend's place — anywhere with reasonable space and access. For some bigger jobs (like clutch replacements) we may need a flat surface and a bit more room; your mechanic will flag that when they accept the booking.",
  },
];

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
              Can&apos;t find what you&apos;re looking for? Drop us a line — we&apos;re usually back within a few hours.
            </p>
            <a href="/support" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-transparent text-[#0D7A5F] font-[family-name:var(--font-rubik)] font-semibold text-[14px] rounded-lg border-[1.5px] border-[#0D7A5F] hover:bg-[#ECF7EF] transition-all">
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
          </div>
        </div>
      </div>
    </section>
  );
}
