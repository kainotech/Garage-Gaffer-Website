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
    "Garage Gaffer connects Bristol drivers with vetted local mobile mechanics. Honest quotes, transparent vetting, no jargon.",
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
              If your car breaks down or starts making a noise you don&apos;t recognise, the first thing most people do is ask around. Because the alternative, just ringing garages, is a bad experience. You ring. They&apos;re busy. You leave a voicemail. They don&apos;t ring back. Or they do, give you a number off the top of their head with no breakdown, and you have no idea whether it&apos;s fair.
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
              That&apos;s the gap Garage Gaffer is for. Tell us your reg and what you need, and we&apos;ll show you a clear, upfront price straight away, no ringing round, no waiting on a callback. Book the slot that suits you, and a mechanic who&apos;s actually been checked, not just listed, comes to you.
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
