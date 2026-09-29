import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CTARepeat from "@/components/CTARepeat";
import HowItWorksFAQ from "@/components/how-it-works/HowItWorksFAQ";
import HowItWorksHero from "@/components/how-it-works/HowItWorksHero";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Enter your reg and postcode, see an instant labour price, and book online. Drop your car at a trusted partner garage, no card needed until the job's done.",
  alternates: { canonical: absoluteUrl("/how-it-works") },
};

/* ─── Inline SVG icons ──────────────────────────────────────── */

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────────────── */

const miniSteps = [
  {
    img: "/how-it-works-select-vehicle.png",
    title: "Select your job",
    desc: "Enter your reg or car details, plus your postcode. We'll give you an instant labour price for the job.",
    context: "Your price is worked out from your exact vehicle and the job you pick, there and then. No waiting on a call back, no vague estimate over the phone.",
  },
  {
    img: "/how-it-works-pick-date.png",
    title: "Pick a date and time",
    desc: "Choose a slot that suits you. No card details needed to book.",
    context: "You're not charged anything at this stage. Payment only happens once the work's been carried out.",
  },
  {
    img: "/how-it-works-drop-car.png",
    title: "Drop your car",
    desc: "Bring your car to our partner garage at your chosen time. We'll take it from there and keep you posted.",
    context: "Your car goes to one of our trusted partner garages, not a random workshop. We'll keep you updated and let you know the moment it's ready to collect.",
  },
];

const vetCards = [
  {
    label: "DBS checked",
    desc: "Every mechanic passes a Disclosure and Barring Service check before they can take jobs on the platform.",
    icon: (
      <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm-1.2 14.6-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6Z" />
    ),
  },
  {
    label: "Qualifications verified",
    desc: "We check proof of City & Guilds, IMI, or equivalent qualifications before anyone appears on the platform.",
    icon: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
  },
  {
    label: "Insurance confirmed",
    desc: "Every mechanic holds their own public liability insurance, confirmed before they take a job.",
    icon: (
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 12.5-3.5-3.5 1.4-1.4 2.1 2.1 4.1-4.1 1.4 1.4-5.5 5.5Z" />
    ),
  },
];

// Flip to true to bring the testimonials strip back.
const SHOW_TESTIMONIALS = false;

const reviews = [
  {
    name: "Marcus B.",
    location: "Cotham",
    quote:
      "I had no idea what was actually wrong, just that it needed sorting. Picked the job from the list, saw the price straight away, and had it booked in and dropped off by the next morning. Exactly as easy as it sounded.",
  },
  {
    name: "Claire H.",
    location: "Bedminster",
    quote:
      "The labour price I saw online was exactly what I paid for the work, and I was told about parts before anything went ahead. That's never happened at a garage. I was genuinely shocked.",
  },
  {
    name: "Tom R.",
    location: "Bishopston",
    quote:
      "Booked on a Wednesday evening, dropped the car off Thursday morning, had it back by the afternoon. Couldn't have been simpler.",
  },
];

/* ─── Page ───────────────────────────────────────────────────── */

