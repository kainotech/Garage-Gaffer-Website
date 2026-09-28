"use client";

import { useState } from "react";
import CustomSelect from "@/components/CustomSelect";

const TOPIC_OPTIONS = [
  "Getting a quote or booking a job",
  "Changing or cancelling a booking",
  "A problem with completed work",
  "Warranty claim",
  "Payment or invoice query",
  "Becoming a mechanic or garage partner",
  "Something else",
];

export default function ContactSection() {
  const [topic, setTopic] = useState("");

  return (
    <section className="bg-white py-16 md:py-12" id="help-contact">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-[640px] mb-10 reveal">
          <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
            Contact us
          </span>
          <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold tracking-[-0.5px] leading-[1.15] text-[#1A1E1D]">
            Need any help?
          </h2>
        </div>

        <div className="max-w-[640px] mx-auto bg-white border border-[#DADCDB] rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)] reveal">
          <h3 className="font-[family-name:var(--font-open-sans)] text-[18px] font-bold text-[#1A1E1D] mb-2">
            Send us a message
          </h3>
          <p className="font-[family-name:var(--font-rubik)] text-[13.5px] text-[#595C5B] mb-6">
            We aim to respond within one working day. For booking or payment issues, include your booking reference, it speeds things up.
          </p>

          <form className="space-y-4">
            <div className="con-grid">
              <div className="space-y-1.5">
                <label className="font-[family-name:var(--font-rubik)] text-[13px] font-semibold text-[#1A1E1D]">Your name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-white border-[1.5px] border-[#DADCDB] rounded-lg py-2.5 px-3.5 font-[family-name:var(--font-rubik)] text-[14px] focus:outline-none focus:border-[#0D7A5F] focus:ring-3 focus:ring-[#0D7A5F]/12 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-[family-name:var(--font-rubik)] text-[13px] font-semibold text-[#1A1E1D]">Email address (Optional)</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white border-[1.5px] border-[#DADCDB] rounded-lg py-2.5 px-3.5 font-[family-name:var(--font-rubik)] text-[14px] focus:outline-none focus:border-[#0D7A5F] focus:ring-3 focus:ring-[#0D7A5F]/12 transition-all"
                />
              </div>
            </div>

            <div className="con-grid">
              <div className="space-y-1.5">
                <label className="font-[family-name:var(--font-rubik)] text-[13px] font-semibold text-[#1A1E1D]">Contact number (Optional)</label>
                <div className="con-phone-group">
                  <span className="con-phone-prefix">
                    <svg className="con-phone-flag" width="20" height="10" viewBox="0 0 60 30" aria-hidden="true">
                      <clipPath id="con-flag-clip">
                        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                      </clipPath>
                      <path d="M0,0 v30 h60 v-30 z" fill="#00247d" />
                      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#con-flag-clip)" stroke="#cf142b" strokeWidth="4" />
                      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                      <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6" />
                    </svg>
                    <span>+44</span>
                  </span>
                  <input
                    type="tel"
                    placeholder="7700 900 000"
                    autoComplete="tel"
                    className="con-phone-input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-[family-name:var(--font-rubik)] text-[13px] font-semibold text-[#1A1E1D]">What&apos;s it about?</label>
                <CustomSelect
                  id="contact-topic"
                  label="What's it about?"
                  value={topic}
                  onChange={setTopic}
                  options={TOPIC_OPTIONS}
                  placeholder="Select a topic"
                  size="md"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-[family-name:var(--font-rubik)] text-[13px] font-semibold text-[#1A1E1D]">Booking reference (if relevant)</label>
              <input
                type="text"
                placeholder="e.g. GG-20260425-001"
                className="w-full bg-white border-[1.5px] border-[#DADCDB] rounded-lg py-2.5 px-3.5 font-[family-name:var(--font-rubik)] text-[14px] focus:outline-none focus:border-[#0D7A5F] focus:ring-3 focus:ring-[#0D7A5F]/12 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-[family-name:var(--font-rubik)] text-[13px] font-semibold text-[#1A1E1D]">Your message</label>
              <textarea
                placeholder="Tell us what&apos;s happened and we&apos;ll sort it out"
                rows={3}
                className="w-full bg-white border-[1.5px] border-[#DADCDB] rounded-lg py-2.5 px-3.5 font-[family-name:var(--font-rubik)] text-[14px] focus:outline-none focus:border-[#0D7A5F] focus:ring-3 focus:ring-[#0D7A5F]/12 transition-all resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full py-4 bg-[#0D7A5F] text-white font-[family-name:var(--font-rubik)] font-semibold text-[15px] rounded-xl shadow-[0_2px_8px_rgba(13,122,95,0.25)] hover:bg-[#055240] transition-all"
            >
              Send message
            </button>

            <p className="text-center font-[family-name:var(--font-rubik)] text-[12px] text-[#9BA0A0]">
              We&apos;ll get back to you using the details you give above. Response time: within 1 working day.
            </p>
          </form>
        </div>
      </div>

      <style jsx>{`
        .con-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 16px;
        }
        @media (max-width: 500px) {
          .con-grid {
            grid-template-columns: 1fr;
          }
        }
        .con-phone-group {
          display: flex;
          align-items: stretch;
          background: #fff;
          border: 1.5px solid #DADCDB;
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border var(--t-fast), box-shadow var(--t-fast);
        }
        .con-phone-group:hover { border-color: #b0bab5; }
        .con-phone-group:focus-within {
          border-color: #0D7A5F;
          box-shadow: 0 0 0 3px rgba(13,122,95,0.12);
        }
        .con-phone-prefix {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 10px;
          background: #F5F7F6;
          border-right: 1.5px solid #DADCDB;
          font-family: var(--font-rubik), sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #1A1E1D;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .con-phone-flag { border-radius: 2px; flex-shrink: 0; display: block; }
        .con-phone-input {
          flex: 1;
          min-width: 0;
          border: none;
          background: transparent;
          padding: 10px 14px;
          font-family: var(--font-rubik), sans-serif;
          font-size: 14px;
          color: #1A1E1D;
        }
        .con-phone-input:focus { outline: none; }
        .con-phone-input::placeholder { color: #9BA0A0; }
      `}</style>
    </section>
  );
}
