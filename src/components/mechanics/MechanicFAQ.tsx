"use client";

import { useState } from "react";

const mechanicFaqs = [
  {
    q: "How much does it cost to join?",
    a: "Joining Garage Gaffer costs nothing. Registration, vetting and viewing jobs are all free, and we don't charge per lead or take a percentage of your quote. You keep 100% of your labour and parts.",
  },
  {
    q: "How do I get paid?",
    a: "Customers pay securely through the platform when you complete the job. We process all payments and transfer the full amount to your bank account every Friday.",
  },
  {
    q: "Can I keep my existing customers?",
    a: "Absolutely. We're here to provide you with extra work to fill your gaps or help you grow. You are an independent business and are free to take work from any source. There are no exclusivity clauses.",
  },
  {
    q: "What vetting documents do I need?",
    a: "You'll need to provide proof of Level 3 qualifications (City & Guilds, IMI or equivalent), valid Public Liability Insurance (minimum £1m coverage), and a clear DBS check. If you don't have a current DBS, we can help you apply for one during the onboarding.",
  },
  {
    q: "How does the quoting process work?",
    a: "When a customer posts a job in your area, we'll reach out to you. You can see the car details and the customer's description, then send an itemised quote through the platform. The customer reviews all quotes and books the one that suits them. You only pay the platform fee once you're live and ready to take jobs.",
  },
];

export default function MechanicFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#FBFDFC] border-t border-[#DADCDB] py-24 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-14 items-start">
          {/* Left */}
          <div className="reveal">
            <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
              FAQ
            </span>
            <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold tracking-[-0.5px] leading-[1.15]">
              Common questions from mechanics.
            </h2>
            <p className="text-[#595C5B] text-[16px] leading-[1.7] mt-3.5">
              Everything you need to know about joining and working with Garage Gaffer.
            </p>
            <a href="/support" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-transparent text-[#0D7A5F] font-[family-name:var(--font-rubik)] font-semibold text-[14px] rounded-lg border-[1.5px] border-[#0D7A5F] hover:bg-[#ECF7EF] transition-all">
              Visit our help centre
            </a>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {mechanicFaqs.map((faq, i) => (
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
