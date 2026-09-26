"use client";

interface NumberPlateTabProps {
  reg: string;
  postcode: string;
  onRegChange: (val: string) => void;
  onPostcodeChange: (val: string) => void;
}

export default function NumberPlateTab({
  reg,
  postcode,
  onRegChange,
  onPostcodeChange,
}: NumberPlateTabProps) {
  return (
    <div className="npt-wrap">
      <div className="form-group">
        <label htmlFor="npt-reg" className="form-label">Number plate</label>
        <div className="npt-plate-wrap">
          <span className="npt-plate-gb">
            <span className="npt-plate-stars">★ ★ ★</span>
            <span className="npt-plate-gb-text">GB</span>
          </span>
          <input
            id="npt-reg"
            type="text"
            placeholder="AB12 CDE"
            maxLength={8}
            autoComplete="off"
            className="npt-plate-input"
            value={reg}
            onChange={(e) => onRegChange(e.target.value.toUpperCase())}
            aria-label="Vehicle registration number"
          />
        </div>
        <p className="npt-hint">
          Enter your registration and we&apos;ll look up your vehicle details. Booking for an
          HGV, bus or coach? Use &quot;Use Car Details&quot; instead — registration lookup only
          covers cars, motorcycles and vans.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="npt-postcode" className="form-label">Postcode</label>
        <div className="npt-postcode-wrap">
          <svg className="npt-postcode-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            id="npt-postcode"
            type="text"
            placeholder="e.g. BS1 4DJ"
            autoComplete="postal-code"
            className="form-input"
            style={{ paddingLeft: "40px" }}
            value={postcode}
            onChange={(e) => onPostcodeChange(e.target.value.toUpperCase())}
          />
        </div>
      </div>

      <style jsx>{`
        .npt-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .npt-plate-wrap {
          display: flex;
          align-items: center;
          background: #FFD02A;
          border: 1.5px solid #CFA100;
          border-radius: 8px;
          overflow: hidden;
          height: 48px;
        }
        .npt-plate-gb {
          background: #06417A;
          color: #FFD02A;
          width: 36px;
          height: 100%;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: 4px 0;
        }
        .npt-plate-stars {
          font-size: 6px;
          letter-spacing: 1px;
        }
        .npt-plate-gb-text {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 10px;
          font-weight: 800;
        }
        .npt-plate-input {
          flex: 1;
          background: transparent;
          border: 0;
          outline: none;
          padding: 0 14px;
          font-family: var(--font-open-sans), sans-serif;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #1A1E1D;
          width: 100%;
        }
        .npt-plate-input::placeholder {
          color: rgba(26, 30, 29, 0.4);
          letter-spacing: 2px;
          font-size: 18px;
        }
        .npt-hint {
          font-size: 12px;
          color: var(--color-text-secondary);
          margin-top: 6px;
          margin-bottom: 0;
        }
        .npt-postcode-wrap {
          position: relative;
        }
        .npt-postcode-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #8A8D8C;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
