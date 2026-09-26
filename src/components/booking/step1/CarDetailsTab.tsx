"use client";

import { useEffect, useRef, useState } from "react";
import {
  MAKES,
  MODELS_BY_MAKE,
  VEHICLE_TYPE_BY_MAKE_MODEL,
  FUEL_TYPES,
  YEARS,
  ENGINE_SIZES_BY_VEHICLE_TYPE,
} from "@/data/vehicleMakes";

export interface CarDetailsValues {
  make: string;
  model: string;
  fuelType: string;
  engineCapacity: string;
  year: string;
  postcode: string;
}

interface CarDetailsTabProps {
  values: CarDetailsValues;
  onChange: (field: keyof CarDetailsValues, value: string) => void;
}

/* ── Custom dropdown ── */
interface CustomSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}

function CustomSelect({ id, label, value, onChange, options, placeholder, disabled }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <div className="cs-wrap" ref={wrapRef} onKeyDown={handleKey}>
      <button
        id={id}
        type="button"
        className={[
          "cs-trigger",
          open ? "cs-trigger--open" : "",
          disabled ? "cs-trigger--disabled" : "",
          value ? "cs-trigger--filled" : "",
        ].join(" ")}
        onClick={() => !disabled && setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
      >
        <span className="cs-trigger-text">{value || placeholder}</span>
        <svg
          className={`cs-chevron${open ? " cs-chevron--up" : ""}`}
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="cs-dropdown" role="listbox" aria-label={label}>
          {options.map((opt) => {
            const selected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={selected}
                className={`cs-option${selected ? " cs-option--selected" : ""}`}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                <span>{opt}</span>
                {selected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .cs-wrap { position: relative; }

        .cs-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 0 10px;
          height: 36px;
          line-height: 36px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--color-divider);
          background: #fff;
          cursor: pointer;
          text-align: left;
          transition: border-color var(--t-fast), box-shadow var(--t-fast);
          font-family: var(--font-rubik), sans-serif;
          box-sizing: border-box;
        }
        .cs-trigger:hover:not(:disabled) { border-color: #b0bab5; }
        .cs-trigger--open {
          border-color: var(--color-brand-primary);
          box-shadow: 0 0 0 3px rgba(13, 122, 95, 0.12);
        }
        .cs-trigger--disabled {
          background: #f5f7f6;
          cursor: not-allowed;
          opacity: 0.55;
        }

        .cs-trigger-text {
          font-size: 13px;
          color: var(--color-text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        .cs-trigger:not(.cs-trigger--filled) .cs-trigger-text {
          color: var(--color-text-secondary);
        }

        .cs-chevron {
          flex-shrink: 0;
          color: var(--color-text-secondary);
          transition: transform var(--t-base);
        }
        .cs-chevron--up { transform: rotate(180deg); }

        .cs-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          z-index: 100;
          background: #fff;
          border: 1.5px solid var(--color-brand-primary);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          max-height: 200px;
          overflow-y: auto;
          padding: 4px;
          animation: cs-drop 140ms ease;
        }

        .cs-option {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 8px 10px;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 6px;
          font-family: var(--font-rubik), sans-serif;
          font-size: 13.5px;
          color: var(--color-text-primary);
          text-align: left;
          transition: background var(--t-fast);
        }
        .cs-option:hover { background: var(--color-brand-mint); }
        .cs-option--selected {
          color: var(--color-brand-primary);
          font-weight: 600;
          background: var(--color-brand-mint);
        }
        .cs-option--selected svg { color: var(--color-brand-primary); }

        @keyframes cs-drop {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cs-chevron, .cs-trigger, .cs-option { transition: none; }
          .cs-dropdown { animation: none; }
        }
      `}</style>
    </div>
  );
}

/* ── Main component ── */
export default function CarDetailsTab({ values, onChange }: CarDetailsTabProps) {
  const models = values.make ? (MODELS_BY_MAKE[values.make] ?? []) : [];
  const vehicleType = values.make && values.model
    ? VEHICLE_TYPE_BY_MAKE_MODEL[`${values.make}::${values.model}`] ?? "car"
    : "car";
  const engineSizes = ENGINE_SIZES_BY_VEHICLE_TYPE[vehicleType];

  return (
    <div className="cdt-stack">
      <CustomSelect
        id="cdt-make"
        label="Make"
        value={values.make}
        placeholder="Select make"
        options={MAKES}
        onChange={(v) => {
          onChange("make", v);
          onChange("model", "");
          onChange("fuelType", "");
          onChange("engineCapacity", "");
        }}
      />

      <CustomSelect
        id="cdt-model"
        label="Model"
        value={values.model}
        placeholder="Select model"
        options={models}
        disabled={!values.make}
        onChange={(v) => { onChange("model", v); onChange("engineCapacity", ""); }}
      />

      <CustomSelect
        id="cdt-fuel"
        label="Fuel type"
        value={values.fuelType}
        placeholder="Select fuel type"
        options={FUEL_TYPES}
        disabled={!values.model}
        onChange={(v) => onChange("fuelType", v)}
      />

      <CustomSelect
        id="cdt-engine"
        label="Engine size"
        value={values.engineCapacity}
        placeholder="Select engine size"
        options={engineSizes}
        disabled={!values.fuelType}
        onChange={(v) => onChange("engineCapacity", v)}
      />

      <CustomSelect
        id="cdt-year"
        label="Year"
        value={values.year}
        placeholder="Select year"
        options={YEARS}
        disabled={!values.engineCapacity}
        onChange={(v) => onChange("year", v)}
      />

      <div className="cdt-field">
        <input
          id="cdt-postcode"
          type="text"
          placeholder="Postcode — e.g. BS1 4DJ"
          autoComplete="postal-code"
          className="cdt-input"
          value={values.postcode}
          onChange={(e) => onChange("postcode", e.target.value.toUpperCase())}
        />
      </div>

      <style jsx>{`
        .cdt-stack {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cdt-field {
          display: flex;
          flex-direction: column;
        }
        .cdt-input {
          height: 36px;
          line-height: 36px;
          padding: 0 10px;
          box-sizing: border-box;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--color-divider);
          background: #fff;
          font-family: var(--font-rubik), sans-serif;
          font-size: 13px;
          color: var(--color-text-primary);
          outline: none;
          transition: border-color var(--t-fast), box-shadow var(--t-fast);
          width: 100%;
          box-sizing: border-box;
        }
        .cdt-input::placeholder { color: var(--color-text-secondary); }
        .cdt-input:hover { border-color: #b0bab5; }
        .cdt-input:focus {
          border-color: var(--color-brand-primary);
          box-shadow: 0 0 0 3px rgba(13, 122, 95, 0.12);
        }

        @media (prefers-reduced-motion: reduce) {
          .cdt-input { transition: none; }
        }
      `}</style>
    </div>
  );
}
