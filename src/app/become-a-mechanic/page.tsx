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
    "Apply to join Bristol's vetted mechanic and garage network. Steady local jobs, manage your own schedule, and no joining fee.",
  alternates: { canonical: absoluteUrl("/become-a-mechanic") },
};

const benefits = [
  {
    title: "No joining fee",
    desc: "Signing up and getting verified doesn't cost you anything.",
    icon: (
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
    ),
  },
  {
    title: "Jobs near you",
    desc: "We match jobs to the area you cover, so the work is close to you.",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
      />
    ),
  },
  {
    title: "Steady work sent to you",
    desc: "We take the bookings and send them your way, so you spend less time chasing leads.",
    icon: (
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    ),
  },
  {
    title: "Labour price agreed upfront",
    desc: "Customers see the labour price before they book, so there's no haggling. Extra work or parts are agreed with them first.",
    icon: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    ),
  },
  {
    title: "You stay independent",
    desc: "Take work from anywhere else too. No exclusivity, and you run things your own way.",
    icon: (
      <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zM5 19v-6.03c.08.01.15.03.23.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15-.02.23-.03V19H5z" />
    ),
  },
];

const onboardingSteps = [
  {
    img: "/become-mechanic-tell-us-about-you.png",
    title: "Tell us about you",
    desc: "Tell us whether you're a mechanic or a garage and how to reach you. It only takes a couple of minutes.",
  },
  {
    img: "/become-mechanic-get-verified.png",
    title: "Get verified",
    desc: "We check your documents, whether that's your qualifications and insurance as a mechanic, or your business registration as a garage.",
  },
  {
    img: "/become-mechanic-start-quoting.png",
    title: "Start taking jobs",
    desc: "Once you're live, we'll send you jobs that match what you do and where you work.",
  },
];

const mechanicRequirements = [
  "Registered as self-employed with HMRC, or trading as a limited company",
  "Right to work in the UK",
  "F-Gas certification if you carry out air conditioning work",
];

const garageRequirements = [
  "Business registered with HMRC or Companies House",
  "Employers' Liability Insurance, if you employ staff",
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
                Three steps to get verified and start taking jobs, whether you&apos;re a solo mechanic or run a garage.
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
        <section className="bg-white py-16 md:py-10" id="apply">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="reveal">
                <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
                  Become a member
                </span>
                <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] text-[#1A1E1D] mb-6">
                  What you need to get started.
                </h2>
                <p className="font-[family-name:var(--font-rubik)] text-[16px] leading-[1.7] text-[#595C5B] mb-8">
                  We take this seriously. It&apos;s why drivers trust the network. The legal minimum
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
