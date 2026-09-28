"use client";

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-container">
        <div className="about-head reveal">
          <div className="about-breadcrumb">
            <span>Garage Gaffer</span>
            <span className="about-dot" />
            <span className="about-here">About us</span>
          </div>

          <h1 className="about-h1">
            We got <em>tired</em> of how finding a mechanic works.
          </h1>

          <p className="about-sub">
            So we built something that fixes the worst parts of it.
          </p>

          <div className="about-meta">
            <span>Vetted Bristol mechanics</span>
            <span className="about-meta-dot" />
            <span>Fixed, upfront pricing</span>
            <span className="about-meta-dot" />
            <span>No card needed to book</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-hero {
          position: relative;
          background:
            radial-gradient(1200px 500px at 75% -5%, rgba(13,122,95,0.06), transparent 60%),
            radial-gradient(700px 400px at 15% 100%, rgba(49,167,168,0.05), transparent 60%),
            #F8FAF9;
          overflow: hidden;
          padding: 72px 0 88px;
          border-bottom: 1px solid #DADCDB;
        }

        .about-hero::before {
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

        .about-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .about-head {
          text-align: center;
          max-width: 820px;
          margin: 0 auto;
        }

        .about-breadcrumb {
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

        .about-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #595C5B;
          display: inline-block;
          flex-shrink: 0;
        }

        .about-here {
          color: #0D7A5F;
        }

        .about-h1 {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 48px;
          line-height: 1.1;
          letter-spacing: -1.5px;
          font-weight: 800;
          color: #1A1E1D;
          margin: 0 0 20px;
        }

        .about-h1 :global(em) {
          font-style: normal;
          color: #0D7A5F;
          font-family: var(--font-open-sans), sans-serif;
          font-weight: 800;
          background: linear-gradient(180deg, transparent 62%, rgba(13,122,95,0.15) 62%);
          padding: 0 2px;
        }

        .about-sub {
          font-family: var(--font-rubik), sans-serif;
          font-size: 18px;
          line-height: 1.55;
          color: #595C5B;
          max-width: 560px;
          margin: 0 auto 28px;
        }

        .about-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          font-family: var(--font-rubik), sans-serif;
          font-size: 12.5px;
          color: #8A8D8C;
        }

        .about-meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #DADCDB;
          display: inline-block;
          flex-shrink: 0;
        }

        @media (max-width: 820px) {
          .about-hero {
            padding: 56px 0 72px;
          }
          .about-h1 {
            font-size: 34px;
            letter-spacing: -1px;
          }
        }

        @media (max-width: 560px) {
          .about-container {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  );
}
