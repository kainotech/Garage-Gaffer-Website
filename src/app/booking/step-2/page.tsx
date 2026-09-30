"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookingSession, useBookingLockGuard, useBookingStepGuard, SelectedItem, BookingSession } from "@/components/booking/useBookingSession";
import CategoryTab from "@/components/booking/step2/CategoryTab";
import PriceSummaryPanel from "@/components/booking/step2/PriceSummaryPanel";
import PriceSummaryStickyBar from "@/components/booking/step2/PriceSummaryStickyBar";
import CustomSelect from "@/components/CustomSelect";
import { SERVICE_CATEGORIES, ALL_CATEGORIES_SLUG, ALL_CATEGORIES_NAME, TOTAL_SERVICE_COUNT } from "@/data/services";
import { SERVICE_BASE_HOURS } from "@/data/servicePricing";
import { calculateServicePrice } from "@/data/pricingConfig";
import { CategoryIcon } from "@/data/serviceCategoryVisuals";

function Step2Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getSession, updateSession, markStepComplete } = useBookingSession();
  const isFreshEntry = !!(searchParams.get("reg") && searchParams.get("postcode") && searchParams.get("service"));
  useBookingLockGuard(!isFreshEntry);
  useBookingStepGuard(2, !isFreshEntry);

  const [session, setSession] = useState<BookingSession>(() => getSession());
  const [activeSlug, setActiveSlug] = useState(ALL_CATEGORIES_SLUG);
  const [selectedWork, setSelectedWork] = useState<SelectedItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const reg = searchParams.get("reg");
    const postcode = searchParams.get("postcode");
    const service = searchParams.get("service");
    const isValidSlug = (slug: string | null): slug is string =>
      !!slug && SERVICE_CATEGORIES.some((c) => c.slug === slug);

    if (reg && postcode && isValidSlug(service)) {
      updateSession({
        car: { reg, postcode },
        service,
        completedSteps: [1],
        confirmed: false,
      });
      // clean URL
      router.replace("/booking/step-2");
    }

    // Deliberately deferred to after mount (not read during render): getSession()
    // reads sessionStorage, which would produce a server/client mismatch since
    // the server has no storage to read from.
    const s = getSession();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(s);
    const vehicleType = s.car.vehicleType ?? "car";
    setSelectedWork(
      (s.selectedWork ?? []).map((item) => {
        const baseHours = SERVICE_BASE_HOURS[item.id];
        if (baseHours == null) return item;
        return {
          ...item,
          price: calculateServicePrice(baseHours, vehicleType),
        };
      }),
    );
    if (isValidSlug(s.service) || s.service === ALL_CATEGORIES_SLUG) {
      setActiveSlug(s.service);
    }
    setInitialized(true);
  }, []);

  function handleAdd(item: SelectedItem) {
    setSelectedWork((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }

  function handleRemove(id: string) {
    setSelectedWork((prev) => prev.filter((i) => i.id !== id));
  }

  function handleNextStep() {
    updateSession({ selectedWork, service: activeSlug });
    markStepComplete(2);
    router.push("/booking/step-3");
  }

  if (!initialized) {
    return <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-secondary)" }}>Loading...</div>;
  }

  const currentSession = { ...session, service: activeSlug };
  const categoryOptions = [ALL_CATEGORIES_NAME, ...SERVICE_CATEGORIES.map((c) => c.name)];
  const activeCategoryName =
    SERVICE_CATEGORIES.find((c) => c.slug === activeSlug)?.name ?? ALL_CATEGORIES_NAME;

  function handleCategorySelect(name: string) {
    setActiveSlug(SERVICE_CATEGORIES.find((c) => c.name === name)?.slug ?? ALL_CATEGORIES_SLUG);
  }

  const vehicleLabel = [session.car.make, session.car.model].filter(Boolean).join(" ");

  return (
    <div className="s2-outer">
      <div className="s2-inner container">
        <div className="s2-header">
          <span className="eyebrow">Step 2 of 4</span>
          <h1 className="s2-title">
            {vehicleLabel ? `What does your ${vehicleLabel} need?` : "Select your work"}
          </h1>
          <p className="s2-subtitle">Prices shown are for labour only. If your job needs spare parts, we&apos;ll confirm the cost with you separately.</p>
        </div>

        <div className="s2-body">
          {/* Category dropdown (mobile / tablet) */}
          <div className="s2-nav-mobile">
            <label htmlFor="s2-category-select" className="form-label">Category</label>
            <CustomSelect
              id="s2-category-select"
              label="Service category"
              size="md"
              value={activeCategoryName}
              onChange={handleCategorySelect}
              options={categoryOptions}
              placeholder={ALL_CATEGORIES_NAME}
              menuMaxHeight={320}
            />
          </div>

          {/* Category nav (desktop) */}
          <nav className="s2-nav" aria-label="Service categories">
            <ul className="s2-nav-list">
              <li>
                <button
                  type="button"
                  aria-current={activeSlug === ALL_CATEGORIES_SLUG}
                  className={`s2-nav-item${activeSlug === ALL_CATEGORIES_SLUG ? " s2-nav-item--active" : ""}`}
                  onClick={() => setActiveSlug(ALL_CATEGORIES_SLUG)}
                >
                  <span className="s2-nav-icon">
                    <CategoryIcon slug={ALL_CATEGORIES_SLUG} />
                  </span>
                  <span className="s2-nav-label">{ALL_CATEGORIES_NAME}</span>
                  <span className="s2-nav-count">{TOTAL_SERVICE_COUNT}</span>
                </button>
              </li>
              {SERVICE_CATEGORIES.map((category) => {
                const isActive = category.slug === activeSlug;
                return (
                  <li key={category.slug}>
                    <button
                      type="button"
                      aria-current={isActive}
                      className={`s2-nav-item${isActive ? " s2-nav-item--active" : ""}`}
                      onClick={() => setActiveSlug(category.slug)}
                    >
                      <span className="s2-nav-icon">
                        <CategoryIcon slug={category.slug} />
                      </span>
                      <span className="s2-nav-label">{category.name}</span>
                      <span className="s2-nav-count">{category.services.length}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Items for the active category */}
          <div className="s2-main">
            <CategoryTab
              categorySlug={activeSlug}
              vehicleType={session.car.vehicleType ?? "car"}
              selectedWork={selectedWork}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          </div>

          {/* Right sidebar (desktop) */}
          <div className="s2-sidebar">
            <PriceSummaryPanel
              selectedWork={selectedWork}
              session={currentSession}
              onRemove={handleRemove}
              onNextStep={handleNextStep}
            />
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="s2-sticky-mobile">
        <PriceSummaryStickyBar
          selectedWork={selectedWork}
          session={currentSession}
          onRemove={handleRemove}
          onNextStep={handleNextStep}
        />
      </div>

      <style jsx>{`
        .s2-outer {
          padding: 32px 0 120px;
        }
        .s2-header { margin-bottom: 24px; max-width: 640px; }
        .s2-title { font-size: 26px; font-weight: 800; letter-spacing: -0.4px; margin-bottom: 4px; }
        .s2-subtitle { color: var(--color-text-secondary); font-size: 14px; margin: 0; }

        .s2-body {
          display: grid;
          grid-template-columns: 220px 1fr 340px;
          gap: 24px;
        }

        .s2-nav { min-width: 0; }
        .s2-nav-list {
          list-style: none; margin: 0; padding: 6px;
          display: flex; flex-direction: column; gap: 2px;
          background: #fff; border: 1px solid var(--color-divider);
          border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);
          position: sticky; top: 88px;
        }
        .s2-nav-item {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 9px 10px; border-radius: var(--radius-md);
          border: none; background: transparent; cursor: pointer;
          text-align: left; transition: background var(--t-fast);
        }
        .s2-nav-item:hover { background: var(--color-bg); }
        .s2-nav-item--active { background: #ECF7EF; }
        .s2-nav-icon {
          width: 28px; height: 28px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          background: var(--color-bg); color: var(--color-brand-primary);
        }
        .s2-nav-item--active .s2-nav-icon { background: #fff; }
        .s2-nav-icon :global(svg) { width: 15px; height: 15px; }
        .s2-nav-label {
          flex: 1; min-width: 0; font-family: var(--font-rubik), sans-serif;
          font-size: 13px; font-weight: 600; color: var(--color-text-secondary);
        }
        .s2-nav-item--active .s2-nav-label { color: var(--color-text-primary); }
        .s2-nav-count {
          font-family: var(--font-rubik), sans-serif; font-size: 11px; font-weight: 600;
          color: var(--color-text-disabled); flex-shrink: 0;
        }
        .s2-nav-item--active .s2-nav-count { color: var(--color-brand-primary); }

        .s2-nav-mobile { display: none; min-width: 0; }
        .s2-main { min-width: 0; }
        .s2-sidebar { }
        .s2-sticky-mobile { display: none; }

        @media (max-width: 960px) {
          .s2-body {
            grid-template-columns: 1fr;
          }
          .s2-nav { display: none; }
          .s2-nav-mobile { display: block; }
          .s2-sidebar { display: none; }
          .s2-sticky-mobile {
            display: block;
            position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
          }
          .s2-outer {
            padding-bottom: 90px;
          }
        }

        @media (max-width: 560px) {
          .s2-outer { padding: 20px 0 90px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .s2-nav-item { transition: none; }
        }
      `}</style>
    </div>
  );
}

export default function Step2Page() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "var(--color-text-secondary)" }}>Loading...</div>}>
      <Step2Content />
    </Suspense>
  );
}
