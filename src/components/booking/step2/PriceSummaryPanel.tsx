"use client";

import type { SelectedItem, BookingSession } from "../useBookingSession";
import { formatItemPrice, hasCustomQuoteItems, sumFixedPrice } from "../pricing";

interface PriceSummaryPanelProps {
  selectedWork: SelectedItem[];
  session: BookingSession;
  onRemove: (id: string) => void;
  onNextStep: () => void;
}

export default function PriceSummaryPanel({
  selectedWork,
  session,
  onRemove,
  onNextStep,
}: PriceSummaryPanelProps) {
  const customQuote = selectedWork.length === 0 || hasCustomQuoteItems(selectedWork);
  const total = sumFixedPrice(selectedWork);

  const car = session.car;
  const vehicleLabel = [car.make, car.model, car.engineCapacity, car.year].filter(Boolean).join(" ");
  const postcode = car.postcode || car.reg || "";

  return (
    <aside className="psp-wrap">
      {/* Price header */}
      <div className="psp-price-block">
        <div className="psp-price-row">
          <span className="psp-price-label">{customQuote ? "YOUR REQUEST" : "LABOUR FEE"}</span>
        </div>
        {customQuote ? (
          <div className="psp-price-amount psp-price-amount--quote">Priced after inspection</div>
        ) : (
          <div className="psp-price-amount">£{total.toFixed(2)}</div>
        )}
        <p className="psp-vat-text">All prices shown are for <strong className="psp-highlight">labour only</strong>, including VAT where applicable. Once you submit your booking, we&apos;ll confirm your garage and send a parts quotation if your job needs one, all within 2 hours.</p>
      </div>

      {/* Vehicle info */}
      <div className="psp-vehicle">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
        <span className="psp-vehicle-text">
          {vehicleLabel || "Your vehicle"}
          {postcode && <span className="psp-vehicle-postcode"> · {postcode}</span>}
        </span>
        <a href="/booking/step-1" className="psp-edit-link">Edit</a>
      </div>

      {/* Selected work */}
      <div className="psp-section">
        <p className="psp-section-label">SELECTED WORK</p>
        {selectedWork.length === 0 ? (
          <p className="psp-empty">No items added yet.</p>
        ) : (
          <div className="psp-items">
            {selectedWork.map((item) => (
              <div key={item.id} className="psp-item">
                <button
                  className="psp-remove"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${item.name}`}
                  type="button"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
                <div className="psp-item-info">
                  <span className="psp-item-name">{item.name}</span>
                  {item.partsIncluded && (
                    <span className="psp-item-sub">Parts included</span>
                  )}
                </div>
                <span className="psp-item-price">{formatItemPrice(item)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="psp-divider" />

      {/* CTA */}
      <button
        className="btn btn-primary psp-cta"
        onClick={onNextStep}
        disabled={selectedWork.length === 0}
        type="button"
      >
        Next Step
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      {selectedWork.length === 0 && (
        <p className="psp-cta-hint">Add at least one item to continue.</p>
      )}

      <style jsx>{`
        .psp-wrap {
          background: #fff; border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md); padding: 24px;
          position: sticky; top: 88px; /* below nav+progress */
          display: flex; flex-direction: column; gap: 16px;
        }
        .psp-price-block { display: flex; flex-direction: column; gap: 4px; }
        .psp-price-row { display: flex; align-items: center; justify-content: space-between; }
        .psp-price-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-secondary); }
        .psp-price-amount { font-size: 32px; font-weight: 900; font-family: var(--font-open-sans), sans-serif; color: var(--color-text-primary); letter-spacing: -0.5px; }
        .psp-price-amount--quote { font-size: 20px; letter-spacing: -0.2px; }
        .psp-vat-text { font-size: 11.5px; color: var(--color-text-secondary); }
        .psp-highlight {
          font-weight: 800; color: var(--color-brand-deep);
          background: #ECF7EF; padding: 1px 5px; border-radius: 4px;
        }
        .psp-vehicle {
          display: flex; align-items: center; gap: 6px;
          background: var(--color-bg); border-radius: var(--radius-md);
          padding: 10px 12px; font-size: 12.5px; color: var(--color-text-secondary);
        }
        .psp-vehicle svg { flex-shrink: 0; color: var(--color-text-disabled); }
        .psp-vehicle-text { flex: 1; min-width: 0; }
        .psp-vehicle-postcode { color: var(--color-text-disabled); }
        .psp-edit-link { font-size: 12px; color: var(--color-accent-blue); text-decoration: none; flex-shrink: 0; font-weight: 600; }
        .psp-edit-link:hover { text-decoration: underline; }
        .psp-section { display: flex; flex-direction: column; gap: 8px; }
        .psp-section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-secondary); margin: 0; }
        .psp-empty { font-size: 13px; color: var(--color-text-disabled); margin: 0; }
        .psp-items { display: flex; flex-direction: column; gap: 6px; }
        .psp-item { display: flex; align-items: flex-start; gap: 8px; }
        .psp-remove {
          width: 20px; height: 20px; border-radius: var(--radius-sm);
          background: #FFF0F0; color: var(--color-error); border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
          transition: background var(--t-fast);
        }
        .psp-remove:hover { background: #FFD8D8; }
        .psp-item-info { flex: 1; min-width: 0; }
        .psp-item-name { font-size: 13px; font-weight: 600; color: var(--color-text-primary); display: block; }
        .psp-item-sub { font-size: 11px; color: var(--color-text-secondary); display: block; margin-top: 2px; }
        .psp-item-price { font-size: 13px; font-weight: 700; color: var(--color-text-primary); flex-shrink: 0; }
        .psp-divider { height: 1px; background: var(--color-divider); margin: 0 -4px; }
        .psp-cta { width: 100%; padding: 14px; font-size: 15px; }
        .psp-cta:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .psp-cta-hint { font-size: 11.5px; color: var(--color-text-disabled); text-align: center; margin: 0; }

        @media (prefers-reduced-motion: reduce) {
          .psp-remove { transition: none; }
        }
      `}</style>
    </aside>
  );
}
