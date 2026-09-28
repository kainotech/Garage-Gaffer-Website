"use client";

import { useState } from "react";
import type { SelectedItem, BookingSession } from "../useBookingSession";
import { formatItemPrice, hasCustomQuoteItems, sumFixedPrice } from "../pricing";

interface PriceSummaryStickyBarProps {
  selectedWork: SelectedItem[];
  session: BookingSession;
  onRemove: (id: string) => void;
  onNextStep: () => void;
}

export default function PriceSummaryStickyBar({
  selectedWork,
  onRemove,
  onNextStep,
}: PriceSummaryStickyBarProps) {
  const [expanded, setExpanded] = useState(false);
  const customQuote = selectedWork.length === 0 || hasCustomQuoteItems(selectedWork);
  const total = sumFixedPrice(selectedWork);

  return (
    <div className="pssb-outer">
      {/* Expanded panel */}
      {expanded && (
        <div className="pssb-expanded">
          <div className="pssb-expanded-header">
            <span className="pssb-expanded-title">Your Quote</span>
            <button className="pssb-close" onClick={() => setExpanded(false)} type="button" aria-label="Close summary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="pssb-items">
            {selectedWork.length === 0 ? (
              <p className="pssb-empty">No items added yet.</p>
            ) : (
              selectedWork.map((item) => (
                <div key={item.id} className="pssb-item">
                  <button
                    className="pssb-remove"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    type="button"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                  <span className="pssb-item-name">{item.name}</span>
                  <span className="pssb-item-price">{formatItemPrice(item)}</span>
                </div>
              ))
            )}
          </div>

          <div className="pssb-divider" />

          <p className="pssb-note">All prices shown are for <strong className="pssb-highlight">labour only</strong>, including VAT where applicable. Once you submit your booking, we&apos;ll be in touch within 1 working day with your full price, including parts, if your job needs any.</p>
        </div>
      )}

      {/* Sticky bar */}
      <div className="pssb-bar">
        <button
          className="pssb-summary-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse price summary" : "Expand price summary"}
          type="button"
        >
          <div className="pssb-bar-left">
            <span className={`pssb-bar-total${customQuote ? " pssb-bar-total--quote" : ""}`}>
              {customQuote ? "Priced after inspection" : `£${total.toFixed(2)}`}
            </span>
            <svg
              className={`pssb-chevron${expanded ? " pssb-chevron--up" : ""}`}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>
        <button
          className="pssb-next-btn btn btn-primary"
          onClick={onNextStep}
          disabled={selectedWork.length === 0}
          type="button"
        >
          Next Step
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .pssb-outer {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
          display: none;
        }
        @media (max-width: 960px) {
          .pssb-outer { display: flex; flex-direction: column; }
        }
        .pssb-expanded {
          background: #fff; border-top: 1px solid var(--color-divider);
          padding: 20px 20px 0; max-height: 50vh; overflow-y: auto;
          display: flex; flex-direction: column; gap: 12px;
          box-shadow: var(--shadow-xl);
        }
        .pssb-expanded-header { display: flex; justify-content: space-between; align-items: center; }
        .pssb-expanded-title { font-size: 14px; font-weight: 700; color: var(--color-text-primary); }
        .pssb-close {
          background: var(--color-bg); border: none; border-radius: var(--radius-sm);
          width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--color-text-secondary);
        }
        .pssb-items { display: flex; flex-direction: column; gap: 6px; }
        .pssb-empty { font-size: 13px; color: var(--color-text-disabled); margin: 0; }
        .pssb-item { display: flex; align-items: center; gap: 8px; }
        .pssb-remove {
          width: 18px; height: 18px; border-radius: 3px; background: #FFF0F0;
          color: var(--color-error); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .pssb-item-name { flex: 1; font-size: 13px; color: var(--color-text-primary); }
        .pssb-item-price { font-size: 13px; font-weight: 700; }
        .pssb-divider { height: 1px; background: var(--color-divider); }
        .pssb-note { font-size: 11px; color: var(--color-text-disabled); margin: 4px 0 0; line-height: 1.5; }
        .pssb-highlight {
          font-weight: 800; color: var(--color-brand-deep);
          background: #ECF7EF; padding: 1px 5px; border-radius: 4px;
        }
        .pssb-bar {
          background: #fff; border-top: 1px solid var(--color-divider);
          padding: 12px 16px; display: flex; align-items: center; gap: 12px;
          box-shadow: 0 -4px 16px rgba(0,0,0,0.08);
        }
        .pssb-summary-btn { background: none; border: none; cursor: pointer; flex: 1; text-align: left; padding: 0; }
        .pssb-bar-left { display: flex; align-items: center; gap: 8px; }
        .pssb-bar-total { font-size: 20px; font-weight: 900; font-family: var(--font-open-sans), sans-serif; }
        .pssb-bar-total--quote { font-size: 14px; }
        .pssb-chevron { color: var(--color-text-secondary); transition: transform var(--t-base); }
        .pssb-chevron--up { transform: rotate(180deg); }
        .pssb-next-btn { padding: 12px 20px; font-size: 14px; flex-shrink: 0; }
        .pssb-next-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        @media (prefers-reduced-motion: reduce) {
          .pssb-chevron { transition: none; }
        }
      `}</style>
    </div>
  );
}
