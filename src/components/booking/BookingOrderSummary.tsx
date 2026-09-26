"use client";

import type { BookingSession } from "./useBookingSession";
import { formatItemPrice, hasCustomQuoteItems, sumFixedPrice } from "./pricing";

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
            <p className="bos-label">YOUR QUOTE</p>
            {customQuote ? (
              <>
                <div className="bos-price bos-price--quote">Priced after inspection</div>
                <p className="bos-vat">Your mechanic will confirm the price</p>
              </>
            ) : (
              <>
                <div className="bos-price">£{total.toFixed(2)}</div>
                <p className="bos-vat">Quote includes VAT where applicable</p>
              </>
            )}
            <p className="bos-vat">Labour only — parts, if needed, are quoted separately by your mechanic.</p>
            <p className="bos-vehicle">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              {vehicleLabel}{postcode && ` · ${postcode}`}
            </p>
          </div>

          <div className="bos-items-col">
            <p className="bos-label">SELECTED WORK</p>
            <div className="bos-items">
              {session.selectedWork.map((item) => (
                <div key={item.id} className="bos-item">
                  <div className="bos-item-info">
                    <span className="bos-item-name">{item.name}</span>
                    {(item.labourTime || item.partsIncluded) && (
                      <span className="bos-item-sub">
                        {[item.labourTime, item.partsIncluded && "Parts included"].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </div>
                  <span className="bos-item-price">{formatItemPrice(item)}</span>
                </div>
              ))}
              <div className="bos-extra">
                <span>Booking fee</span><span className="bos-free">FREE</span>
              </div>
            </div>
            <a href="/support" className="bos-help-link">
              If you have any questions please check our help centre
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {showTrustBadges && (
            <div className="bos-trust-col">
              <p className="bos-label">YOU&apos;RE COVERED</p>
              <div className="bos-trust-badges">
                {[
                  "Qualified mechanics",
                  "No hidden extras",
                  "1 year parts & repairs warranty",
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
          grid-template-columns: auto 1fr auto;
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
        .bos-vehicle {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; color: rgba(255,255,255,0.55); margin: 8px 0 0;
        }
        .bos-items-col { min-width: 0; }
        .bos-items { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
        .bos-item { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .bos-item-info { flex: 1; min-width: 0; }
        .bos-item-name { font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.9); display: block; }
        .bos-item-sub { font-size: 11px; color: rgba(255,255,255,0.45); display: block; margin-top: 2px; }
        .bos-item-price { font-size: 13.5px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .bos-extra { display: flex; justify-content: space-between; font-size: 12.5px; color: rgba(255,255,255,0.5); padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); }
        .bos-free { font-weight: 700; color: #6EE7B7; }
        .bos-help-link {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 12px; color: rgba(255,255,255,0.4);
          text-decoration: none; transition: color var(--t-fast);
        }
        .bos-help-link:hover { color: rgba(255,255,255,0.7); }
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
        @media (prefers-reduced-motion: reduce) {
          .bos-help-link { transition: none; }
        }
      `}</style>
    </div>
  );
}
