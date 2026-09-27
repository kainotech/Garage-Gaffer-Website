"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookingSession, useBookingLockGuard, SelectedItem, BookingSession } from "@/components/booking/useBookingSession";
import CategoryTab from "@/components/booking/step2/CategoryTab";
import PriceSummaryPanel from "@/components/booking/step2/PriceSummaryPanel";
import PriceSummaryStickyBar from "@/components/booking/step2/PriceSummaryStickyBar";
import { SERVICE_CATEGORIES } from "@/data/services";
import { SERVICE_BASE_HOURS } from "@/data/servicePricing";
import { calculateServicePrice, VEHICLE_TYPE_MULTIPLIERS } from "@/data/pricingConfig";

function Step2Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getSession, updateSession, markStepComplete } = useBookingSession();
  const isFreshEntry = !!(searchParams.get("reg") && searchParams.get("postcode") && searchParams.get("service"));
  useBookingLockGuard(!isFreshEntry);

  const [session, setSession] = useState<BookingSession>(() => getSession());
  const [activeSlug, setActiveSlug] = useState(SERVICE_CATEGORIES[0].slug);
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
          labourTime: `${(baseHours * VEHICLE_TYPE_MULTIPLIERS[vehicleType]).toFixed(1)}h`,
        };
      }),
    );
    if (isValidSlug(s.service)) {
      setActiveSlug(s.service);
    } else {
      router.push("/booking/service-select");
      return;
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
  const vehicleLabel = [session.car.make, session.car.model].filter(Boolean).join(" ");

  return (
    <div className="s2-outer">
      <div className="s2-inner container">
        {/* Left panel */}
        <div className="s2-left">
          <div className="s2-header">
            <span className="eyebrow">Step 2 of 4</span>
            <h1 className="s2-title">
              {vehicleLabel ? `What does your ${vehicleLabel} need?` : "Select your work"}
            </h1>
            <p className="s2-subtitle">You&apos;re just seconds away from a fixed price quote for your car.</p>
          </div>

          {/* Category tabs */}
          <div className="s2-tabs" role="tablist">
            {SERVICE_CATEGORIES.map((category) => (
              <button
                key={category.slug}
                role="tab"
                aria-selected={activeSlug === category.slug}
                className={`s2-tab${activeSlug === category.slug ? " s2-tab--active" : ""}`}
                onClick={() => setActiveSlug(category.slug)}
                type="button"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="s2-tab-content">
            <CategoryTab
              categorySlug={activeSlug}
              vehicleType={session.car.vehicleType ?? "car"}
              selectedWork={selectedWork}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          </div>
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
        .s2-inner {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 28px;
          align-items: flex-start;
        }
        .s2-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .s2-header { margin-bottom: 4px; }
        .s2-title { font-size: 26px; font-weight: 800; letter-spacing: -0.4px; margin-bottom: 4px; }
        .s2-subtitle { color: var(--color-text-secondary); font-size: 14px; margin: 0; }
        .s2-tabs {
          display: flex; gap: 4px; flex-wrap: wrap;
          background: var(--color-bg);
          border-radius: var(--radius-md);
          padding: 4px;
        }
        .s2-tab {
          padding: 9px 14px; border-radius: 6px; border: none;
          background: transparent;
          font-family: var(--font-rubik), sans-serif; font-size: 13px; font-weight: 600;
          color: var(--color-text-secondary); cursor: pointer;
          transition: background var(--t-fast), color var(--t-fast);
          white-space: nowrap;
        }
        .s2-tab--active {
          background: #fff; color: var(--color-brand-primary); box-shadow: var(--shadow-sm);
        }
        .s2-tab-content {
          background: #fff; border-radius: var(--radius-xl);
          padding: 24px; box-shadow: var(--shadow-sm);
        }
        .s2-sidebar { }
        .s2-sticky-mobile { display: none; }

        @media (max-width: 960px) {
          .s2-inner {
            grid-template-columns: 1fr;
          }
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
          .s2-tab-content { padding: 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .s2-tab { transition: none; }
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
