import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AboutHero from "@/components/about/AboutHero";
import Coverage from "@/components/Coverage";
import Services from "@/components/Services";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Garage Gaffer connects Bristol drivers with vetted local garages and mechanics. Honest pricing, transparent vetting, no jargon.",
  alternates: { canonical: absoluteUrl("/about") },
};

/* ─── Page ───────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      {/* Organisation / LocalBusiness structured data */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["Organization", "LocalBusiness"],
          name: "Garage Gaffer",
          url: SITE_URL,
          description:
            "Your trusted mechanic partner in Bristol. Tell us what your car needs and we'll match you with a vetted local garage.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bristol",
            addressCountry: "GB",
          },
          areaServed: {
            "@type": "City",
            name: "Bristol",
          },
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
                Finding a garage you can trust shouldn&apos;t feel like a gamble.
              </h2>
            </div>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] mb-6 reveal">
              Ask around in Bristol and most people have a story. The quote that grew once the car was on the ramp. The extra work nobody asked for. The garage that never rang back.
            </p>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] mb-8 reveal">
              It isn&apos;t just a Bristol thing. In a March 2026 survey of 2,000 UK drivers, 52% said they either suspect, or can&apos;t tell, whether they&apos;ve been overcharged on a repair in the past five years. When the same routine fault was taken to ten different workshops, the quotes varied by hundreds of pounds.
            </p>

            {/* Pull-quote — inline typographic treatment, no card or border */}
            <p
              className="font-[family-name:var(--font-open-sans)] text-[22px] font-extrabold leading-[1.3] text-[#0D7A5F] max-w-[560px] mx-auto text-center my-10 reveal"
              aria-label="Pull quote"
            >
              &ldquo;A directory listing isn&apos;t a vetting. Anyone can pay to appear on a list.&rdquo;
            </p>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] reveal">
              So we built Garage Gaffer around what goes wrong. You see the labour price before you book. If your job needs spare parts, we&apos;ll send a separate quotation within one working day, and nothing extra goes ahead without your say-so. And your car goes to a garage we&apos;ve checked ourselves, not one that just paid to be listed.
            </p>
          </div>
        </section>

        {/* ── Section 3 — Where We Operate ─────────────────────── */}
        <Coverage />

        {/* ── Section 4 — Who's Behind It ──────────────────────── */}
        <section className="bg-white border-t border-[#DADCDB] py-24 md:py-16">
          <div className="max-w-[640px] mx-auto px-6">
            <div className="reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                The people behind it
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] mb-8 text-[#1A1E1D]">
                Built by people who use it themselves.
              </h2>
            </div>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] mb-6 reveal">
              Garage Gaffer started with a familiar problem: a car that needed work, and no easy way to find a mechanic we could trust without a day spent ringing round and waiting on callbacks. So we built the platform we wished existed.
            </p>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] mb-6 reveal">
              We&apos;re based in Bristol, and we use Garage Gaffer ourselves when something goes wrong with our own cars. That&apos;s not a marketing line, it shapes how we&apos;ve built it.
            </p>

            <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.75] text-[#595C5B] reveal">
              If something on the platform doesn&apos;t work the way it should, we want to know. The contact details are at the bottom of every page.
            </p>
          </div>
        </section>

        {/* ── Section 5 — Our Services ──────────────────────────── */}
        <Services />

      </main>

      {/* ── Section 9 — Footer ───────────────────────────────── */}
      <Footer />
    </>
  );
}
