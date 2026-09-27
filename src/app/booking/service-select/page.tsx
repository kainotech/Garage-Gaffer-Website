"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingSession, useBookingLockGuard } from "@/components/booking/useBookingSession";
import { SERVICE_CATEGORIES } from "@/data/services";
import { CategoryIcon, accentForIndex } from "@/data/serviceCategoryVisuals";

export default function ServiceSelectPage() {
  const router = useRouter();
  const { getSession, updateSession } = useBookingSession();
  useBookingLockGuard();
  const [vehicleLabel, setVehicleLabel] = useState("");

  useEffect(() => {
    // Deliberately deferred to after mount (not read during render): getSession()
    // reads sessionStorage, which would produce a server/client mismatch since
    // the server has no storage to read from.
    const { car } = getSession();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVehicleLabel([car.make, car.model].filter(Boolean).join(" "));
  }, []);

  function handleSelect(slug: string) {
    updateSession({ service: slug });
    router.push("/booking/step-2");
  }

  return (
    <div className="ss-outer">
      <div className="ss-inner">
        <div className="ss-header">
          <span className="eyebrow">Almost there</span>
          <h1 className="ss-title">
            {vehicleLabel ? `What does your ${vehicleLabel} need?` : "What do you need help with?"}
          </h1>
          <p className="ss-subtitle">
            {vehicleLabel
              ? "You're just seconds away from a fixed price quote for your car. Select a category to see what's included."
              : "Select a category to see what's included."}
          </p>
        </div>

        <div className="ss-cards">
          {SERVICE_CATEGORIES.map((category, i) => {
            const colors = accentForIndex(i);
            return (
              <button
                key={category.slug}
                className="ss-card"
                onClick={() => handleSelect(category.slug)}
                type="button"
                aria-label={`Select ${category.name}`}
              >
                <div className="ss-card-header">
                  <div
                    className="ss-card-icon"
                    style={{ background: colors.well, color: colors.accent }}
                  >
                    <CategoryIcon slug={category.slug} className="w-5 h-5" />
                  </div>
                  <div className="ss-card-text">
                    <h2 className="ss-card-title">{category.name}</h2>
                    <p className="ss-card-count">{category.services.length} services</p>
                  </div>
                  <svg className="ss-card-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
                <ul className="ss-card-list">
                  {category.services.slice(0, 3).map((service) => (
                    <li key={service.name} className="ss-card-list-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {service.name}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .ss-outer {
          min-height: calc(100vh - 144px);
          display: flex;
          align-items: center;
          padding: 48px 24px;
        }
        .ss-inner {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }
        .ss-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .ss-title {
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }
        .ss-subtitle {
          color: var(--color-text-secondary);
          font-size: 16px;
          margin: 0;
        }
        .ss-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }
        .ss-card {
          background: #fff;
          border: 1.5px solid var(--color-divider);
          border-radius: var(--radius-xl);
          padding: 26px;
          text-align: left;
          cursor: pointer;
          transition:
            border-color var(--t-fast),
            box-shadow var(--t-fast),
            transform var(--t-fast);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .ss-card:hover {
          border-color: var(--color-brand-primary);
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
        }
        .ss-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          min-height: 62px;
        }
        .ss-card-icon {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ss-card-text {
          min-width: 0;
          flex: 1;
        }
        .ss-card-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.3;
        }
        .ss-card-count {
          font-size: 12.5px;
          color: var(--color-text-secondary);
          margin: 2px 0 0;
        }
        .ss-card-arrow {
          color: var(--color-text-disabled);
          flex-shrink: 0;
          transition: transform var(--t-fast), color var(--t-fast);
        }
        .ss-card:hover .ss-card-arrow {
          color: var(--color-brand-primary);
          transform: translateX(2px);
        }
        .ss-card-list {
          list-style: none;
          padding: 14px 0 0;
          margin: 0;
          border-top: 1px solid var(--color-divider);
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .ss-card-list-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: var(--color-text-secondary);
        }
        .ss-card-list-item svg {
          color: var(--color-brand-primary);
          flex-shrink: 0;
        }

        @media (max-width: 1100px) {
          .ss-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .ss-outer {
            min-height: 0;
            padding: 32px 20px;
          }
          .ss-cards {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ss-card, .ss-card-arrow {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
