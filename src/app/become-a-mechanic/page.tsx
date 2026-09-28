import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import MechanicHero from "@/components/mechanics/MechanicHero";
import MechanicFAQ from "@/components/mechanics/MechanicFAQ";
import MechanicApplicationForm from "@/components/mechanics/MechanicApplicationForm";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join as a Mechanic or Garage",
  description:
    "Apply to join Bristol's vetted mechanic and garage network. Steady itemised jobs, keep 100% of your quote, and manage your own schedule. No lead fees.",
  alternates: { canonical: absoluteUrl("/become-a-mechanic") },
};

const benefits = [
  {
    title: "No joining fee",
    desc: "Signing up and getting verified doesn't cost you anything. You only pay once you're live and quoting on jobs.",
    icon: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
  },
  {
    title: "Zero lead fees",
    desc: "We don't charge you to see or bid on jobs. No lead costs, no hidden charges, just a flat monthly fee once you're active.",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  },
  {
    title: "You keep 100%",
    desc: "What you quote is what you get paid. We don't take a percentage cut from your labour or parts.",
    icon: (
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 12.5-3.5-3.5 1.4-1.4 2.1 2.1 4.1-4.1 1.4 1.4-5.5 5.5Z" />
    ),
  },
  {
    title: "Local jobs only",
    desc: "Every job comes from your area. No wasted quotes on drivers you'd never reasonably reach.",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
      />
    ),
  },
  {
    title: "Weekly payouts",
    desc: "No waiting 30 days for your money. Completed jobs are processed and paid into your account every Friday.",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm13 8H4v10h16V10Z"
      />
    ),
  },
];

const onboardingSteps = [
  {
    img: "/become-mechanic-tell-us-about-you.png",
    title: "Tell us about you",
    desc: "Share your experience, qualifications, and the areas you cover. Takes about 10 minutes.",
  },
  {
    img: "/become-mechanic-get-verified.png",
    title: "Get verified",
    desc: "We check your documents, whether that's your qualifications and insurance as a mechanic, or your business registration as a garage.",
  },
  {
    img: "/become-mechanic-start-quoting.png",
    title: "Start quoting",
    desc: "Once you're live, you'll get alerts for jobs that match what you do. Pick the ones you want, skip the ones you don't.",
  },
];

const mechanicRequirements = [
  "Registered as self-employed with HMRC, or trading as a limited company",
  "Right to work in the UK",
  "Public liability insurance (industry standard for client-facing work)",
  "F-Gas certification if you carry out air conditioning work",
  "Waste carrier registration with the Environment Agency if you dispose of oil, tyres or batteries as part of the job",
];

const garageRequirements = [
  "Business registered with HMRC or Companies House",
  "Employers' Liability Insurance (legally required, min. £5m cover) if you employ staff",
  "Waste carrier registration with the Environment Agency",
  "F-Gas certification for any staff carrying out air-con work",
  "Valid DVSA MOT testing station authorisation and qualified testers, if you offer MOT testing",
];

export default function BecomeMechanicPage() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <MechanicHero />

        {/* ── Section 2: Why join us ────────────────────────────── */}
        <section className="bg-white py-24 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-[640px] mb-16 reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                Why join us
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] text-[#1A1E1D]">
                A platform built for mechanics and garages, not just for drivers.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="reveal bg-white border border-[#DADCDB] rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(13,122,95,0.12),0_4px_8px_rgba(0,0,0,0.06)] transition-all duration-200"
                >
                  <div className="w-16 h-16 rounded-full bg-[#0D7A5F] flex items-center justify-center mb-4">
                    <svg viewBox="0 0 24 24" fill="#fff" className="w-7 h-7" aria-hidden="true">
                      {benefit.icon}
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-open-sans)] text-[16px] font-bold mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-[13px] text-[#595C5B] leading-[1.5]">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: Onboarding (image steps, no cards) ────── */}
        <section className="bg-[#F5F7F6] border-t border-b border-[#DADCDB] py-24 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-[640px] mb-12 reveal">
              <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                The onboarding
              </span>
              <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] text-[#1A1E1D] mb-3">
                How to get started on Garage Gaffer.
              </h2>
              <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.7] text-[#595C5B]">
                Three steps to get verified and start receiving job alerts, whether you&apos;re a solo mechanic or run a garage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {onboardingSteps.map((step) => (
                <div key={step.title} className="reveal text-center">
                  <div className="relative w-full aspect-[4/3] mb-5">
                    <Image src={step.img} alt="" fill className="object-contain" />
                  </div>
                  <h3 className="font-[family-name:var(--font-open-sans)] text-[19px] font-bold mb-2 text-[#1A1E1D]">
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.6] text-[#595C5B]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Requirements ─────────────────────────── */}
        <section className="bg-white py-24 md:py-16" id="apply">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="reveal">
                <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                  Requirements
                </span>
                <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] text-[#1A1E1D] mb-6">
                  What you need to get started.
                </h2>
                <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.7] text-[#595C5B] mb-8">
                  We take this seriously. It&apos;s why drivers trust the network and why
                  the businesses on it can command fair prices. The legal minimum
                  differs slightly depending on how you&apos;re set up:
                </p>

                <h3 className="font-[family-name:var(--font-open-sans)] text-[15px] font-bold text-[#0D7A5F] mb-3">
                  If you&apos;re a mechanic
                </h3>
                <ul className="space-y-3 mb-8">
                  {mechanicRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 font-[family-name:var(--font-rubik)] text-[14.5px] text-[#1A1E1D]">
                      <span className="w-5 h-5 rounded-full bg-[#ECF7EF] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D7A5F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>

                <h3 className="font-[family-name:var(--font-open-sans)] text-[15px] font-bold text-[#0D7A5F] mb-3">
                  If you&apos;re a garage
                </h3>
                <ul className="space-y-3">
                  {garageRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 font-[family-name:var(--font-rubik)] text-[14.5px] text-[#1A1E1D]">
                      <span className="w-5 h-5 rounded-full bg-[#ECF7EF] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D7A5F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>

                <div className="w-full h-px bg-[#DADCDB] my-8" />

                <p className="font-[family-name:var(--font-rubik)] text-[13px] leading-[1.6] text-[#8A8D8C]">
                  On top of these legal minimums, we also check proof of qualifications
                  (City &amp; Guilds, IMI or equivalent) and run a DBS check as part of our
                  own vetting, that&apos;s on us to verify, not a legal requirement to operate.
                </p>
              </div>

              <div className="reveal">
                <MechanicApplicationForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 5: FAQ ──────────────────────────────────── */}
        <MechanicFAQ />
      </main>
      <Footer />
    </>
  );
}
