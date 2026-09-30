"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FAQ_SECTIONS = [
  {
    section: "How it works",
    items: [
      {
        q: "How does Garage Gaffer work?",
        a: "You enter your car details and postcode, choose the work you need and pick a date and time. We then match your booking with a trusted, vetted partner garage and confirm it with you. You only pay once the work is done.",
      },
      {
        q: "Where does the work take place?",
        a: "At one of our trusted partner garages in Bristol. You drop your car off at your chosen time, and we'll keep you updated until it's ready to collect.",
      },
      {
        q: "Who will look after my car?",
        a: "Every mechanic on Garage Gaffer is qualified, DBS-checked and insured before they can take a booking.",
      },
      {
        q: "What does the price I'm shown cover?",
        a: "It's the labour fee for the job, worked out from your vehicle. Once you submit your booking, we'll confirm your garage and, if your job needs spare parts, send you a quotation, all within 2 hours. Nothing extra goes ahead without your agreement.",
      },
      {
        q: "Is there a cancellation fee?",
        a: "No. You can cancel or reschedule any time before your appointment, and we don't take any payment upfront. We'd appreciate as much notice as possible, so the garage isn't left holding a slot.",
      },
      {
        q: "Can I supply my own parts?",
        a: "Let us know in the booking notes and we'll check with the garage whether that's possible.",
      },
    ],
  },
  {
    section: "Booking",
    items: [
      {
        q: "I'm not sure what's wrong, what should I do?",
        a: "Add a Diagnostic Inspection to your booking. The mechanic will identify the fault and give you a full report before any further work is carried out.",
      },
      {
        q: "When can I book in for?",
        a: "You choose one date and a 30-minute time slot that suits you. We'll confirm your appointment by email within 2 hours, once a garage has been allocated.",
      },
      {
        q: "I can't find my repair, help!",
        a: "Use the search bar on the Select Work screen, or browse by category. If you still can't find it, add a Diagnostic Inspection and the mechanic will assess it when you bring the car in.",
      },
      {
        q: "Can I add more work after I've booked?",
        a: "Yes, just contact our support team and we'll update your booking for you.",
      },
    ],
  },
];

