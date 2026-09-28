"use client";

import {
  MAKES,
  MODELS_BY_MAKE,
  VEHICLE_TYPE_BY_MAKE_MODEL,
  FUEL_TYPES,
  YEARS,
  ENGINE_SIZES_BY_VEHICLE_TYPE,
} from "@/data/vehicleMakes";
import CustomSelect from "@/components/CustomSelect";

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
