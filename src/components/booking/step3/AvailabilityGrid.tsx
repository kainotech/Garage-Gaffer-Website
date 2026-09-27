"use client";

import { useState } from "react";
import CustomSelect from "@/components/booking/CustomSelect";
import { formatSlotLabel } from "./slotLabel";

export { formatSlotLabel };

// 30-minute slots, 8:00 AM – 6:00 PM
const TIME_SLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let mins = 8 * 60; mins < 18 * 60; mins += 30) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
})();

// Format: "YYYY-MM-DD_HH:MM"
function dateSlotKey(date: Date, slot: string): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}_${slot}`;
}

function parseSlotKeyDate(key: string): Date | null {
  const [datePart] = key.split("_");
  return datePart ? new Date(`${datePart}T00:00:00`) : null;
}

function getWeekDays(startOffset: number): Date[] {
  const days: Date[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  base.setDate(base.getDate() + startOffset);
  // Show 5 weekdays
  let count = 0;
  const d = new Date(base);
  while (count < 5) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) {
      days.push(new Date(d));
      count++;
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDay(date: Date): { short: string; num: string } {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return { short: days[date.getDay()], num: String(date.getDate()) };
}

/** Month labels from the current month through December of next year, e.g. "September 2026". */
function getMonthOptions(): string[] {
  const now = new Date();
  const end = new Date(now.getFullYear() + 1, 11, 1);
  const opts: string[] = [];
  const cur = new Date(now.getFullYear(), now.getMonth(), 1);
  while (cur <= end) {
    opts.push(cur.toLocaleDateString("en-GB", { month: "long", year: "numeric" }));
    cur.setMonth(cur.getMonth() + 1);
  }
  return opts;
}

/** Day-count from today that lands the visible week on the given month (tomorrow if it's the current month). */
function offsetForMonthStart(year: number, month: number): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let target = new Date(year, month, 1);
  if (target.getTime() <= today.getTime()) {
    target = new Date(today);
    target.setDate(target.getDate() + 1);
  }
  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

interface AvailabilityGridProps {
  /** dateSlotKey of the single chosen slot, or null if none chosen yet */
  selected: string | null;
  onSelect: (key: string | null) => void;
}

export default function AvailabilityGrid({ selected, onSelect }: AvailabilityGridProps) {
  const [weekOffset, setWeekOffset] = useState(1); // start from tomorrow
  const [selectedDay, setSelectedDay] = useState<Date | null>(() => parseSlotKeyDate(selected ?? ""));
  const days = getWeekDays(weekOffset);
  const monthOptions = getMonthOptions();
  const monthValue = days[0]
    ? days[0].toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    : monthOptions[0];

  function prevWeek() {
    setWeekOffset((o) => Math.max(1, o - 5));
  }
  function nextWeek() {
    setWeekOffset((o) => o + 5);
  }
  function handleMonthChange(label: string) {
    const picked = new Date(label);
    setWeekOffset(offsetForMonthStart(picked.getFullYear(), picked.getMonth()));
  }

  function handlePickDay(day: Date) {
    setSelectedDay(day);
    const prevSelectedDay = selected ? parseSlotKeyDate(selected) : null;
    if (!prevSelectedDay || !isSameDay(prevSelectedDay, day)) {
      onSelect(null); // switching day clears a time chosen for a different day
    }
  }

  function handlePickSlot(slot: string) {
    if (!selectedDay) return;
    const key = dateSlotKey(selectedDay, slot);
    onSelect(selected === key ? null : key);
  }

  return (
    <div className="ag-wrap">
      <div className="ag-info">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>Pick a date and time.</span>
      </div>

      {/* Month select + week navigation */}
      <div className="ag-nav">
        <div className="ag-month-select-wrap">
          <CustomSelect
            id="ag-month"
            label="Month"
            value={monthValue}
            placeholder="Select month"
            options={monthOptions}
            onChange={handleMonthChange}
          />
        </div>
        <div className="ag-nav-arrows">
          <button className="ag-nav-btn" onClick={prevWeek} disabled={weekOffset <= 1} type="button" aria-label="Previous week">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="ag-nav-btn" onClick={nextWeek} type="button" aria-label="Next week">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Day picker */}
      <div className="ag-days">
        {days.map((day, di) => {
          const info = formatDay(day);
          const isSelected = !!selectedDay && isSameDay(selectedDay, day);
          return (
            <button
              key={di}
              className={`ag-day${isSelected ? " ag-day--selected" : ""}`}
              onClick={() => handlePickDay(day)}
              type="button"
              aria-pressed={isSelected}
            >
              <span className="ag-day-name">{info.short}</span>
              <span className="ag-day-num">{info.num}</span>
            </button>
          );
        })}
      </div>

      {/* Time slots for the chosen day */}
      {selectedDay ? (
        <div className="ag-slots-section">
          <p className="ag-slots-heading">
            Available times — {selectedDay.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
          </p>
          <div className="ag-slots-grid">
            {TIME_SLOTS.map((slot) => {
              const key = dateSlotKey(selectedDay, slot);
              const isSelected = selected === key;
              return (
                <button
                  key={slot}
                  className={`ag-slot-pill${isSelected ? " ag-slot-pill--selected" : ""}`}
                  onClick={() => handlePickSlot(slot)}
                  type="button"
                  aria-pressed={isSelected}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="ag-slots-empty">Select a date above to see available times.</p>
      )}

      <p className="ag-counter">
        {selected ? (
          <>Selected: <strong>{formatSlotLabel(selected)}</strong></>
        ) : (
          "No slot selected yet"
        )}
      </p>

      <style jsx>{`
        .ag-wrap { display: flex; flex-direction: column; gap: 16px; }
        .ag-info {
          display: flex; align-items: flex-start; gap: 8px;
          background: #E6F3FA; border-radius: var(--radius-md); padding: 12px 14px;
          font-size: 13px; color: var(--color-text-secondary); line-height: 1.5;
        }
        .ag-info svg { color: var(--color-accent-blue); flex-shrink: 0; margin-top: 1px; }
        .ag-nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .ag-month-select-wrap { width: 172px; flex-shrink: 0; }
        .ag-nav-arrows { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .ag-nav-btn {
          width: 32px; height: 32px; border-radius: var(--radius-md);
          background: var(--color-bg); border: 1px solid var(--color-divider);
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          color: var(--color-text-primary); transition: background var(--t-fast);
        }
        .ag-nav-btn:hover:not(:disabled) { background: var(--color-brand-mint); color: var(--color-brand-primary); }
        .ag-nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .ag-days {
          display: flex; gap: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch;
          padding-bottom: 2px;
        }
        .ag-day {
          flex: 1 0 64px; min-width: 64px;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          padding: 12px 8px; border-radius: var(--radius-lg);
          background: #fff; border: 1.5px solid var(--color-divider); cursor: pointer;
          transition: border-color var(--t-fast), background var(--t-fast);
        }
        .ag-day:hover { border-color: var(--color-brand-primary); background: var(--color-brand-mint); }
        .ag-day--selected {
          background: var(--color-brand-primary); border-color: var(--color-brand-primary);
        }
        .ag-day-name { font-size: 11px; font-weight: 600; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }
        .ag-day-num { font-size: 17px; font-weight: 800; color: var(--color-text-primary); }
        .ag-day--selected .ag-day-name, .ag-day--selected .ag-day-num { color: #fff; }

        .ag-slots-section { display: flex; flex-direction: column; gap: 10px; }
        .ag-slots-heading { font-size: 13px; font-weight: 700; color: var(--color-text-primary); margin: 0; }
        .ag-slots-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 8px;
        }
        .ag-slots-empty { font-size: 13px; color: var(--color-text-disabled); margin: 0; }
        .ag-slot-pill {
          padding: 10px 6px; border-radius: var(--radius-md);
          background: #fff; border: 1.5px solid var(--color-divider); cursor: pointer;
          font-size: 13px; font-weight: 600; color: var(--color-text-primary);
          transition: border-color var(--t-fast), background var(--t-fast), color var(--t-fast);
        }
        .ag-slot-pill:hover { border-color: var(--color-brand-primary); background: var(--color-brand-mint); }
        .ag-slot-pill--selected {
          background: var(--color-brand-primary); border-color: var(--color-brand-primary); color: #fff;
        }

        .ag-counter { font-size: 14px; color: var(--color-text-secondary); margin: 0; }

        @media (prefers-reduced-motion: reduce) {
          .ag-nav-btn, .ag-day, .ag-slot-pill { transition: none; }
        }
      `}</style>
    </div>
  );
}