export default function BookingTopBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  function toggleItem(key: string) {
    setOpenItem((prev) => (prev === key ? null : key));
  }

  return (
    <>
      <header className="btb-header">
        <div className="btb-inner">
        {/* Logo — identical markup to Nav */}
        <Link href="/" className="flex items-center">
          <Image src="/gg-logo.png" alt="Garage Gaffer" width={172} height={64} className="h-14 w-auto" priority />
        </Link>

        {/* Help button */}
        <button
          className="btb-help-btn"
          onClick={() => setModalOpen(true)}
          type="button"
          aria-label="Open help and FAQ"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          I need help
        </button>
        </div>
      </header>

      {/* Modal overlay */}
      {modalOpen && (
        <div className="btb-overlay" onClick={() => setModalOpen(false)} role="dialog" aria-modal="true" aria-label="Common questions">
          <div className="btb-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="btb-modal-header">
              <h2 className="btb-modal-title">Common questions</h2>
              <button
                className="btb-modal-close"
                onClick={() => setModalOpen(false)}
                type="button"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="btb-modal-body">
              {FAQ_SECTIONS.map((sec) => (
                <div key={sec.section} className="btb-faq-section">
                  <h3 className="btb-faq-section-title">{sec.section}</h3>
                  <div className="btb-faq-list">
                    {sec.items.map((item, i) => {
                      const key = `${sec.section}-${i}`;
                      const isOpen = openItem === key;
                      return (
                        <div key={key} className={`btb-faq-item${isOpen ? " btb-faq-item--open" : ""}`}>
                          <button
                            className="btb-faq-trigger"
                            onClick={() => toggleItem(key)}
                            type="button"
                            aria-expanded={isOpen}
                          >
                            <span>{item.q}</span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="btb-faq-chevron"
                              aria-hidden="true"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>
                          {isOpen && (
                            <p className="btb-faq-answer">{item.a}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal footer */}
            <div className="btb-modal-footer">
              Didn&apos;t find what you need? Email us at{" "}
              <a href="mailto:support@garagegaffer.co.uk" className="btb-modal-email">
                support@garagegaffer.co.uk
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ── Top bar ── */
        .btb-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: saturate(180%) blur(14px);
          -webkit-backdrop-filter: saturate(180%) blur(14px);
          border-bottom: 1px solid var(--color-divider);
        }
        .btb-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .btb-help-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: var(--radius-lg);
          border: 1.5px solid var(--color-divider);
          background: #fff;
          font-family: var(--font-rubik), sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-primary);
          cursor: pointer;
          transition: border-color var(--t-fast), background var(--t-fast), color var(--t-fast);
        }
        .btb-help-btn:hover {
          border-color: var(--color-brand-primary);
          color: var(--color-brand-primary);
          background: var(--color-brand-mint);
        }

        /* ── Overlay ── */
        .btb-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: btb-fade-in 150ms ease;
        }

        /* ── Modal ── */
        .btb-modal {
          background: #fff;
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 560px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-xl);
          animation: btb-slide-up 200ms ease;
          overflow: hidden;
        }

        .btb-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 24px 18px;
          border-bottom: 1px solid var(--color-divider);
          flex-shrink: 0;
        }
        .btb-modal-title {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: var(--color-text-primary);
          letter-spacing: -0.3px;
          margin: 0;
        }
        .btb-modal-close {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          border: none;
          background: transparent;
          color: var(--color-text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--t-fast), color var(--t-fast);
          flex-shrink: 0;
        }
        .btb-modal-close:hover {
          background: #f0f0f0;
          color: var(--color-text-primary);
        }

        /* ── Body ── */
        .btb-modal-body {
          overflow-y: auto;
          flex: 1;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .btb-faq-section-title {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: var(--color-text-primary);
          margin: 0 0 12px;
          letter-spacing: -0.2px;
        }

        .btb-faq-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .btb-faq-item {
          border: 1px solid var(--color-divider);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--t-fast);
        }
        .btb-faq-item--open {
          border-color: var(--color-brand-primary);
        }

        .btb-faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          background: #fff;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-rubik), sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: color var(--t-fast), background var(--t-fast);
        }
        .btb-faq-item--open .btb-faq-trigger {
          color: var(--color-text-primary);
          font-weight: 600;
        }
        .btb-faq-trigger:hover {
          background: var(--color-brand-mint);
          color: var(--color-text-primary);
        }

        .btb-faq-chevron {
          flex-shrink: 0;
          color: var(--color-text-secondary);
          transition: transform var(--t-base);
        }
        .btb-faq-item--open .btb-faq-chevron {
          transform: rotate(180deg);
          color: var(--color-brand-primary);
        }

        .btb-faq-answer {
          padding: 0 16px 14px;
          margin: 0;
          font-family: var(--font-rubik), sans-serif;
          font-size: 13.5px;
          color: var(--color-text-secondary);
          line-height: 1.65;
          border-top: 1px solid var(--color-divider);
          padding-top: 12px;
        }

        /* ── Footer ── */
        .btb-modal-footer {
          border-top: 1px solid var(--color-divider);
          padding: 16px 24px;
          font-family: var(--font-rubik), sans-serif;
          font-size: 13px;
          color: var(--color-text-secondary);
          text-align: center;
          flex-shrink: 0;
        }
        .btb-modal-email {
          color: var(--color-brand-primary);
          font-weight: 600;
          text-decoration: none;
        }
        .btb-modal-email:hover {
          text-decoration: underline;
        }

        /* ── Animations ── */
        @keyframes btb-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes btb-slide-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .btb-overlay, .btb-modal { animation: none; }
          .btb-faq-chevron { transition: none; }
          .btb-help-btn, .btb-modal-close, .btb-faq-trigger, .btb-faq-item { transition: none; }
        }

        @media (max-width: 560px) {
          .btb-inner { padding: 0 16px; }
          .btb-help-btn { padding: 7px 12px; font-size: 12.5px; }
          .btb-modal { max-height: 92vh; border-radius: var(--radius-lg); }
        }
      `}</style>
    </>
  );
}
