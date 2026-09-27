"use client";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function HowItWorksHero() {
  return (
    <section className="hiw-hero">
      <div className="hiw-container">
        <div className="hiw-head reveal">
          <div className="hiw-breadcrumb">
            <span>Garage Gaffer</span>
            <span className="hiw-dot" />
            <span className="hiw-here">How it works</span>
          </div>

          <h1 className="hiw-h1">
            Simple. Fast. <em>No fuss.</em>
          </h1>

          <p className="hiw-sub">
            Tell us what&apos;s wrong with your car and get an instant, upfront
            price. Book online and drop your car at a trusted partner garage.
            No ringing round, no waiting on a callback.
          </p>

          <div className="hiw-cta-wrap">
            <a
              href="/booking"
              className="hiw-btn"
            >
              Get your price
              <ArrowIcon />
            </a>
            <span className="hiw-micro">
              Takes under 2 minutes &middot; No card needed to book
            </span>
          </div>

          <div className="hiw-meta">
            <span>Vetted Bristol mechanics</span>
            <span className="hiw-meta-dot" />
            <span>Instant pricing</span>
            <span className="hiw-meta-dot" />
            <span>Trusted partner garages</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hiw-hero {
          position: relative;
          background:
            radial-gradient(1200px 500px at 75% -5%, rgba(13,122,95,0.06), transparent 60%),
            radial-gradient(700px 400px at 15% 100%, rgba(49,167,168,0.05), transparent 60%),
            #F8FAF9;
          overflow: hidden;
          padding: 72px 0 88px;
          border-bottom: 1px solid #DADCDB;
        }

        .hiw-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(13,122,95,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,122,95,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
          -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          pointer-events: none;
        }

        .hiw-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .hiw-head {
          text-align: center;
          max-width: 820px;
          margin: 0 auto;
        }

        .hiw-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-rubik), sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #595C5B;
          margin-bottom: 22px;
        }

        .hiw-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #595C5B;
          display: inline-block;
          flex-shrink: 0;
        }

        .hiw-here {
          color: #0D7A5F;
        }

        .hiw-h1 {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 48px;
          line-height: 1.1;
          letter-spacing: -1.5px;
          font-weight: 800;
          color: #1A1E1D;
          margin: 0 0 20px;
        }

        .hiw-h1 :global(em) {
          font-style: normal;
          color: #0D7A5F;
          font-family: var(--font-open-sans), sans-serif;
          font-weight: 800;
          background: linear-gradient(180deg, transparent 62%, rgba(13,122,95,0.15) 62%);
          padding: 0 2px;
        }

        .hiw-sub {
          font-family: var(--font-rubik), sans-serif;
          font-size: 18px;
          line-height: 1.55;
          color: #595C5B;
          max-width: 580px;
          margin: 0 auto 32px;
        }

        .hiw-cta-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .hiw-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #0D7A5F;
          color: #FFFFFF;
          font-family: var(--font-rubik), sans-serif;
          font-weight: 600;
          font-size: 15px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(13,122,95,0.35);
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .hiw-btn:hover {
          background: #055240;
          box-shadow: 0 6px 20px rgba(13,122,95,0.4);
          transform: translateY(-1px);
        }

        .hiw-btn:active {
          transform: translateY(1px);
        }

        .hiw-micro {
          font-size: 13px;
          color: #8A8D8C;
        }

        .hiw-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          font-family: var(--font-rubik), sans-serif;
          font-size: 12.5px;
          color: #595C5B;
        }

        .hiw-meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #8A8D8C;
          display: inline-block;
          flex-shrink: 0;
        }

        @media (max-width: 820px) {
          .hiw-hero {
            padding: 56px 0 72px;
          }
          .hiw-h1 {
            font-size: 34px;
            letter-spacing: -1px;
          }
        }

        @media (max-width: 560px) {
          .hiw-container {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  );
}
