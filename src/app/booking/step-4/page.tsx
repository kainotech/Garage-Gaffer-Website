"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingSession, useBookingLockGuard } from "@/components/booking/useBookingSession";
import { generateBookingRef } from "@/components/booking/bookingRef";
import BookingOrderSummary from "@/components/booking/BookingOrderSummary";

const REASSURANCE_POINTS = [
  {
    title: "You Won't Be Charged Today",
    desc: "No card details needed, we only take payment once the work is complete.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    title: "Parts Quoted Within a Day",
    desc: "The price above is the labour fee. If your job needs spare parts, we'll review it and send a full quotation, with your date confirmed, within 1 working day.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function Step4Page() {
  const router = useRouter();
  const { getSession, updateSession, markStepComplete } = useBookingSession();
  useBookingLockGuard();
  const [session, setSession] = useState(getSession);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    // Deliberately deferred to after mount (not read during render): getSession()
    // reads sessionStorage, which would produce a server/client mismatch since
    // the server has no storage to read from.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(getSession());
  }, []);

  async function handleConfirm() {
    setConfirming(true);
    let bookingRef: string;
    try {
      const res = await fetch("/api/booking-confirm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(session),
      });
      const data = res.ok ? await res.json() : null;
      bookingRef = data?.bookingRef || generateBookingRef();
    } catch {
      // Our own server is unreachable - don't let that stop the customer
      // from completing their booking, just fall back to a locally
      // generated reference.
      bookingRef = generateBookingRef();
    }
    markStepComplete(4);
    updateSession({ confirmed: true, bookingRef });
    router.push("/booking/confirmation");
  }

  return (
    <div>
      <BookingOrderSummary session={session} showTrustBadges />

      <div className="s4-outer container">
        {/* Reassurance points */}
        <div className="s4-why-card">
          <h2 className="s4-why-title">Before you confirm</h2>
          <div className="s4-why-points">
            {REASSURANCE_POINTS.map((pt) => (
              <div key={pt.title} className="s4-why-point">
                <div className="s4-why-icon">{pt.icon}</div>
                <div>
                  <strong className="s4-why-point-title">{pt.title}</strong>
                  <p className="s4-why-point-desc">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm booking */}
        <div className="s4-form-card">
          <h2 className="s4-form-title">Confirm your booking</h2>
          <p className="s4-confirm-copy">
            A mechanic will be assigned and will be in touch ahead of your
            chosen time. You&apos;ll only be charged once the work is done.
          </p>
          <button
            type="button"
            className="btn btn-primary s4-confirm-btn"
            onClick={handleConfirm}
            disabled={confirming}
            aria-busy={confirming}
          >
            {confirming ? "Confirming…" : "Confirm booking"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .s4-outer {
          padding: 40px 24px 80px; max-width: 580px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 24px;
        }
        .s4-why-card {
          background: #fff; border-radius: var(--radius-xl);
          padding: 28px; box-shadow: var(--shadow-sm);
        }
        .s4-why-title { font-size: 17px; font-weight: 800; margin-bottom: 20px; }
        .s4-why-points { display: flex; flex-direction: column; gap: 16px; }
        .s4-why-point { display: flex; gap: 14px; align-items: flex-start; }
        .s4-why-icon {
          width: 40px; height: 40px; border-radius: var(--radius-md);
          background: var(--color-brand-mint); color: var(--color-brand-primary);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .s4-why-point-title { font-size: 14px; font-weight: 700; color: var(--color-text-primary); display: block; margin-bottom: 2px; }
        .s4-why-point-desc { font-size: 13.5px; color: var(--color-text-secondary); margin: 0; }
        .s4-form-card {
          background: #fff; border-radius: var(--radius-xl);
          padding: 28px; box-shadow: var(--shadow-sm);
        }
        .s4-form-title { font-size: 17px; font-weight: 800; margin-bottom: 20px; }
        .s4-confirm-copy { font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; margin: 0 0 20px; }
        .s4-confirm-btn { width: 100%; padding: 16px; font-size: 15px; }
        .s4-confirm-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        @media (max-width: 560px) {
          .s4-why-card, .s4-form-card { padding: 20px 16px; }
        }
      `}</style>
    </div>
  );
}
