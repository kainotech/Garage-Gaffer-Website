"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useBookingSession, BookingSession } from "@/components/booking/useBookingSession";
import { formatItemPrice, formatPriceLabel, formatVehicleLabel } from "@/components/booking/pricing";
import { formatSlotLabel } from "@/components/booking/step3/slotLabel";
import { generateBookingRef } from "@/components/booking/bookingRef";

export default function ConfirmationPage() {
  const { getSession, clearSession } = useBookingSession();
  const [session, setSession] = useState<BookingSession | null>(null);
  // Normally set by POST /api/booking-confirm on Step 4; this fallback only
  // covers an old session saved before that existed.
  const [fallbackRef] = useState(generateBookingRef);

  useEffect(() => {
    // Deliberately deferred to after mount (not read during render): getSession()
    // reads sessionStorage, which would produce a server/client mismatch since
    // the server has no storage to read from.
    const s = getSession();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(s);
  }, []);

  const ref = session?.bookingRef || fallbackRef;
  const priceLabel = formatPriceLabel(session?.selectedWork ?? []);
  const car = session?.car;
  const locationLabel = [session?.details?.address1, session?.details?.city, session?.details?.postcode]
    .filter(Boolean)
    .join(", ");
  const vehicleLabel = car
    ? formatVehicleLabel(car)
    : "";

  return (
    <div className="conf-outer">
      {/* Success banner */}
      <div className="conf-banner">
        <div className="conf-check">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="conf-heading">Booking Confirmed!</h1>
        <p className="conf-sub">
          We&apos;ve sent a confirmation to{" "}
          <strong>{session?.details?.email || "your email"}</strong>.
          We&apos;ll confirm and allocate your mechanic within 2 hours.
        </p>
        <div className="conf-ref">
          Booking reference: <strong>{ref}</strong>
        </div>
      </div>

      {/* Summary card */}
      {session && (
        <div className="conf-card">
          <h2 className="conf-card-title">Booking summary</h2>

          {vehicleLabel && (
            <div className="conf-row">
              <span className="conf-row-label">Vehicle</span>
              <span className="conf-row-val">{vehicleLabel}{car?.postcode && ` · ${car.postcode}`}</span>
            </div>
          )}

          {session.selectedWork.length > 0 && (
            <div className="conf-row conf-row--block">
              <span className="conf-row-label">Work booked</span>
              <div className="conf-work-list">
                {session.selectedWork.map((item) => (
                  <div key={item.id} className="conf-work-item">
                    <span>{item.name}</span>
                    <span className="conf-work-price">{formatItemPrice(item)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {session.details?.firstName && (
            <div className="conf-row">
              <span className="conf-row-label">Name</span>
              <span className="conf-row-val">{session.details.firstName} {session.details.lastName}</span>
            </div>
          )}

          {locationLabel && (
            <div className="conf-row">
              <span className="conf-row-label">Location</span>
              <span className="conf-row-val">{locationLabel}</span>
            </div>
          )}

          {session.details?.availability && (
            <div className="conf-row">
              <span className="conf-row-label">Date &amp; time</span>
              <span className="conf-row-val">{formatSlotLabel(session.details.availability)}</span>
            </div>
          )}

          <div className="conf-total-row">
            <span className="conf-total-label">Labour fee</span>
            <span className="conf-total-amount">
              {priceLabel}
            </span>
          </div>

          <p className="conf-payment-note">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            You will only be charged after the work is complete.
          </p>
          <p className="conf-payment-note">This is the labour fee. If parts are needed, we&apos;ll send a full quotation within 1 working day.</p>
        </div>
      )}

      {/* Trust points */}
      <div className="conf-trust">
        {["Fully vetted & insured mechanics", "Mechanic allocated within 2 hours", "Parts quoted within 1 working day"].map((t) => (
          <div key={t} className="conf-trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t}
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="conf-ctas">
        <Link href="/" className="btn btn-primary conf-home-btn" onClick={() => clearSession()}>
          Back to Home
        </Link>
        <Link href="/support" className="btn btn-outline conf-support-btn">
          Help Centre
        </Link>
      </div>

      <style jsx>{`
        .conf-outer {
          max-width: 560px; margin: 0 auto; padding: 48px 24px 80px;
          display: flex; flex-direction: column; gap: 24px;
        }
        .conf-banner {
          text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .conf-check {
          width: 72px; height: 72px; border-radius: 50%;
          background: var(--color-success); color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(13,122,95,0.3);
        }
        .conf-heading {
          font-size: 30px; font-weight: 900; letter-spacing: -0.5px; margin: 0;
        }
        .conf-sub {
          font-size: 15px; color: var(--color-text-secondary); line-height: 1.6; margin: 0; max-width: 380px;
        }
        .conf-ref {
          background: var(--color-brand-mint); color: var(--color-brand-primary);
          border-radius: var(--radius-md); padding: 10px 20px;
          font-size: 14px; font-weight: 600;
        }
        .conf-card {
          background: #fff; border-radius: var(--radius-xl);
          padding: 28px; box-shadow: var(--shadow-md);
          display: flex; flex-direction: column; gap: 14px;
        }
        .conf-card-title { font-size: 17px; font-weight: 800; margin: 0; }
        .conf-row {
          display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
          padding-bottom: 12px; border-bottom: 1px solid var(--color-divider);
        }
        .conf-row--block { flex-direction: column; }
        .conf-row-label { font-size: 12px; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.06em; flex-shrink: 0; }
        .conf-row-val { font-size: 14px; color: var(--color-text-primary); font-weight: 500; text-align: right; }
        .conf-work-list { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
        .conf-work-item { display: flex; justify-content: space-between; font-size: 13.5px; color: var(--color-text-primary); }
        .conf-work-price { font-weight: 600; }
        .conf-total-row { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
        .conf-total-label { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
        .conf-total-amount { font-size: 24px; font-weight: 900; font-family: var(--font-open-sans), sans-serif; }
        .conf-payment-note {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--color-text-secondary); margin: 0;
        }
        .conf-payment-note svg { color: var(--color-success); flex-shrink: 0; }
        .conf-trust {
          display: flex; flex-direction: column; gap: 10px;
          background: var(--color-brand-mint); border-radius: var(--radius-lg); padding: 20px;
        }
        .conf-trust-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 14px; color: var(--color-brand-deep); font-weight: 500;
        }
        .conf-trust-item svg { color: var(--color-success); flex-shrink: 0; }
        .conf-ctas { display: flex; gap: 12px; }
        .conf-home-btn { flex: 1; padding: 14px; font-size: 15px; justify-content: center; }
        .conf-support-btn { flex: 1; padding: 14px; font-size: 15px; justify-content: center; }

        @media (max-width: 500px) {
          .conf-ctas { flex-direction: column; }
          .conf-heading { font-size: 26px; }
        }
      `}</style>
    </div>
  );
}
