import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import HowItWorksFAQ from "@/components/how-it-works/HowItWorksFAQ";
import HowItWorksHero from "@/components/how-it-works/HowItWorksHero";

export const metadata: Metadata = {
  title: "How It Works — Garage Gaffer | Vetted Bristol Mechanics at Your Door",
  description:
    "Tell us what's wrong, get an instant price, and book a vetted Bristol mechanic to come to you. Takes minutes, no card needed to book.",
};

/* ─── Inline SVG icons ──────────────────────────────────────── */

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const CertificateIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[24px] h-[24px]"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────────────── */

const steps = [
  {
    num: "01",
    label: "Tell us about your car",
    body: "Enter your registration (or your car's make and model) and choose the job you need from our list — servicing, brakes, engine work, diagnostics, and more.",
    detail: "Takes under 2 minutes",
  },
  {
    num: "02",
    label: "See your price instantly",
    body: "We calculate your price there and then, built from your exact vehicle and the job you picked. No waiting for a callback, no quote landing in your inbox hours later.",
    detail: "No card needed to see your price",
  },
  {
    num: "03",
    label: "Book. They come to you.",
    body: "Pick a day and time that suits you and confirm your booking. Your mechanic turns up at your home, office, or wherever the car is. You're done.",
    detail: "Same-day slots available",
  },
];

const timelineBeats = [
  {
    label: "Right away",
    body: "Tell us about your car and the job you need. Your price is calculated instantly — no waiting on a callback or a quote landing later.",
  },
  {
    label: "Your call",
    body: "Pick a day and time that suits you and confirm your booking. No card details needed — you're only charged once the work is complete.",
  },
  {
    label: "At the agreed time",
    body: "Your mechanic arrives where you said — home, office, or wherever the car is. They do the work. You get on with your day.",
  },
];

const vetCards = [
  {
    icon: <ShieldIcon />,
    headline: "DBS checked.",
    body: "Every mechanic undergoes a Disclosure and Barring Service check before they can take jobs on the platform. We see the result. If it's not clean, they don't appear.",
  },
  {
    icon: <CertificateIcon />,
    headline: "Qualifications verified.",
    body: "Mechanics must provide proof of their qualifications — City & Guilds, IMI, or equivalent — before appearing on the platform. We don't take their word for it.",
  },
  {
    icon: <DocumentIcon />,
    headline: "Public liability insurance confirmed.",
    body: "Every mechanic on Garage Gaffer holds their own public liability insurance. We confirm this before they take a job. If something goes wrong, it's covered.",
  },
  {
    icon: <CalendarIcon />,
    headline: "12-month workmanship warranty.",
    body: "All work booked through Garage Gaffer carries a 12-month workmanship warranty. If something isn't right with the job itself, it's covered — no arguments, no small print.",
  },
];

