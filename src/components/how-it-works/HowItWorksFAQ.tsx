"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need to know what's wrong with my car?",
    a: "No, most drivers don't. Just give us your registration (or make and model) and choose the job from our list: servicing, brakes, engine work, diagnostics, and more. Not sure which one you need? Get in touch and our team will help you work it out before you book.",
  },
  {
    q: "How quickly do I get my price?",
    a: "Straight away. Enter your car and the job you need, and your price is calculated on the spot, no waiting for a callback, no quote landing in your inbox hours later.",
  },
  {
    q: "Is it free to get a price?",
    a: "Yes. Seeing your price and booking costs you nothing upfront, and no card details are needed to book. You're only charged once the work is complete.",
  },
  {
    q: "Can I ask something before I book?",
    a: "Of course, get in touch if you want to check anything about the price or the job first. Once you've booked, we'll also be in touch ahead of your appointment.",
  },
  {
    q: "What if the mechanic finds something else wrong mid-job?",
    a: "They'll stop and tell you before doing anything extra. You decide whether to go ahead. Nothing gets added to your bill without your say-so.",
  },
  {
    q: "What if I'm not happy with the work?",
    a: "Get in touch and we'll sort it out with the garage. Every mechanic on the platform is vetted before they ever take a job, so problems like this should be rare, but we won't leave you to deal with it alone.",
  },
];

export default function HowItWorksFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#FBFDFC] border-t border-[#DADCDB] py-24 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-14 items-start">
          {/* Left */}
          <div className="reveal">
            <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
              Common questions
            </span>
            <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold tracking-[-0.5px] leading-[1.15]">
              Still got questions?
            </h2>
            <p className="text-[#595C5B] text-[16px] leading-[1.7] mt-3.5">
              Can&apos;t find what you&apos;re looking for? Drop us a line, we&apos;re usually back within a few hours.
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
