"use client";

import { useEffect, useRef, useState } from "react";

interface CustomSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
  /** "sm" (default) matches the compact quote-widget selects; "md" matches standard form-field height. */
  size?: "sm" | "md";
}

export default function CustomSelect({ id, label, value, onChange, options, placeholder, disabled, size = "sm" }: CustomSelectProps) {
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
          `cs-trigger--${size}`,
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

        .cs-trigger--sm { padding: 0 10px; height: 36px; line-height: 36px; }
        .cs-trigger--sm .cs-trigger-text { font-size: 13px; }

        .cs-trigger--md { padding: 10px 14px; }
        .cs-trigger--md .cs-trigger-text { font-size: 14px; }
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
