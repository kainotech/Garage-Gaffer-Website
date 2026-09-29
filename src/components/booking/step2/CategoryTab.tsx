"use client";

import { useState } from "react";
import { SERVICE_CATEGORIES, ALL_CATEGORIES_SLUG } from "@/data/services";
import { SERVICE_BASE_HOURS } from "@/data/servicePricing";
import { calculateServicePrice, type VehicleType } from "@/data/pricingConfig";
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
  const isAll = categorySlug === ALL_CATEGORIES_SLUG;
  const category = isAll ? undefined : SERVICE_CATEGORIES.find((c) => c.slug === categorySlug);
  const selectedIds = new Set(selectedWork.map((w) => w.id));

  if (!isAll && !category) return null;

  // "All categories" searches every service; a single category searches just its own.
  const query = search.trim().toLowerCase();
  const groups = (isAll ? SERVICE_CATEGORIES : [category!])
    .map((cat) => ({
      cat,
      services: query ? cat.services.filter((s) => s.name.toLowerCase().includes(query)) : cat.services,
    }))
    .filter((g) => !isAll || g.services.length > 0);
  const matchCount = groups.reduce((sum, g) => sum + g.services.length, 0);
  const scopeName = isAll ? "all services" : category!.name.toLowerCase();

  return (
    <div className="ct-wrap">
      <div className="ct-search-wrap">
        <svg className="ct-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder={`Search ${scopeName}`}
          className="form-input ct-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label={`Search ${scopeName}`}
        />
      </div>

      {groups.map(({ cat, services }) => (
        <div key={cat.slug} className="ct-section">
          <div className="ct-section-head">
            <h3 className="ct-section-title">{cat.name}</h3>
            <span className="ct-section-count">{services.length} service{services.length === 1 ? "" : "s"}</span>
          </div>
          <div className="ct-list">
            {services.map((service) => {
              const id = `${cat.slug}::${service.name}`;
              const added = selectedIds.has(id);
              const baseHours = SERVICE_BASE_HOURS[id] ?? 0;
              const price = calculateServicePrice(baseHours, vehicleType);
              return (
                <div key={id} className={`ct-card${added ? " ct-card--added" : ""}`}>
                  <div className="ct-card-info">
                    <span className="ct-card-name">{service.name}</span>
                    <span className="ct-card-desc">{service.description}</span>
                  </div>
                  <div className="ct-card-action">
                    <span className="ct-card-price">{formatItemPrice({ id, name: service.name, price })}</span>
                    <button
                      className={`ct-card-btn${added ? " ct-card-btn--remove" : ""}`}
                      onClick={() => (added ? onRemove(id) : onAdd({ id, name: service.name, price }))}
                      type="button"
                      aria-label={added ? `Remove ${service.name}` : `Add ${service.name}`}
                    >
                      {added ? "Remove" : "Add"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {matchCount === 0 && (
        <p className="ct-empty">No services matching &quot;{search}&quot;</p>
      )}

      <style jsx>{`
        .ct-wrap { display: flex; flex-direction: column; gap: 24px; }
        .ct-search-wrap { position: relative; }
        .ct-search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          width: 16px; height: 16px; color: #8A8D8C; pointer-events: none;
        }
        .ct-search-input { padding-left: 40px !important; }
        .ct-section { display: flex; flex-direction: column; gap: 12px; }
        .ct-section-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
        .ct-section-title {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 18px; font-weight: 800; color: var(--color-text-primary);
        }
        .ct-section-count { font-size: 12.5px; color: var(--color-text-secondary); white-space: nowrap; }
        .ct-list { display: flex; flex-direction: column; gap: 8px; }
        .ct-card {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 11px 16px; border-radius: var(--radius-lg);
          background: #fff; border: 1.5px solid var(--color-divider);
          box-shadow: var(--shadow-sm);
          transition: border-color var(--t-fast), box-shadow var(--t-fast), transform var(--t-fast);
        }
        .ct-card:hover { border-color: #b0bab5; transform: translateY(-1px); box-shadow: var(--shadow-md); }
        .ct-card--added { border-color: var(--color-brand-primary); background: #ECF7EF; }
        .ct-card-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .ct-card-name { font-size: 13px; font-weight: 700; color: var(--color-text-primary); }
        .ct-card-desc { font-size: 12.5px; color: var(--color-text-secondary); line-height: 1.5; }
        .ct-card-action { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
        .ct-card-price {
          font-size: 15px; font-weight: 800; color: var(--color-text-primary);
          font-family: var(--font-open-sans), sans-serif; white-space: nowrap;
        }
        .ct-card-btn {
          padding: 7px 14px; border-radius: var(--radius-md);
          background: var(--color-brand-primary); color: #fff;
          border: none; cursor: pointer; font-family: var(--font-rubik), sans-serif;
          font-size: 12.5px; font-weight: 600; white-space: nowrap;
          transition: background var(--t-fast), transform var(--t-fast);
        }
        .ct-card-btn:hover { background: var(--color-brand-deep); transform: translateY(-1px); }
        .ct-card-btn--remove { background: #fff; color: var(--color-error); border: 1.5px solid var(--color-error); }
        .ct-card-btn--remove:hover { background: #FFF0F0; }
        .ct-empty { font-size: 14px; color: var(--color-text-secondary); padding: 16px 0; }

        @media (max-width: 500px) {
          .ct-card { flex-direction: column; align-items: stretch; gap: 12px; }
          .ct-card-action { justify-content: space-between; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ct-card, .ct-card-btn { transition: none; }
        }
      `}</style>
    </div>
  );
}
