"use client";

import { useState } from "react";
import CustomSelect from "@/components/CustomSelect";

const ROLE_OPTIONS = ["Independent mechanic", "Garage"];

export default function MechanicApplicationForm() {
  const [role, setRole] = useState("");

  return (
    <div className="bg-[#FBFDFC] border border-[#DADCDB] rounded-2xl p-12 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <h3 className="font-[family-name:var(--font-open-sans)] text-[22px] font-bold text-[#1A1E1D] mb-8">
        Register your interest
      </h3>
      <form className="space-y-5">
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
            <input id="first-name" name="firstName" type="text" autoComplete="given-name" className="form-input" placeholder="John" />
          </div>
          <div className="form-group">
            <label htmlFor="last-name" className="form-label">Last Name</label>
            <input id="last-name" name="lastName" type="text" autoComplete="family-name" className="form-input" placeholder="Doe" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="maf-optional">(optional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className="form-input" placeholder="john@example.com" />
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
            <input id="phone" name="phone" type="tel" autoComplete="tel" className="maf-phone-input" placeholder="7700 900 000" />
          </div>
        </div>

        <button type="submit" className="w-full bg-[#0D7A5F] text-white font-[family-name:var(--font-rubik)] font-bold py-3.5 rounded-xl mt-6 hover:bg-[#055240] transition-colors shadow-[0_4px_12px_rgba(13,122,95,0.25)]">
          Submit application
        </button>
        <p className="text-[12px] text-[#8A8D8C] text-center mt-4">
          By submitting, you agree to our <a href="/terms" className="underline hover:text-[#0D7A5F]">Terms</a> and Privacy Policy.
          We&apos;ll be in touch within 24 hours.
        </p>
      </form>

      <style jsx>{`
        .maf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
        @media (max-width: 500px) {
          .maf-grid { grid-template-columns: 1fr; }
        }
        .maf-optional { font-weight: 400; color: var(--color-text-disabled); }

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
