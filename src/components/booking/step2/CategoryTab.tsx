"use client";

import { useState } from "react";
import { SERVICE_CATEGORIES } from "@/data/services";
import { SERVICE_BASE_HOURS } from "@/data/servicePricing";
import { calculateServicePrice, VEHICLE_TYPE_MULTIPLIERS, type VehicleType } from "@/data/pricingConfig";
import { formatItemPrice } from "../pricing";
import type { SelectedItem } from "../useBookingSession";

interface CategoryTabProps {
  categorySlug: string;
  vehicleType: VehicleType;
  selectedWork: SelectedItem[];
  onAdd: (item: SelectedItem) => void;
  onRemove: (id: string) => void;
}

export default function CategoryTab({ categorySlug, vehicleType, selectedWork, onAdd, onRemove }: CategoryTabProps) {
  const [search, setSearch] = useState("");
  const category = SERVICE_CATEGORIES.find((c) => c.slug === categorySlug);
  const selectedIds = new Set(selectedWork.map((w) => w.id));

  if (!category) return null;

  const filtered = search.trim()
    ? category.services.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : category.services;

  return (
    <div className="ct-wrap">
      <div className="ct-search-wrap">
        <svg className="ct-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder={`Search ${category.name.toLowerCase()}`}
          className="form-input ct-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label={`Search ${category.name}`}
        />
      </div>

      <div className="ct-section">
        <h3 className="ct-section-title">{category.name}</h3>
        <div className="ct-list">
          {filtered.map((service) => {
            const id = `${category.slug}::${service.name}`;
            const added = selectedIds.has(id);
            const baseHours = SERVICE_BASE_HOURS[id] ?? 0;
            const price = calculateServicePrice(baseHours, vehicleType);
            const labourTime = `${(baseHours * VEHICLE_TYPE_MULTIPLIERS[vehicleType]).toFixed(1)}h`;
            return (
              <div key={id} className="ct-item">
                <div className="ct-item-info">
                  <span className="ct-item-name">{service.name}</span>
                  <span className="ct-item-desc">{service.description}</span>
                </div>
                <div className="ct-item-right">
                  <span className="ct-item-price-col">
                    <span className="ct-item-price">{formatItemPrice({ id, name: service.name, price })}</span>
                    <span className="ct-item-time">Est. {labourTime} labour</span>
                  </span>
                  <button
                    className={`ct-item-btn${added ? " ct-item-btn--remove" : ""}`}
                    onClick={() => (added ? onRemove(id) : onAdd({ id, name: service.name, price, labourTime }))}
                    type="button"
                    aria-label={added ? `Remove ${service.name}` : `Add ${service.name}`}
                  >
                    {added ? "Remove" : "Add"}
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="ct-empty">No services matching &quot;{search}&quot;</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .ct-wrap { display: flex; flex-direction: column; gap: 24px; }
        .ct-search-wrap { position: relative; }
        .ct-search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          width: 16px; height: 16px; color: #8A8D8C; pointer-events: none;
        }
        .ct-search-input { padding-left: 40px !important; }
        .ct-section { display: flex; flex-direction: column; gap: 12px; }
        .ct-section-title {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 15px; font-weight: 800; color: var(--color-text-primary);
        }
        .ct-list { display: flex; flex-direction: column; gap: 2px; }
        .ct-item {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 12px 14px; border-radius: var(--radius-md);
          background: var(--color-bg); transition: background var(--t-fast);
        }
        .ct-item:hover { background: #ECF7EF; }
        .ct-item-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .ct-item-name { font-size: 14px; font-weight: 600; color: var(--color-text-primary); }
        .ct-item-desc { font-size: 12px; color: var(--color-text-secondary); line-height: 1.5; }
        .ct-item-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .ct-item-price-col { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; }
        .ct-item-price {
          font-size: 12px; font-weight: 700; color: var(--color-brand-primary);
          text-transform: uppercase; letter-spacing: 0.04em;
        }
        .ct-item-time { font-size: 10.5px; color: var(--color-text-disabled); white-space: nowrap; }
        .ct-item-btn {
          padding: 6px 14px; border-radius: var(--radius-md);
          background: var(--color-brand-primary); color: #fff;
          border: none; cursor: pointer; font-family: var(--font-rubik), sans-serif;
          font-size: 12px; font-weight: 600;
          transition: background var(--t-fast), transform var(--t-fast);
        }
        .ct-item-btn:hover { background: var(--color-brand-deep); transform: translateY(-1px); }
        .ct-item-btn--remove { background: #fff; color: var(--color-error); border: 1.5px solid var(--color-error); }
        .ct-item-btn--remove:hover { background: #FFF0F0; }
        .ct-empty { font-size: 14px; color: var(--color-text-secondary); padding: 16px 0; }

        @media (prefers-reduced-motion: reduce) {
          .ct-item, .ct-item-btn { transition: none; }
        }
      `}</style>
    </div>
  );
}
