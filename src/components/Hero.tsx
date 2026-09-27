"use client";

import Image from "next/image";
import QuoteWidget from "./QuoteWidget";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-head reveal">
          <h1 className="hero-h1">
            A trusted <em>local garage</em>, without the hassle.
          </h1>
          <p className="hero-sub">
            Garage Gaffer matches you with a trusted, fully vetted Bristol garage. No guesswork, no surprise bills — just honest work, done right first time.
          </p>

          <div className="hero-form">
            <QuoteWidget layout="inline" />
          </div>

          <a href="/booking/step-1?tab=details" className="hero-secondary">
            I don&apos;t remember my registration number
          </a>
        </div>

        <div className="hero-visual reveal" aria-hidden="true">
          <Image
            src="/mechanic-hero.png"
            alt=""
            width={1536}
            height={1024}
            className="hero-visual-img"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          background:
            radial-gradient(1200px 500px at 75% -5%, rgba(13,122,95,0.06), transparent 60%),
            radial-gradient(700px 400px at 15% 100%, rgba(49,167,168,0.05), transparent 60%),
            #F8FAF9;
          overflow: hidden;
          padding: 80px 0 64px;
          border-bottom: 1px solid #DADCDB;
        }

        .hero::before {
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

        .hero-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          gap: 32px;
        }

        .hero-head {
          max-width: 620px;
        }

        .hero-h1 {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 55px;
          line-height: 1.1;
          letter-spacing: -1.4px;
          font-weight: 800;
          color: #1A1E1D;
          margin: 0 0 20px;
        }

        .hero-h1 :global(em) {
          font-style: normal;
          color: #0D7A5F;
          font-family: var(--font-open-sans), sans-serif;
          font-weight: 800;
          background: linear-gradient(180deg, transparent 62%, rgba(13,122,95,0.15) 62%);
          padding: 0 2px;
        }

        .hero-sub {
          font-family: var(--font-rubik), sans-serif;
          font-size: 17px;
          line-height: 1.55;
          color: #595C5B;
          max-width: 520px;
          margin: 0 0 32px;
        }

        .hero-form {
          margin-bottom: 20px;
        }

        .hero-secondary {
          display: inline-block;
          font-family: var(--font-rubik), sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #0D7A5F;
          border-bottom: 1.5px solid rgba(13,122,95,0.4);
          padding-bottom: 1px;
          text-decoration: none;
          transition: opacity 0.15s ease;
        }

        .hero-secondary:hover {
          opacity: 0.7;
        }

        .hero-visual {
          position: relative;
          max-width: 620px;
          margin: 0 auto;
        }

        .hero-visual-img {
          width: 100%;
          height: auto;
          display: block;
        }

        @media (min-width: 960px) {
          .hero-container {
            max-width: none;
            width: 100%;
            margin: 0;
            /* Keep the text's left edge exactly where a 1200px centered
               container would put it, but claw back the right-hand gutter
               for the image instead of mirroring it symmetrically. */
            padding-left: max(32px, calc((100vw - 1200px) / 2 + 32px));
            padding-right: 24px;
            grid-template-columns: 520px 1fr;
            gap: 20px;
          }
          .hero-head {
            max-width: none;
          }
          .hero-visual {
            max-width: 900px;
            margin: 0 0 0 auto;
          }
        }

        @media (max-width: 820px) {
          .hero {
            padding: 56px 0 48px;
          }
          .hero-h1 {
            font-size: 36px;
            letter-spacing: -1px;
          }
          .hero-sub {
            font-size: 16px;
          }
          .hero-visual {
            margin-top: 12px;
          }
        }

        @media (max-width: 560px) {
          .hero-container {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  );
}
