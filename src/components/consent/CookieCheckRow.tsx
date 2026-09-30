"use client";

export default function CookieCheckRow({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-divider)] bg-[var(--color-surface-2)] p-3 ${
        disabled ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border-[1.5px] border-[var(--color-text-disabled)] bg-white transition-colors
          peer-checked:border-[var(--color-brand-primary)] peer-checked:bg-[var(--color-brand-primary)]
          peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-brand-primary)]
          peer-disabled:opacity-60
          [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100`}
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-[14px] font-semibold text-[var(--color-text-primary)]">{label}</span>
          {disabled && (
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-brand-primary)]">
              Always on
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[13px] leading-[1.5] text-[var(--color-text-secondary)]">{description}</span>
      </span>
    </label>
  );
}
