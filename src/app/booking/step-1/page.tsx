"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookingSession } from "@/components/booking/useBookingSession";
import NumberPlateTab from "@/components/booking/step1/NumberPlateTab";
import CarDetailsTab, { CarDetailsValues } from "@/components/booking/step1/CarDetailsTab";
import { VEHICLE_TYPE_BY_MAKE_MODEL } from "@/data/vehicleMakes";
import { Suspense } from "react";

function isPlausiblePlate(value: string): boolean {
  const stripped = value.replace(/\s+/g, "").toUpperCase();
  return /^[A-Z0-9]{2,7}$/.test(stripped);
}

function Step1Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getSession, updateSession, markStepComplete, clearSession } = useBookingSession();

  const [activeTab, setActiveTab] = useState<"plate" | "details">("plate");
  const [reg, setReg] = useState("");
  const [postcode, setPostcode] = useState("");
  const [carDetails, setCarDetails] = useState<CarDetailsValues>({
    make: "", model: "", fuelType: "", engineCapacity: "", year: "", postcode: "",
  });
  const [error, setError] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);

  useEffect(() => {
    if (searchParams.get("clear") === "true") {
      clearSession();
    } else {
      const s = getSession();
      if (s.car.reg) setReg(s.car.reg);
      if (s.car.postcode) setPostcode(s.car.postcode);
      if (s.car.make) {
        setCarDetails({
          make: s.car.make ?? "",
          model: s.car.model ?? "",
          fuelType: s.car.fuelType ?? "",
          engineCapacity: s.car.engineCapacity ?? "",
          year: s.car.year ?? "",
          postcode: s.car.postcode,
        });
      }
    }
  }, []);

  function handleCarDetailChange(field: keyof CarDetailsValues, value: string) {
    setCarDetails((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setError("");

    if (activeTab === "plate") {
      if (!reg.trim()) { setError("Please enter your registration number."); return; }
      if (!postcode.trim()) { setError("Please enter your postcode."); return; }
      if (!isPlausiblePlate(reg)) {
        setError("Please enter a valid UK registration number.");
        return;
      }

      setIsLookingUp(true);
      try {
        const res = await fetch("/api/vehicle-lookup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ registration: reg.trim() }),
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.message ?? "We couldn't look up that registration. Please enter your details manually.");
          setActiveTab("details");
          setIsLookingUp(false);
          return;
        }

        const vehicle = data.vehicle as {
          make?: string; model?: string; fuelType?: string; engineCapacity?: string; year?: string;
        };
        const vehicleType = vehicle.make && vehicle.model
          ? VEHICLE_TYPE_BY_MAKE_MODEL[`${vehicle.make}::${vehicle.model}`] ?? "car"
          : "car";

        updateSession({
          car: {
            reg: reg.trim().toUpperCase(),
            postcode: postcode.trim(),
            make: vehicle.make,
            model: vehicle.model,
            fuelType: vehicle.fuelType,
            engineCapacity: vehicle.engineCapacity,
            year: vehicle.year,
            vehicleType,
          },
        });
      } catch {
        setError("We're having trouble looking up your vehicle right now. Please enter your details manually.");
        setActiveTab("details");
        setIsLookingUp(false);
        return;
      }
      setIsLookingUp(false);
    } else {
      if (!carDetails.make || !carDetails.model || !carDetails.year || !carDetails.postcode) {
        setError("Please fill in all required vehicle details.");
        return;
      }
      const vehicleType = VEHICLE_TYPE_BY_MAKE_MODEL[`${carDetails.make}::${carDetails.model}`] ?? "car";
      updateSession({
        car: {
          reg: "",
          postcode: carDetails.postcode,
          make: carDetails.make,
          model: carDetails.model,
          fuelType: carDetails.fuelType,
          engineCapacity: carDetails.engineCapacity,
          year: carDetails.year,
          vehicleType,
        },
      });
    }

    markStepComplete(1);

    const session = getSession();
    if (session.service) {
      router.push("/booking/step-2");
    } else {
      router.push("/booking/service-select");
    }
  }

  return (
    <div className="s1-outer">
      <div className="s1-card">
        <div className="s1-header">
          <span className="eyebrow">Step 1 of 4</span>
          <h1 className="s1-title">Tell us about your car</h1>
          <p className="s1-subtitle">We need a few details to provide an accurate quote.</p>
        </div>

        {/* Tab switcher */}
        <div className="s1-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === "plate"}
            className={`s1-tab${activeTab === "plate" ? " s1-tab--active" : ""}`}
            onClick={() => setActiveTab("plate")}
            type="button"
          >
            Use Number Plate
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "details"}
            className={`s1-tab${activeTab === "details" ? " s1-tab--active" : ""}`}
            onClick={() => setActiveTab("details")}
            type="button"
          >
            Use Car Details
          </button>
        </div>

        {/* Tab panels */}
        <div className="s1-panel">
          {activeTab === "plate" ? (
            <NumberPlateTab
              reg={reg}
              postcode={postcode}
              onRegChange={setReg}
              onPostcodeChange={setPostcode}
            />
          ) : (
            <CarDetailsTab values={carDetails} onChange={handleCarDetailChange} />
          )}
        </div>

        {error && (
          <div className="s1-error" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <button
          className="btn btn-primary btn-lg s1-next"
          onClick={handleSubmit}
          disabled={isLookingUp}
          type="button"
        >
          {isLookingUp ? "Looking up your vehicle…" : "Next Step"}
          {!isLookingUp && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </button>

        <p className="s1-trust">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-brand-primary)", flexShrink: 0 }} aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          No payment needed at this stage
        </p>
      </div>

      <style jsx>{`
        .s1-outer {
          padding: 40px 24px 80px;
          max-width: 560px;
          margin: 0 auto;
        }
        .s1-card {
          background: #fff;
          border-radius: var(--radius-xl);
          padding: 24px 40px 40px;
          box-shadow: var(--shadow-lg);
        }
        .s1-header {
          margin-bottom: 14px;
        }
        .s1-title {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.4px;
          margin-bottom: 4px;
        }
        .s1-subtitle {
          color: var(--color-text-secondary);
          font-size: 14px;
          margin: 0;
        }
        .s1-tabs {
          display: flex;
          background: var(--color-bg);
          border-radius: var(--radius-md);
          padding: 4px;
          margin-bottom: 14px;
          gap: 4px;
        }
        .s1-tab {
          flex: 1;
          padding: 8px 12px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-family: var(--font-rubik), sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: background var(--t-fast), color var(--t-fast);
        }
        .s1-tab--active {
          background: #fff;
          color: var(--color-brand-primary);
          box-shadow: var(--shadow-sm);
        }
        .s1-panel {
          height: 248px;
          overflow-y: auto;
          overflow-x: hidden;
          margin-bottom: 16px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .s1-panel::-webkit-scrollbar {
          display: none;
        }
        .s1-error {
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
          margin-bottom: 16px;
        }
        .s1-next {
          width: 100%;
          padding: 16px;
          font-size: 15px;
        }
        .s1-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12.5px;
          color: var(--color-text-secondary);
          margin: 12px 0 0;
          text-align: center;
        }

        @media (max-width: 560px) {
          .s1-card {
            padding: 16px 20px 32px;
          }
          .s1-title {
            font-size: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .s1-tab {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function Step1Page() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "var(--color-text-secondary)" }}>Loading...</div>}>
      <Step1Content />
    </Suspense>
  );
}
