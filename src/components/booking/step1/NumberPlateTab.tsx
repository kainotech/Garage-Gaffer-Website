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
        <div className="npt-input-wrap">
          <svg className="npt-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2" />
            <path d="M9 17h6" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
          </svg>
          <input
            id="npt-reg"
            type="text"
            placeholder="AB12 CDE"
            maxLength={8}
            autoComplete="off"
            className="form-input"
            style={{ paddingLeft: "40px" }}
            value={reg}
            onChange={(e) => onRegChange(e.target.value.toUpperCase())}
            aria-label="Vehicle registration number"
          />
        </div>
        <p className="npt-hint">
          Enter your registration and search for your vehicle. Can&apos;t find it, or don&apos;t
          remember the details? Use the &quot;Use Car Details&quot; tab instead.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="npt-postcode" className="form-label">Postcode</label>
        <div className="npt-input-wrap">
          <svg className="npt-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        .npt-hint {
          font-size: 12px;
          color: var(--color-text-secondary);
          margin-top: 6px;
          margin-bottom: 0;
        }
        .npt-input-wrap {
          position: relative;
        }
        .npt-input-icon {
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
