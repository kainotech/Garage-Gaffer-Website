"use client";

import type { BookingSession } from "./useBookingSession";
import { formatItemPrice, hasCustomQuoteItems, sumFixedPrice } from "./pricing";
import { formatSlotLabel } from "./step3/AvailabilityGrid";

interface BookingOrderSummaryProps {
  session: BookingSession;
  showTrustBadges?: boolean;
}

export default function BookingOrderSummary({ session, showTrustBadges }: BookingOrderSummaryProps) {
  const customQuote = session.selectedWork.length === 0 || hasCustomQuoteItems(session.selectedWork);
  const total = sumFixedPrice(session.selectedWork);
  const car = session.car;
  const vehicleLabel = [car.make, car.model, car.engineCapacity, car.year].filter(Boolean).join(" ") || car.reg || "Your vehicle";
  const postcode = car.postcode;

  return (
    <div className="bos-wrap">
      <div className="bos-container container">
        <div className="bos-main">
          <div className="bos-price-col">
            <p className="bos-label">LABOUR FEE</p>
            {customQuote ? (
              <div className="bos-price bos-price--quote">Priced after inspection</div>
            ) : (
              <div className="bos-price">£{total.toFixed(2)}</div>
            )}
            <p className="bos-vat">All prices shown are for <strong className="bos-highlight">labour only</strong>, including VAT where applicable.</p>
            <p className="bos-vehicle">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              {vehicleLabel}{postcode && ` · ${postcode}`}
            </p>
            {session.details?.availability && (
              <p className="bos-slot">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formatSlotLabel(session.details.availability)}
              </p>
            )}
          </div>

          <div className="bos-items-col">
            <p className="bos-label">SELECTED WORK</p>
            <div className="bos-items">
              {session.selectedWork.map((item) => (
                <div key={item.id} className="bos-item">
                  <div className="bos-item-info">
                    <span className="bos-item-name">{item.name}</span>
                    {item.partsIncluded && (
                      <span className="bos-item-sub">Parts included</span>
                    )}
                  </div>
                  <span className="bos-item-price">{formatItemPrice(item)}</span>
                </div>
              ))}
            </div>
          </div>

          {showTrustBadges && (
            <div className="bos-trust-col">
              <p className="bos-label">WHAT TO EXPECT</p>
              <div className="bos-trust-badges">
                {[
                  "Qualified, DBS-checked mechanics",
                  "Extra work agreed with you first",
                  "Garage and any parts quote confirmed within 2 hours",
                ].map((badge) => (
                  <div key={badge} className="bos-trust-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bos-wrap {
          background: var(--color-brand-dark);
          color: #fff;
          padding: 32px 0;
        }
        .bos-main {
          display: grid;
          /* Bounded columns so nothing squeezes "Selected work" into overlapping
             lines. fit-content hugs the selected items so each name sits next to
             its price; 320px fits the longest service name (~250px at 13.5px) plus
             the price on one line. Spare width is shared between the columns. */
          grid-template-columns: minmax(160px, 320px) fit-content(320px) auto;
          justify-content: space-between;
          gap: 40px;
          align-items: flex-start;
        }
        .bos-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.5);
          margin: 0 0 10px;
        }
        .bos-price-col { min-width: 160px; }
        .bos-price {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 36px; font-weight: 900; letter-spacing: -0.5px;
          color: #fff; line-height: 1;
        }
        .bos-price--quote { font-size: 22px; letter-spacing: -0.2px; }
        .bos-vat { font-size: 11px; color: rgba(255,255,255,0.5); margin: 6px 0 0; }
        .bos-highlight {
          font-weight: 800; color: #fff;
          background: rgba(255,255,255,0.18); padding: 1px 5px; border-radius: 4px;
        }
        .bos-vehicle {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; color: rgba(255,255,255,0.55); margin: 8px 0 0;
        }
        .bos-slot {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; color: rgba(255,255,255,0.55); margin: 6px 0 0;
        }
        .bos-slot svg { flex-shrink: 0; color: rgba(255,255,255,0.4); }
        .bos-items-col { min-width: 0; }
        .bos-items { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
        .bos-item { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; }
        .bos-item-info { flex: 1; min-width: 0; }
        .bos-item-name { font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.9); display: block; }
        .bos-item-sub { font-size: 11px; color: rgba(255,255,255,0.45); display: block; margin-top: 2px; }
        .bos-item-price { font-size: 13.5px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .bos-trust-col { min-width: 220px; }
        .bos-trust-badges { display: flex; flex-direction: column; gap: 8px; }
        .bos-trust-badge {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 500;
        }
        .bos-trust-badge svg { color: #6EE7B7; flex-shrink: 0; }

        @media (max-width: 860px) {
          .bos-main { grid-template-columns: 1fr 1fr; gap: 24px; }
          .bos-trust-col { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .bos-main { grid-template-columns: 1fr; gap: 20px; }
          .bos-price { font-size: 28px; }
        }
      `}</style>
    </div>
  );
}
