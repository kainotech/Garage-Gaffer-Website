"use client";

interface YourDetailsValues {
  firstName: string;
  lastName: string;
  email: string;
  optIn: boolean;
}

interface YourDetailsFormProps {
  values: YourDetailsValues;
  onChange: (field: keyof YourDetailsValues, value: string | boolean) => void;
}

export default function YourDetailsForm({ values, onChange }: YourDetailsFormProps) {
  return (
    <div className="ydf-wrap">
      <div className="ydf-grid">
        <div className="form-group">
          <label htmlFor="ydf-first" className="form-label">First name</label>
          <input
            id="ydf-first"
            type="text"
            placeholder="Jane"
            autoComplete="given-name"
            className="form-input"
            value={values.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ydf-last" className="form-label">Last name</label>
          <input
            id="ydf-last"
            type="text"
            placeholder="Smith"
            autoComplete="family-name"
            className="form-input"
            value={values.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ydf-email" className="form-label">Email address</label>
        <input
          id="ydf-email"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          className="form-input"
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
      </div>

      <label className="ydf-checkbox-label">
        <input
          type="checkbox"
          className="ydf-checkbox"
          checked={values.optIn}
          onChange={(e) => onChange("optIn", e.target.checked)}
        />
        <span className="ydf-checkbox-text">
          Opt in to receive MOT reminders and monthly promotions
        </span>
      </label>

      <style jsx>{`
        .ydf-wrap { display: flex; flex-direction: column; gap: 4px; }
        .ydf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
        .ydf-checkbox-label {
          display: flex; align-items: flex-start; gap: 10px; cursor: pointer;
          font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;
          margin-bottom: 4px;
        }
        .ydf-checkbox {
          width: 16px; height: 16px; flex-shrink: 0; margin-top: 1px;
          accent-color: var(--color-brand-primary); cursor: pointer;
        }
        .ydf-checkbox-text { }
        @media (max-width: 500px) {
          .ydf-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
