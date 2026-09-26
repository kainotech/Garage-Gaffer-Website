"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingSession } from "@/components/booking/useBookingSession";
import BookingOrderSummary from "@/components/booking/BookingOrderSummary";
import PaymentForm from "@/components/booking/step4/PaymentForm";

const WHY_CARD_POINTS = [
  {
    title: "We Won't Charge You",
    desc: "You won't pay a penny until the work is complete.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    title: "Extra Protection",
    desc: "If any issues arise after the booking it's easier to refund you.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Free Cancellation",
    desc: "Up to 24 hours before the booking.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function Step4Page() {
  const router = useRouter();
  const { getSession, markStepComplete } = useBookingSession();
  const [session, setSession] = useState(getSession);

  useEffect(() => {
    setSession(getSession());
  }, []);

  function handlePay() {
    markStepComplete(4);
    router.push("/booking/confirmation");
  }

  return (
    <div>
      <BookingOrderSummary session={session} showTrustBadges />

      <div className="s4-outer container">
        {/* Why card details */}
        <div className="s4-why-card">
          <h2 className="s4-why-title">Why provide your card details now?</h2>
          <div className="s4-why-points">
            {WHY_CARD_POINTS.map((pt) => (
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

        {/* Payment form */}
        <div className="s4-form-card">
          <h2 className="s4-form-title">Payment details</h2>
          <PaymentForm onSubmit={handlePay} />
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

        @media (max-width: 560px) {
          .s4-why-card, .s4-form-card { padding: 20px 16px; }
        }
      `}</style>
    </div>
  );
}
