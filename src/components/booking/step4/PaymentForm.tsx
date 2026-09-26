"use client";

import { useState } from "react";

type CardType = "visa" | "mastercard" | "amex";

interface PaymentFormProps {
  onSubmit: () => void;
}

const CARD_TYPES: { id: CardType; label: string }[] = [
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "amex", label: "American Express" },
];

function VisaIcon() {
  return (
    <svg viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: 42, height: 14 }}>
      <text x="0" y="14" fontFamily="var(--font-open-sans), sans-serif" fontWeight="800" fontSize="14" fill="#1A1F71" letterSpacing="1">VISA</text>
    </svg>
  );
}

function McIcon() {
  return (
    <svg viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: 38, height: 24 }}>
      <circle cx="14" cy="12" r="12" fill="#EB001B" />
      <circle cx="24" cy="12" r="12" fill="#F79E1B" />
      <path fillRule="evenodd" clipRule="evenodd" d="M19 4.8a12 12 0 0 1 0 14.4A12 12 0 0 1 19 4.8z" fill="#FF5F00" />
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: 42, height: 26 }}>
      <rect width="48" height="30" rx="4" fill="#2E77BC" />
      <text x="4" y="20" fontFamily="var(--font-open-sans), sans-serif" fontWeight="800" fontSize="10" fill="#fff">AMEX</text>
    </svg>
  );
}

function formatCardNumber(val: string): string {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(val: string): string {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [cardType, setCardType] = useState<CardType>("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    // API placeholder — navigate without actual payment
    setTimeout(() => {
      setProcessing(false);
      onSubmit();
    }, 1200);
  }

  return (
    <form className="pf-wrap" onSubmit={handleSubmit} noValidate>
      {/* Card type selector */}
      <div className="form-group">
        <p className="form-label">Card type</p>
        <div className="pf-card-types" role="radiogroup" aria-label="Card type">
          {CARD_TYPES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={cardType === id}
              className={`pf-card-btn${cardType === id ? " pf-card-btn--active" : ""}`}
              onClick={() => setCardType(id)}
              aria-label={label}
            >
              {id === "visa" && <VisaIcon />}
              {id === "mastercard" && <McIcon />}
              {id === "amex" && <AmexIcon />}
            </button>
          ))}
        </div>
      </div>

      {/* Card number */}
      <div className="form-group">
        <label htmlFor="pf-cardnum" className="form-label">Card number</label>
        <div className="pf-input-wrap">
          <svg className="pf-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          <input
            id="pf-cardnum"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            className="form-input"
            style={{ paddingLeft: "40px" }}
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            required
          />
        </div>
      </div>

      {/* Expiry + CVV */}
      <div className="pf-row">
        <div className="form-group">
          <label htmlFor="pf-expiry" className="form-label">Expiry date</label>
          <input
            id="pf-expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            className="form-input"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            maxLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pf-cvv" className="form-label">CVV</label>
          <input
            id="pf-cvv"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            className="form-input"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            maxLength={4}
            required
          />
        </div>
      </div>

      {/* Cardholder name */}
      <div className="form-group">
        <label htmlFor="pf-name" className="form-label">Cardholder name</label>
        <input
          id="pf-name"
          type="text"
          autoComplete="cc-name"
          placeholder="Jane Smith"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Pay Now */}
      <button
        type="submit"
        className="btn btn-primary pf-submit"
        disabled={processing}
        aria-busy={processing}
      >
        {processing ? (
          <>
            <span className="pf-spinner" aria-hidden="true" />
            Processing...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Confirm booking
          </>
        )}
      </button>

      <p className="pf-secure">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Your payment details are encrypted and secure. You will not be charged until the work is complete.
      </p>

      <style jsx>{`
        .pf-wrap { display: flex; flex-direction: column; gap: 4px; }
        .pf-card-types { display: flex; gap: 8px; }
        .pf-card-btn {
          padding: 10px 16px; border-radius: var(--radius-md);
          border: 2px solid var(--color-divider); background: #fff;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: border-color var(--t-fast), box-shadow var(--t-fast);
          min-width: 72px; height: 48px;
        }
        .pf-card-btn:hover { border-color: #b0bab5; }
        .pf-card-btn--active { border-color: var(--color-brand-primary); box-shadow: 0 0 0 3px rgba(13,122,95,0.12); }
        .pf-input-wrap { position: relative; }
        .pf-input-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          width: 16px; height: 16px; color: #8A8D8C; pointer-events: none;
        }
        .pf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
        .pf-submit { width: 100%; padding: 16px; font-size: 16px; margin-top: 8px; }
        .pf-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .pf-spinner {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          animation: spin 0.7s linear infinite; flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .pf-secure {
          display: flex; align-items: flex-start; gap: 6px;
          font-size: 12px; color: var(--color-text-disabled);
          line-height: 1.5; margin: 4px 0 0; text-align: center;
          justify-content: center;
        }
        .pf-secure svg { flex-shrink: 0; margin-top: 1px; }

        @media (max-width: 500px) {
          .pf-row { grid-template-columns: 1fr; }
          .pf-card-types { flex-wrap: wrap; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-card-btn { transition: none; }
          .pf-spinner { animation-duration: 0.01ms; animation-iteration-count: 1; }
        }
      `}</style>
    </form>
  );
}
