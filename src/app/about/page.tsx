import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AboutHero from "@/components/about/AboutHero";
import { SERVICE_CATEGORIES, TOTAL_SERVICE_COUNT } from "@/data/services";
import { CategoryIcon, accentForIndex } from "@/data/serviceCategoryVisuals";

export const metadata: Metadata = {
  title: "About Us — Garage Gaffer | Bristol's Vetted Mechanic Marketplace",
  description:
    "We're a small Bristol team that got tired of the way finding a mechanic works. Garage Gaffer connects drivers with vetted local mobile mechanics — honest quotes, transparent vetting, no jargon.",
};

/* ─── Section data ───────────────────────────────────────────── */

const postcodes = [
  "BS1", "BS2", "BS3", "BS4", "BS5", "BS6", "BS7", "BS8", "BS9", "BS10",
  "BS11", "BS13", "BS14", "BS15", "BS16", "BS30", "BS31", "BS32", "BS34",
  "BS36", "BS37",
];

/* ─── Page ───────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      {/* Organisation / LocalBusiness structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness"],
            name: "Garage Gaffer",
            url: "https://garagegaffer.co.uk",
            description:
              "Bristol's vetted mobile mechanic marketplace. Post a job, get quotes from checked local mechanics, and book the one that suits you.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bristol",
              addressCountry: "GB",
            },
            areaServed: {
              "@type": "City",
              name: "Bristol",
            },
          }),
        }}
      />

      <ScrollReveal />
      <Nav />
      <main>
        <AboutHero />

        {/* ── Section 2 — The Problem We Saw ───────────────────── */}
        <section className="bg-white py-24 md:py-16">
          <div className="max-w-[720px] mx-auto px-6">
            <div className="reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                Why we built this
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] mb-8 text-[#1A1E1D]">
                Finding a good mechanic in Bristol is harder than it should be.
              </h2>
            </div>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] mb-6 reveal">
              If your car breaks down or starts making a noise you don&apos;t recognise, the first thing most people do is ask around. Because the alternative — just ringing garages — is a bad experience. You ring. They&apos;re busy. You leave a voicemail. They don&apos;t ring back. Or they do, give you a number off the top of their head with no breakdown, and you have no idea whether it&apos;s fair.
            </p>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] mb-8 reveal">
              Mobile mechanics are a better answer for a lot of jobs. They come to you, their overheads are lower, and the good ones are genuinely excellent. But finding a vetted one in Bristol who does your type of repair, is available when you need them, and will give you a straight quote upfront? That&apos;s a lottery. Word-of-mouth if you&apos;re lucky. A directory listing if you&apos;re not.
            </p>

            {/* Pull-quote — inline typographic treatment, no card or border */}
            <p
              className="font-[family-name:var(--font-open-sans)] text-[22px] font-extrabold leading-[1.3] text-[#0D7A5F] max-w-[560px] mx-auto text-center my-10 reveal"
              aria-label="Pull quote"
            >
              &ldquo;A directory listing isn&apos;t a vetting. Anyone can pay to appear on a list.&rdquo;
            </p>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] reveal">
              That&apos;s the gap Garage Gaffer is for. A place where drivers can post a job and hear from mechanics who&apos;ve actually been checked — not just listed. Where the quote is itemised before you commit. Where the person doing the work is accountable, not anonymous.
            </p>
          </div>
        </section>

        {/* ── Section 3 — Where We Operate ─────────────────────── */}
        <section className="bg-[#F5F7F6] border-t border-[#DADCDB] py-24 md:py-16">
          <div className="max-w-[680px] mx-auto px-6">
            <div className="text-center mb-8 reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                Where we operate
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] mb-4 text-[#1A1E1D]">
                Bristol. Properly covered.
              </h2>
              <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B]">
                We operate in Bristol and the areas directly around it. The mechanics on the platform are based here — they&apos;re not driving in from somewhere else to cover a job.
              </p>
            </div>

            {/* Postcode chip cluster — display only, not interactive */}
            <div
              className="flex flex-wrap gap-2 justify-center mb-6 reveal"
              aria-label="Covered Bristol postcodes"
            >
              {postcodes.map((pc) => (
                <span
                  key={pc}
                  className="font-[family-name:var(--font-rubik)] text-[13px] font-semibold text-[#0D7A5F] px-3 py-1.5 rounded-full"
                  style={{
                    background: "#ECF7EF",
                    border: "1px solid rgba(13,122,95,0.2)",
                  }}
                >
                  {pc}
                </span>
              ))}
            </div>

            {/* PLACEHOLDER note — remove before publishing */}
            <p className="font-[family-name:var(--font-rubik)] text-[12px] text-center text-[#8A8D8C] mb-5 italic reveal">
              [PLACEHOLDER — confirm exact coverage postcodes with founder before publishing]
            </p>

            {/* Coverage note */}
            <p className="font-[family-name:var(--font-rubik)] text-[13.5px] leading-[1.6] text-[#595C5B] text-center reveal">
              Not sure if we cover your area? Enter your postcode when you post a job and we&apos;ll show you who&apos;s nearby.
            </p>
          </div>
        </section>

        {/* ── Section 4 — Who's Behind It ──────────────────────── */}
        <section className="bg-white border-t border-[#DADCDB] py-24 md:py-16">
          <div className="max-w-[640px] mx-auto px-6">
            <div className="reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                The people behind it
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] mb-8 text-[#1A1E1D]">
                We&apos;re small. That&apos;s the point.
              </h2>
            </div>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] mb-6 reveal">
              Garage Gaffer was started in 2024 by{" "}
              <span className="text-[#1A1E1D] font-medium">[FOUNDER NAME — PLACEHOLDER]</span>
              {" "}and{" "}
              <span className="text-[#1A1E1D] font-medium">[CO-FOUNDER NAME — PLACEHOLDER]</span>
              , both based in Bristol. The short version: one of them had a car problem, couldn&apos;t find a mechanic they trusted, and spent two days ringing garages that didn&apos;t call back. The platform came from that.
            </p>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] mb-6 reveal">
              We&apos;re not a large company trying to enter Bristol. We&apos;re based here. We use this platform ourselves when something goes wrong with our cars. That&apos;s not a marketing line — it&apos;s just true, and it shapes how we&apos;ve built it.
            </p>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] reveal">
              The team is small, which means decisions get made quickly and we&apos;re reachable. If something on the platform doesn&apos;t work the way it should, we want to know. The contact details are at the bottom of every page.
            </p>
          </div>
        </section>

        {/* ── Section 5 — Our Services ──────────────────────────── */}
        <section className="bg-[#FBFDFC] border-t border-b border-[#DADCDB] py-24 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">

            {/* Section header */}
            <div className="max-w-[640px] mb-12 reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                Our services
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] mb-3 text-[#1A1E1D]">
                Ready to get sorted?
              </h2>
              <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.7] text-[#595C5B]">
                {TOTAL_SERVICE_COUNT} services, all at your door, all carried out by vetted Bristol mechanics.
              </p>
            </div>

            <Link
              href="/services"
              className="group block relative overflow-hidden bg-white border border-[#DADCDB] rounded-2xl p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(13,122,95,0.12),0_4px_8px_rgba(0,0,0,0.06)] transition-all duration-200 reveal"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-2xl bg-[#0D7A5F]" />

              <div className="flex flex-wrap gap-2.5 mb-7">
                {SERVICE_CATEGORIES.map((category, i) => {
                  const colors = accentForIndex(i);
                  return (
                    <span
                      key={category.slug}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-[family-name:var(--font-rubik)] text-[12.5px] font-semibold"
                      style={{
                        background: colors.well,
                        borderColor: `color-mix(in srgb, ${colors.accent} 15%, transparent)`,
                        color: colors.accent,
                      }}
                    >
                      <CategoryIcon slug={category.slug} className="w-3.5 h-3.5" />
                      {category.name}
                    </span>
                  );
                })}
              </div>

              <div className="flex items-end justify-between gap-6 flex-wrap">
                <div>
                  <h3 className="font-[family-name:var(--font-open-sans)] text-[22px] font-bold mb-1.5">
                    Browse the full catalogue
                  </h3>
                  <p className="text-[#595C5B] text-[14.5px] leading-[1.6]">
                    Every service we offer, with what&apos;s included — quoted for your exact vehicle.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 flex-shrink-0 font-[family-name:var(--font-rubik)] font-semibold text-[13px] uppercase tracking-[0.06em] text-[#0D7A5F] group-hover:text-[#055240] transition-colors">
                  See all services
                  <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
                </span>
              </div>
            </Link>

          </div>
        </section>

      </main>

      {/* ── Section 9 — Footer ───────────────────────────────── */}
      <Footer />
    </>
  );
}
