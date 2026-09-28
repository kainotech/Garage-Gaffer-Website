"use client";

interface BookingAddressValues {
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  phone: string;
}

interface BookingAddressFormProps {
  values: BookingAddressValues;
  onChange: (field: keyof BookingAddressValues, value: string) => void;
}

export default function BookingAddressForm({ values, onChange }: BookingAddressFormProps) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="baf-addr1" className="form-label">Street address</label>
        <input
          id="baf-addr1"
          type="text"
          placeholder="123 Main Street"
          autoComplete="address-line1"
          className="form-input"
          value={values.address1}
          onChange={(e) => onChange("address1", e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="baf-addr2" className="form-label">
          Address line 2 <span className="baf-optional">(optional)</span>
        </label>
        <input
          id="baf-addr2"
          type="text"
          placeholder="Flat, suite, unit etc."
          autoComplete="address-line2"
          className="form-input"
          value={values.address2}
          onChange={(e) => onChange("address2", e.target.value)}
        />
      </div>

      <div className="baf-grid">
        <div className="form-group">
          <label htmlFor="baf-city" className="form-label">City</label>
          <input
            id="baf-city"
            type="text"
            placeholder="Bristol"
            autoComplete="address-level2"
            className="form-input"
            value={values.city}
            onChange={(e) => onChange("city", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="baf-postcode" className="form-label">Postcode</label>
          <input
            id="baf-postcode"
            type="text"
            placeholder="BS1 4DJ"
            autoComplete="postal-code"
            className="form-input"
            value={values.postcode}
            onChange={(e) => onChange("postcode", e.target.value.toUpperCase())}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="baf-phone" className="form-label">Phone number</label>
        <div className="baf-phone-group">
          <span className="baf-phone-prefix">
            <svg className="baf-phone-flag" width="20" height="10" viewBox="0 0 60 30" aria-hidden="true">
              <clipPath id="baf-flag-clip">
                <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
              </clipPath>
              <path d="M0,0 v30 h60 v-30 z" fill="#00247d" />
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
              <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#baf-flag-clip)" stroke="#cf142b" strokeWidth="4" />
              <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
              <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6" />
            </svg>
            <span>+44</span>
          </span>
          <input
            id="baf-phone"
            type="tel"
            placeholder="7700 900 000"
            autoComplete="tel"
            className="baf-phone-input"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            required
          />
        </div>
      </div>

      <style jsx>{`
        .baf-optional { font-weight: 400; color: var(--color-text-disabled); }
        .baf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
        @media (max-width: 500px) {
          .baf-grid { grid-template-columns: 1fr; }
        }
        .baf-phone-group {
          display: flex;
          align-items: stretch;
          background: #fff;
          border: 1.5px solid var(--color-divider);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border var(--t-fast), box-shadow var(--t-fast);
        }
        .baf-phone-group:hover { border-color: #b0bab5; }
        .baf-phone-group:focus-within {
          border-color: var(--color-brand-primary);
          box-shadow: 0 0 0 3px rgba(13,122,95,0.12);
        }
        .baf-phone-prefix {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 12px;
          background: var(--color-bg);
          border-right: 1.5px solid var(--color-divider);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .baf-phone-flag { border-radius: 2px; flex-shrink: 0; display: block; }
        .baf-phone-input {
          flex: 1;
          min-width: 0;
          border: none;
          background: transparent;
          padding: 12px 14px;
          font-size: 14px;
          color: var(--color-text-primary);
        }
        .baf-phone-input:focus { outline: none; }
        .baf-phone-input::placeholder { color: var(--color-text-disabled); }
      `}</style>
    </div>
  );
}
