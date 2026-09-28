"use client";

export default function SupportHero() {
  return (
    <section className="suph-hero">
      <div className="suph-container">
        {/* Centred content block */}
        <div className="suph-head reveal">
          {/* Breadcrumb — mirrors .sh-breadcrumb from ServiceHero */}
          <div className="suph-breadcrumb">
            <span>Garage Gaffer</span>
            <span className="suph-dot" />
            <span className="suph-here">Help centre</span>
          </div>

          {/* H1 with <em> highlight — mirrors .sh-h1 em from ServiceHero */}
          <h1 className="suph-h1">
            How can we <em>help</em>?
          </h1>

          {/* Subheadline */}
          <p className="suph-sub">
            Send us a message and we&apos;ll get back to you — usually within one working day.
          </p>
        </div>
      </div>

      <style jsx>{`
        /* ── Section shell ── */
        .suph-hero {
          position: relative;
          background:
            radial-gradient(1200px 500px at 75% -5%, rgba(13,122,95,0.06), transparent 60%),
            radial-gradient(700px 400px at 15% 100%, rgba(49,167,168,0.05), transparent 60%),
            #F8FAF9;
          overflow: hidden;
          padding: 56px 0 40px;
        }

        /* Dotted grid mask — same as ServiceHero ::before */
        .suph-hero::before {
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

        /* ── Layout container ── */
        .suph-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ── Centred content block ── */
        .suph-head {
          text-align: center;
          max-width: 760px;
          margin: 0 auto;
        }

        /* ── Breadcrumb ── */
        .suph-breadcrumb {
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
        .suph-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #595C5B;
          display: inline-block;
          flex-shrink: 0;
        }
        .suph-here {
          color: #0D7A5F;
        }

        /* ── H1 ── */
        .suph-h1 {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 60px;
          line-height: 1.02;
          letter-spacing: -1.8px;
          font-weight: 800;
          color: #1A1E1D;
          margin: 0 0 16px;
        }
        /* <em> highlight — identical to .sh-h1 em in ServiceHero */
        .suph-h1 :global(em) {
          font-style: normal;
          color: #0D7A5F;
          font-family: var(--font-open-sans), sans-serif;
          font-weight: 800;
          background: linear-gradient(180deg, transparent 62%, rgba(13,122,95,0.15) 62%);
          padding: 0 2px;
        }

        /* ── Subheadline ── */
        .suph-sub {
          font-family: var(--font-rubik), sans-serif;
          font-size: 16px;
          line-height: 1.55;
          color: #595C5B;
          max-width: 560px;
          margin: 0 auto;
        }

        /* ── Responsive ── */
        @media (max-width: 820px) {
          .suph-hero {
            padding: 48px 0 64px;
          }
          .suph-h1 {
            font-size: 40px;
            letter-spacing: -1.2px;
          }
        }
        @media (max-width: 560px) {
          .suph-container {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  );
}
