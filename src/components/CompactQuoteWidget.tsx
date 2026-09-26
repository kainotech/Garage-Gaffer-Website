"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_CATEGORIES } from "@/data/services";

interface CompactQuoteWidgetProps {
  defaultService?: string;
  idSuffix?: string;
}

export default function CompactQuoteWidget({
  defaultService,
}: CompactQuoteWidgetProps) {
  const router = useRouter();
  const postcodeRef = useRef<HTMLInputElement>(null);
  const regRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const reg = regRef.current?.value?.trim() ?? "";
    const postcode = postcodeRef.current?.value?.trim() ?? "";
    const service = serviceRef.current?.value?.trim() ?? "";
    if (reg && postcode && service) {
      router.push(`/booking?reg=${encodeURIComponent(reg)}&postcode=${encodeURIComponent(postcode)}&service=${encodeURIComponent(service)}`);
    }
  }

  return (
    <>
      <form className="cqw-widget" onSubmit={handleSubmit}>
        <label className="cqw-field">
          <span className="cqw-field-label">Postcode</span>
          <input
            ref={postcodeRef}
            type="text"
            placeholder="BS8 1TH"
            autoComplete="postal-code"
            className="cqw-field-input"
          />
        </label>

        <label className="cqw-field">
          <span className="cqw-field-label">Car reg</span>
          <span className="cqw-plate">
            <span className="cqw-plate-gb">GB</span>
            <input
              ref={regRef}
              className="cqw-plate-input"
              type="text"
              placeholder="AB12 CDE"
            />
          </span>
        </label>

        <label className="cqw-field cqw-field-select">
          <span className="cqw-field-label">What do you need?</span>
          <select ref={serviceRef} className="cqw-field-input cqw-select" defaultValue={defaultService ?? ""}>
            <option value="" disabled hidden>Choose a category</option>
            {SERVICE_CATEGORIES.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <button className="cqw-cta" type="submit">
          See my price
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </form>

      <style jsx>{`
        .cqw-widget {
          position: relative;
          max-width: 720px;
          margin: 0 auto;
          background: #fff;
          border-radius: 16px;
          padding: 6px;
          display: grid;
          grid-template-columns: 1fr 1.2fr 1.1fr auto;
          align-items: center;
          gap: 0;
          box-shadow:
            0 2px 6px rgba(0,0,0,0.04),
            0 16px 40px rgba(10,43,20,0.1);
          border: 1px solid rgba(13,122,95,0.1);
        }
        .cqw-field {
          position: relative;
          padding: 8px 14px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2px;
          min-width: 0;
          cursor: text;
          border-radius: 8px;
          transition: background 120ms ease;
        }
        .cqw-field:hover {
          background: #F8FAF9;
        }
        .cqw-field + .cqw-field::before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          bottom: 10px;
          width: 1px;
          background: #DADCDB;
        }
        .cqw-field-label {
          font-family: var(--font-rubik), sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #595C5B;
        }
        .cqw-field-input {
          background: transparent;
          border: 0;
          outline: none;
          padding: 0;
          font-family: var(--font-rubik), sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #1A1E1D;
          width: 100%;
          min-width: 0;
          appearance: none;
          height: 20px;
        }
        .cqw-field-input::placeholder {
          color: #8A8D8C;
        }

        .cqw-plate {
          display: inline-flex;
          align-items: center;
          background: #FFD60A;
          border: 1px solid #1A1A1A;
          border-radius: 4px;
          overflow: hidden;
          white-space: nowrap;
          height: 26px;
          margin-top: 1px;
        }
        .cqw-plate-gb {
          background: #003399;
          color: #FFD60A;
          width: 22px;
          height: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-open-sans), sans-serif;
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.02em;
        }
        .cqw-plate-input {
          background: transparent;
          border: 0;
          outline: none;
          font-family: var(--font-open-sans), sans-serif;
          font-weight: 800;
          color: #1A1A1A;
          font-size: 13.5px;
          letter-spacing: 0.03em;
          padding: 0 10px 0 8px;
          width: 100%;
          min-width: 0;
          height: 100%;
          text-transform: uppercase;
        }
        .cqw-plate-input::placeholder {
          color: rgba(26,26,26,0.4);
        }

        .cqw-field-select {
          position: relative;
        }
        .cqw-field-select::after {
          content: "";
          position: absolute;
          right: 14px;
          top: 50%;
          width: 7px;
          height: 7px;
          border-right: 1.5px solid #595C5B;
          border-bottom: 1.5px solid #595C5B;
          transform: translateY(-80%) rotate(45deg);
          pointer-events: none;
        }
        .cqw-select {
          padding-right: 20px;
          cursor: pointer;
        }

        .cqw-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #0D7A5F;
          color: #fff;
          height: 32px;
          padding: 0 14px;
          margin: 0 6px 0 4px;
          border: 0;
          border-radius: 8px;
          font-family: var(--font-rubik), sans-serif;
          font-weight: 600;
          font-size: 12.5px;
          cursor: pointer;
          transition:
            background 120ms ease,
            transform 120ms ease,
            box-shadow 120ms ease;
          box-shadow: 0 2px 6px rgba(13,122,95,0.2);
          white-space: nowrap;
        }
        .cqw-cta:hover {
          background: #055240;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(13,122,95,0.28);
        }
        .cqw-cta:active {
          transform: translateY(0);
        }
        .cqw-cta :global(svg) {
          width: 12px;
          height: 12px;
        }

        @media (max-width: 820px) {
          .cqw-widget {
            grid-template-columns: 1fr;
            padding: 8px;
          }
          .cqw-field {
            padding: 10px 14px;
            border-top: 1px solid #DADCDB;
          }
          .cqw-field:first-child {
            border-top: 0;
          }
          .cqw-field + .cqw-field::before {
            display: none;
          }
          .cqw-cta {
            height: 40px;
            padding: 0 18px;
            margin: 4px 0 0;
            font-size: 14px;
            width: 100%;
          }
          .cqw-cta :global(svg) {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </>
  );
}
