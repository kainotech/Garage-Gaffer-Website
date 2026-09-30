"use client";

import { useState, type FormEvent } from "react";
import CustomSelect from "@/components/CustomSelect";
import { isValidUkPhone, UK_PHONE_ERROR } from "@/lib/phone";
import { isValidEmail, INVALID_EMAIL_ERROR } from "@/lib/validation";

const ROLE_OPTIONS = ["Independent mechanic", "Garage"];

export default function MechanicApplicationForm() {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!role) { setError("Please select whether you're applying as a mechanic or a garage."); return; }
    if (!firstName.trim()) { setError("Please enter your first name."); return; }
    if (!lastName.trim()) { setError("Please enter your last name."); return; }
    if (!isValidEmail(email)) { setError(INVALID_EMAIL_ERROR); return; }
    if (phone.trim() && !isValidUkPhone(phone)) { setError(UK_PHONE_ERROR); return; }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/mechanic-application", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          role,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? "Something went wrong sending your application. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("We're having trouble sending your application right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#FBFDFC] border border-[#DADCDB] rounded-2xl p-12 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-center">
        <h3 className="font-[family-name:var(--font-open-sans)] text-[22px] font-bold text-[#1A1E1D] mb-2">
          Application received
        </h3>
        <p className="font-[family-name:var(--font-rubik)] text-[14px] text-[#595C5B]">
          We&apos;ve sent a confirmation to {email}. We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FBFDFC] border border-[#DADCDB] rounded-2xl p-12 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <h3 className="font-[family-name:var(--font-open-sans)] text-[22px] font-bold text-[#1A1E1D] mb-8">
        Register your interest
      </h3>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="maf-error" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}
        <input type="hidden" name="role" value={role} />
        <div>
          <label htmlFor="applicant-role" className="form-label">
            I&apos;m applying as a…
          </label>
          <CustomSelect
            id="applicant-role"
            label="I'm applying as a…"
            value={role}
            onChange={setRole}
            options={ROLE_OPTIONS}
            placeholder="Select one"
            size="md"
          />
        </div>

        <div className="maf-grid">
          <div className="form-group">
            <label htmlFor="first-name" className="form-label">First Name</label>
            <input id="first-name" name="firstName" type="text" autoComplete="given-name" className="form-input" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="last-name" className="form-label">Last Name</label>
            <input id="last-name" name="lastName" type="text" autoComplete="family-name" className="form-input" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className="form-input" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <div className="maf-phone-group">
            <span className="maf-phone-prefix">
              <svg className="maf-phone-flag" width="20" height="10" viewBox="0 0 60 30" aria-hidden="true">
                <clipPath id="maf-flag-clip">
                  <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                </clipPath>
                <path d="M0,0 v30 h60 v-30 z" fill="#00247d" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#maf-flag-clip)" stroke="#cf142b" strokeWidth="4" />
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6" />
              </svg>
              <span>+44</span>
            </span>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className="maf-phone-input" placeholder="7700 900 000" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-[#0D7A5F] text-white font-[family-name:var(--font-rubik)] font-bold py-3.5 rounded-xl mt-6 hover:bg-[#055240] transition-colors shadow-[0_4px_12px_rgba(13,122,95,0.25)] disabled:opacity-60">
          {isSubmitting ? "Submitting…" : "Submit application"}
        </button>
        <p className="text-[12px] text-[#8A8D8C] text-center mt-4">
          By submitting, you agree to our <a href="/terms#partner-garages" className="underline hover:text-[#0D7A5F]">Terms</a>, including the section for garage and mechanic partners.
          We&apos;ll be in touch within 24 hours.
        </p>
      </form>

      <style jsx>{`
        .maf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
        @media (max-width: 500px) {
          .maf-grid { grid-template-columns: 1fr; }
        }
        .maf-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFF0F0;
          color: var(--color-error);
          border: 1px solid rgba(175, 8, 8, 0.2);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 500;
        }

        .maf-phone-group {
          display: flex;
          align-items: stretch;
          background: #fff;
          border: 1.5px solid var(--color-divider);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border var(--t-fast), box-shadow var(--t-fast);
        }
        .maf-phone-group:hover { border-color: #b0bab5; }
        .maf-phone-group:focus-within {
          border-color: var(--color-brand-primary);
          box-shadow: 0 0 0 3px rgba(13,122,95,0.12);
        }
        .maf-phone-prefix {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 12px;
          background: var(--color-bg);
          border-right: 1.5px solid var(--color-divider);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .maf-phone-flag { border-radius: 2px; flex-shrink: 0; display: block; }
        .maf-phone-input {
          flex: 1;
          min-width: 0;
          border: none;
          background: transparent;
          padding: 12px 14px;
          font-size: 14px;
          color: var(--color-text-primary);
        }
        .maf-phone-input:focus { outline: none; }
        .maf-phone-input::placeholder { color: var(--color-text-disabled); }
      `}</style>
    </div>
  );
}
