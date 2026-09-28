"use client";

import React from "react";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

interface ServiceHeroProps {
  current: string;
  title: React.ReactNode;
  subtitle: string;
}

export default function ServiceHero({ current, title, subtitle }: ServiceHeroProps) {
  return (
    <section className="sh-hero">
      <div className="sh-container">
        <div className="sh-head reveal">
          <div className="sh-breadcrumb">
            <span>Garage Gaffer</span>
            <span className="sh-dot" />
            <span className="sh-here">{current}</span>
          </div>

          <h1 className="sh-h1">{title}</h1>

          <p className="sh-sub">{subtitle}</p>

          <div className="sh-cta-wrap">
            <a href="/booking" className="sh-btn">
              Get your price
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sh-hero {
          position: relative;
          background:
            radial-gradient(1200px 500px at 80% -10%, rgba(13,122,95,0.07), transparent 60%),
            radial-gradient(800px 400px at 10% 100%, rgba(49,167,168,0.06), transparent 60%),
            #F8FAF9;
          overflow: hidden;
          padding: 56px 0 48px;
        }
        .sh-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(13,122,95,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,122,95,0.035) 1px, transparent 1px);
          background-size: 32px 32px;
          -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          pointer-events: none;
        }

        .sh-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .sh-head {
          position: relative;
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }
        .sh-breadcrumb {
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
        .sh-breadcrumb .sh-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #595C5B;
        }
        .sh-breadcrumb .sh-here {
          color: #0D7A5F;
        }
        .sh-h1 {
          font-family: var(--font-open-sans), sans-serif;
          font-size: 48px;
          line-height: 1.1;
          letter-spacing: -1.5px;
          font-weight: 800;
          margin: 0 0 20px;
          color: #1A1E1D;
        }
        .sh-h1 :global(em) {
          font-style: normal;
          color: #0D7A5F;
          font-family: var(--font-open-sans), sans-serif;
          font-weight: 800;
          background: linear-gradient(180deg, transparent 62%, rgba(13,122,95,0.15) 62%);
          padding: 0 2px;
        }
        .sh-sub {
          font-family: var(--font-rubik), sans-serif;
          font-size: 18px;
          line-height: 1.55;
          color: #595C5B;
          max-width: 580px;
          margin: 0 auto 32px;
        }

        .sh-cta-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .sh-btn {
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
        .sh-btn:hover {
          background: #055240;
          box-shadow: 0 6px 20px rgba(13,122,95,0.4);
          transform: translateY(-1px);
        }
        .sh-btn:active {
          transform: translateY(1px);
        }

        @media (max-width: 820px) {
          .sh-hero {
            padding: 40px 0 36px;
          }
          .sh-h1 {
            font-size: 34px;
            letter-spacing: -1px;
          }
          .sh-sub {
            font-size: 16px;
          }
        }

        @media (max-width: 560px) {
          .sh-container {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  );
}
