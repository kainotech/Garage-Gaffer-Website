"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useBookingSession } from "./useBookingSession";

const STEPS = [
  { label: "Your Vehicle", path: "/booking/step-1", step: 1 },
  { label: "Select Work", path: "/booking/step-2", step: 2 },
  { label: "Details", path: "/booking/step-3", step: 3 },
  { label: "Book", path: "/booking/step-4", step: 4 },
];

function getActiveStep(pathname: string): number {
  if (pathname.startsWith("/booking/step-1")) return 1;
  if (pathname.startsWith("/booking/service-select")) return 2;
  if (pathname.startsWith("/booking/step-2")) return 2;
  if (pathname.startsWith("/booking/step-3")) return 3;
  if (pathname.startsWith("/booking/step-4")) return 4;
  if (pathname.startsWith("/booking/confirmation")) return 4;
  return 1;
}

export default function BookingProgressBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { getSession } = useBookingSession();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    // Deliberately deferred to after mount (not read during render): getSession()
    // reads sessionStorage, which would produce a server/client mismatch since
    // the server has no storage to read from.
    const session = getSession();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompletedSteps(session.completedSteps ?? []);
  }, [pathname]); // re-read on every navigation

  const activeStep = getActiveStep(pathname);
  const progressPct = ((activeStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-inner">
        <div className="progress-track" aria-hidden="true">
          <div className="progress-track-fill" style={{ width: `${progressPct}%` }} />
        </div>

        {STEPS.map((s) => {
          const isCompleted = completedSteps.includes(s.step);
          const isActive = activeStep === s.step;
          const isClickable = isCompleted && !isActive;

          return (
            <div key={s.step} className="progress-step">
              <button
                className={`progress-circle${isCompleted ? " progress-circle--done" : ""}${isActive ? " progress-circle--active" : ""}${isClickable ? " progress-circle--clickable" : ""}`}
                onClick={() => isClickable && router.push(s.path)}
                aria-label={`Step ${s.step}: ${s.label}${isCompleted ? " (completed)" : ""}${isActive ? " (current)" : ""}`}
                aria-current={isActive ? "step" : undefined}
                disabled={!isClickable}
                type="button"
              >
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span className="progress-circle-num">{s.step}</span>
                )}
              </button>

              <span
                className={`progress-label${isCompleted ? " progress-label--done" : ""}${isActive ? " progress-label--active" : ""}`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .progress-bar-wrapper {
          background: #fff;
          border-bottom: 1px solid #DADCDB;
          padding: 16px 24px;
        }
        .progress-bar-inner {
          max-width: 640px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative;
          z-index: 1;
          flex: 1;
        }
        .progress-track {
          position: absolute;
          top: 16px;
          left: 12.5%;
          right: 12.5%;
          height: 2px;
          background: #C2C5C4;
          border-radius: 1px;
          z-index: 0;
          transform: translateY(-50%);
        }
        .progress-track-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--color-success);
          border-radius: 1px;
          transition: width var(--t-base);
        }
        .progress-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #DADCDB;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: default;
          transition: background var(--t-base), border-color var(--t-base), box-shadow var(--t-base);
          position: relative;
          z-index: 1;
        }
        .progress-circle-num {
          font-family: var(--font-rubik), sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #8A8D8C;
        }
        .progress-circle--done {
          background: var(--color-success);
          border-color: var(--color-success);
          color: #fff;
        }
        .progress-circle--done .progress-circle-num {
          color: #fff;
        }
        .progress-circle--active {
          border-color: var(--color-brand-primary);
          box-shadow: 0 0 0 4px rgba(13, 122, 95, 0.15);
          background: var(--color-brand-primary);
        }
        .progress-circle--active .progress-circle-num {
          color: #fff;
          font-weight: 800;
        }
        .progress-circle--clickable {
          cursor: pointer;
        }
        .progress-circle--clickable:hover {
          box-shadow: 0 0 0 4px rgba(13, 122, 95, 0.2);
          transform: translateY(-1px);
        }
        .progress-label {
          font-family: var(--font-rubik), sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: #8A8D8C;
          white-space: nowrap;
          text-align: center;
          max-width: 92px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .progress-label--done {
          color: var(--color-success);
          font-weight: 600;
        }
        .progress-label--active {
          color: var(--color-brand-primary);
          font-weight: 700;
        }

        @media (max-width: 500px) {
          .progress-bar-wrapper {
            padding: 12px 16px;
          }
          .progress-circle {
            width: 28px;
            height: 28px;
          }
          .progress-label {
            font-size: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .progress-circle,
          .progress-track-fill {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