const reviews = [
  {
    name: "Marcus B.",
    location: "Cotham",
    quote:
      "I had no idea what was actually wrong, just that it needed sorting. Picked the job from the list, saw the price straight away, and had someone at the door the next morning. Exactly as easy as it sounded.",
  },
  {
    name: "Claire H.",
    location: "Bedminster",
    quote:
      "The price I was quoted online was the price I paid. That's never happened at a garage. I was genuinely shocked.",
  },
  {
    name: "Tom R.",
    location: "Bishopston",
    quote:
      "Booked on a Wednesday evening. Mechanic was there Thursday morning. My car hadn't moved. Couldn't have been simpler.",
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
            <div className="max-w-[560px] mx-auto text-center mb-14 reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                The process
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px]">
                Three steps. No jargon. No drop-offs.
              </h2>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="relative bg-white border border-[#DADCDB] rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.08)] reveal"
                >
                  {/* Connector line (desktop, between steps) */}
                  {i < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-[44px] right-[-24px] w-12 border-t-2 border-dashed border-[#DADCDB] z-10"
                      aria-hidden="true"
                    />
                  )}
                  {/* Step number */}
                  <span className="font-[family-name:var(--font-open-sans)] text-[40px] font-extrabold leading-none text-[#0D7A5F] opacity-20 mb-4 block select-none">
                    {step.num}
                  </span>
                  <h3 className="font-[family-name:var(--font-open-sans)] text-[18px] font-bold leading-[1.25] mb-2.5 text-[#1A1E1D]">
                    {step.label}
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-[#595C5B] mb-4">
                    {step.body}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-[family-name:var(--font-rubik)] text-[#0D7A5F] font-medium">
                    <span className="w-4 h-4 rounded-full bg-[#ECF7EF] flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </span>
                    {step.detail}
                  </span>
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
              <span className="text-[13px] text-[#8A8D8C]">
                Takes 2 minutes — no card needed to see your price
              </span>
            </div>
          </div>
        </section>

        {/* ── Section 3: What Happens After You Post ───────────── */}
        <section className="bg-[#FBFDFC] border-t border-[#DADCDB] py-24 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-[560px] mx-auto text-center mb-14 reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                What happens next
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px]">
                Here&apos;s what happens after you book.
              </h2>
            </div>

            {/* Timeline beats */}
            <div className="max-w-[880px] mx-auto">
              <div className="relative">
                {/* Vertical connector line */}
                <div
                  className="hidden md:block absolute left-[19px] top-6 bottom-6 w-px bg-[#DADCDB]"
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-6">
                  {timelineBeats.map((beat, i) => (
                    <div key={i} className="flex gap-6 items-start reveal">
                      {/* Timeline dot */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-[#0D7A5F] flex items-center justify-center shadow-[0_0_0_4px_rgba(13,122,95,0.08)] z-10">
                        <span className="font-[family-name:var(--font-open-sans)] text-[13px] font-extrabold text-[#0D7A5F]">
                          {i + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="bg-white border border-[#DADCDB] rounded-2xl px-6 py-5 flex-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(13,122,95,0.08),0_2px_4px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] transition-all duration-200">
                        <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.08em] uppercase text-[#0D7A5F] mb-1.5">
                          {beat.label}
                        </span>
                        <p className="text-[15px] leading-[1.65] text-[#595C5B] m-0">
                          {beat.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reassurance microcopy */}
              <p className="text-center text-[14px] text-[#8A8D8C] mt-10 reveal">
                You&apos;re in control throughout. Nothing happens without your
                go-ahead.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 4: How We Check Our Mechanics ────────────── */}
        <section className="bg-[#F5F7F6] border-t border-[#DADCDB] py-24 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                How we check our mechanics
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] mb-3 text-[#1A1E1D]">
                Every mechanic is checked before they take a job.
              </h2>
              <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.7] text-[#595C5B]">
                Not at sign-up — before their first job on the platform. Here&apos;s what that actually involves.
              </p>
            </div>

            {/* 2×2 icon-well grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {vetCards.map((card) => (
                <article
                  key={card.headline}
                  className="bg-white border border-[#DADCDB] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(13,122,95,0.12),0_4px_8px_rgba(0,0,0,0.06)] hover:-translate-y-[3px] transition-all duration-200 reveal"
                >
                  {/* Icon well — 48×48, brand-green */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
                    style={{
                      background: "#ECF7EF",
                      borderColor: "color-mix(in srgb, #0D7A5F 15%, transparent)",
                      color: "#0D7A5F",
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-open-sans)] text-[16px] font-bold leading-[1.3] mb-2 text-[#1A1E1D]">
                    {card.headline}
                  </h3>
                  <p className="font-[family-name:var(--font-rubik)] text-[13.5px] leading-[1.6] text-[#595C5B]">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>

            {/* Supporting copy below grid */}
            <p className="font-[family-name:var(--font-rubik)] text-[14px] text-[#595C5B] max-w-[600px] mx-auto text-center reveal">
              We&apos;re not a directory. Anyone can pay to appear in a directory. We check every mechanic individually, and we take responsibility for who&apos;s on the platform.
            </p>
          </div>
        </section>

        {/* ── Section 5: Social Proof Strip ────────────────────── */}
        <section className="bg-[#FBFDFC] border-t border-[#DADCDB] py-24 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Aggregate rating */}
            <div className="text-center mb-10 reveal">
              <span className="inline-flex items-center gap-2 bg-white border border-[#DADCDB] px-5 py-2.5 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.08)] font-[family-name:var(--font-rubik)] text-[14px] font-semibold text-[#1A1E1D]">
                <span className="text-[#F9C339] text-[15px]">★★★★★</span>
                4.9&#x2605; across all completed Bristol jobs
              </span>
            </div>

            {/* Section header */}
            <div className="max-w-[560px] mx-auto text-center mb-10 reveal">
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

        {/* ── Section 6: FAQ (client component) ────────────────── */}
        <HowItWorksFAQ />

        {/* ── Section 7: Final CTA ──────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0A1412] py-20 md:py-16">
          {/* Green glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute w-[50%] h-[100%] top-0 left-1/2 -translate-x-1/2 bg-[radial-gradient(circle,rgba(13,122,95,0.15)_0%,transparent_65%)]" />
          </div>

          <div className="relative max-w-[1200px] mx-auto px-6 text-center reveal">
            <h2 className="font-[family-name:var(--font-open-sans)] text-[40px] md:text-[30px] font-extrabold leading-[1.1] tracking-[-1px] text-white mb-4">
              Ready when you are.
            </h2>
            <p className="text-white/65 text-[17px] md:text-[15px] leading-[1.65] max-w-[520px] mx-auto mb-8">
              Tell us about your car in under two minutes. See your price
              instantly. Book a vetted Bristol mechanic to come to you.
            </p>

            <div className="flex flex-col items-center gap-3">
              <a
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-[16px] bg-[#0D7A5F] text-white font-[family-name:var(--font-rubik)] font-semibold text-[16px] rounded-xl shadow-[0_2px_8px_rgba(13,122,95,0.35)] hover:bg-[#055240] hover:shadow-[0_8px_24px_rgba(13,122,95,0.45)] hover:-translate-y-px active:translate-y-px transition-all"
              >
                Get your price
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <span className="text-[13px] text-white/40">
                Takes 2 minutes &middot; No card needed to book &middot;
                Same-day slots available
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