export default function HowItWorksPage() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <HowItWorksHero />

        {/* ── Section 2: The Three Steps ───────────────────────── */}
        <section className="bg-[#F5F7F6] py-24 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-[640px] mb-12 reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                The process
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px]">
                Three simple steps, start to finish.
              </h2>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {miniSteps.map((step) => (
                <div
                  key={step.title}
                  className="bg-white border border-[#DADCDB] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] reveal"
                >
                  <div className="relative w-full aspect-[3/2] max-w-[160px] mx-auto mb-4">
                    <Image src={step.img} alt="" fill className="object-contain" />
                  </div>
                  <h3 className="font-[family-name:var(--font-open-sans)] text-[17px] font-bold leading-[1.25] mb-1.5 text-center text-[#1A1E1D]">
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-[#595C5B] text-center mb-4 min-h-[68px]">
                    {step.desc}
                  </p>
                  <div className="w-full h-px bg-[#DADCDB] mb-4" />
                  <p className="text-[13px] leading-[1.6] text-[#595C5B] text-center">
                    {step.context}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA beneath steps */}
            <div className="flex flex-col items-center gap-2 reveal">
              <a
                href="/booking"
                className="inline-flex items-center gap-2 px-7 py-[14px] bg-[#0D7A5F] text-white font-[family-name:var(--font-rubik)] font-semibold text-[15px] rounded-xl shadow-[0_2px_8px_rgba(13,122,95,0.25)] hover:bg-[#055240] hover:shadow-[0_6px_18px_rgba(13,122,95,0.3)] hover:-translate-y-px active:translate-y-px transition-all"
              >
                Get your price
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        {/* ── Section 3: How We Check Our Mechanics ────────────── */}
        <section className="bg-[#FBFDFC] border-t border-[#DADCDB] py-24 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-[640px] mb-12 reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                How we check our mechanics
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] mb-3 text-[#1A1E1D]">
                Every mechanic is checked before they take a job.
              </h2>
              <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.7] text-[#595C5B]">
                Not at sign-up. Before their first job on the platform, here&apos;s what that actually involves.
              </p>
            </div>

            {/* Vetting cards — same row-card pattern as the homepage Services section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {vetCards.map((card) => (
                <div
                  key={card.label}
                  className="reveal bg-white border border-[#DADCDB] rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(13,122,95,0.12),0_4px_8px_rgba(0,0,0,0.06)] transition-all duration-200"
                >
                  <div className="w-16 h-16 rounded-full bg-[#0D7A5F] flex items-center justify-center mb-4">
                    <svg viewBox="0 0 24 24" fill="#fff" className="w-7 h-7" aria-hidden="true">
                      {card.icon}
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-open-sans)] text-[16px] font-bold mb-1.5">
                    {card.label}
                  </h3>
                  <p className="text-[13px] text-[#595C5B] leading-[1.5]">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Supporting copy below grid */}
            <p className="font-[family-name:var(--font-rubik)] text-[14px] text-[#595C5B] max-w-[600px] mx-auto text-center reveal">
              We&apos;re not a directory. Anyone can pay to appear in a directory. We check every mechanic individually, and we take responsibility for who&apos;s on the platform.
            </p>
          </div>
        </section>

        {/* ── Section 4: Social Proof Strip (hidden until we have real reviews) ── */}
        {SHOW_TESTIMONIALS && (
        <section className="bg-[#F5F7F6] border-t border-[#DADCDB] py-24 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Section header */}
            <div className="max-w-[560px] mb-10 reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                Real Bristol drivers
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px]">
                It worked for them. It&apos;ll work for you.
              </h2>
            </div>

            {/* Review cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {reviews.map((review) => (
                <article
                  key={review.name}
                  className="bg-white border border-[#DADCDB] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(13,122,95,0.12),0_4px_8px_rgba(0,0,0,0.06)] hover:-translate-y-[3px] transition-all duration-200 reveal"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="#F9C339" className="w-4 h-4" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-[14.5px] leading-[1.7] text-[#595C5B] mb-4">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>

                  {/* Footer: name + location */}
                  <div>
                    <span className="font-[family-name:var(--font-open-sans)] text-[14px] font-bold text-[#1A1E1D] block">
                      {review.name}
                    </span>
                    <span className="text-[12.5px] text-[#8A8D8C]">
                      {review.location}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* CTA beneath reviews */}
            <div className="text-center reveal">
              <a
                href="/booking"
                className="inline-flex items-center gap-2 px-7 py-[14px] bg-[#0D7A5F] text-white font-[family-name:var(--font-rubik)] font-semibold text-[15px] rounded-xl shadow-[0_2px_8px_rgba(13,122,95,0.25)] hover:bg-[#055240] hover:shadow-[0_6px_18px_rgba(13,122,95,0.3)] hover:-translate-y-px active:translate-y-px transition-all"
              >
                Get your price
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
        )}

        {/* ── Section 5: FAQ (client component) ────────────────── */}
        <HowItWorksFAQ />

        {/* ── Section 6: Final CTA — same as homepage ──────────── */}
        <CTARepeat />
      </main>
      <Footer />
    </>
  );
}
