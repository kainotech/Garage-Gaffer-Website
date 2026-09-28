"use client";

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function MechanicHero() {
  return (
    <section className="mech-hero">
      <div className="mech-container">
        <div className="mech-head reveal">
          <div className="mech-breadcrumb">
            <span>Garage Gaffer</span>
            <span className="mech-dot" />
            <span className="mech-here">For mechanics &amp; garages</span>
          </div>

          <h1 className="mech-h1">
            Grow your business in <em>Bristol</em>.
          </h1>

          <p className="mech-sub">
            Get a steady stream of itemised jobs sent your way, whether you&apos;re
            an independent mechanic or run a garage. No lead fees, and you keep
            100% of what you quote.
          </p>

          <div className="mech-cta-wrap">
            <a
              href="#apply"
              className="mech-btn"
            >
              Apply to join
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mech-hero {
          position: relative;
          background:
            radial-gradient(1200px 500px at 75% -5%, rgba(13,122,95,0.06), transparent 60%),
            radial-gradient(700px 400px at 15% 100%, rgba(49,167,168,0.05), transparent 60%),
            #F8FAF9;
          overflow: hidden;
          padding: 72px 0 88px;
          border-bottom: 1px solid #DADCDB;
        }

        .mech-hero::before {
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

        .mech-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .mech-head {
          text-align: center;
          max-width: 820px;
          margin: 0 auto;
        }

        .mech-breadcrumb {
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

        .mech-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #595C5B;
          display: inline-block;
          flex-shrink: 0;
        }

        .mech-here {
          color: #0D7A5F;
        }

        .mech-h1 {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 52px;
          line-height: 1.05;
          letter-spacing: -1.8px;
          font-weight: 800;
          color: #1A1E1D;
          margin: 0 0 20px;
        }

        .mech-h1 :global(em) {
          font-style: normal;
          color: #0D7A5F;
          font-family: var(--font-open-sans), sans-serif;
          font-weight: 800;
          background: linear-gradient(180deg, transparent 62%, rgba(13,122,95,0.15) 62%);
          padding: 0 2px;
        }

        .mech-sub {
          font-family: var(--font-rubik), sans-serif;
          font-size: 19px;
          line-height: 1.55;
          color: #595C5B;
          max-width: 620px;
          margin: 0 auto 36px;
        }

        .mech-cta-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .mech-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: #0D7A5F;
          color: #FFFFFF;
          font-family: var(--font-rubik), sans-serif;
          font-weight: 600;
          font-size: 16px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(13,122,95,0.3);
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .mech-btn:hover {
          background: #055240;
          box-shadow: 0 8px 24px rgba(13,122,95,0.4);
          transform: translateY(-1px);
        }

        @media (max-width: 820px) {
          .mech-hero {
            padding: 56px 0 72px;
          }
          .mech-h1 {
            font-size: 38px;
            letter-spacing: -1.2px;
          }
          .mech-sub {
            font-size: 17px;
          }
        }

        @media (max-width: 560px) {
          .mech-container {
            padding: 0 24px;
          }
        }
      `}</style>
    </section>
  );
}
