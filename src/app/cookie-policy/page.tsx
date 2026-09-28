import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import LegalHero from "@/components/legal/LegalHero";
import LegalSidebarNav from "@/components/legal/LegalSidebarNav";
import LegalSection from "@/components/legal/LegalSection";
import Placeholder from "@/components/legal/Placeholder";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Garage Gaffer uses cookies and browser storage on garagegaffer.co.uk.",
  alternates: { canonical: absoluteUrl("/cookie-policy") },
};

const sections = [
  { id: "what-this-covers", label: "What this policy covers" },
  { id: "cookies-we-use", label: "Cookies we use" },
  { id: "booking-storage", label: "Similar technology we do use" },
  { id: "if-this-changes", label: "If this changes" },
  { id: "managing-storage", label: "Managing cookies and browser storage" },
  { id: "contact", label: "Contact us" },
];

export default function CookiePolicyPage() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <LegalHero
          eyebrow="Legal"
          title="Cookie Policy"
          meta="Last updated 28 September 2026"
          intro={
            <>
              This policy explains how garagegaffer.co.uk uses cookies and similar browser technology.
              It sits alongside our{" "}
              <Link href="/terms" className="text-[#0D7A5F] underline underline-offset-2 hover:text-[#055240]">
                Terms &amp; Conditions
              </Link>
              .
            </>
          }
        />

        <div className="max-w-[1080px] mx-auto px-6 py-16 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <LegalSidebarNav items={sections} />
            <div className="max-w-[720px] min-w-0">

          <LegalSection id="what-this-covers" number={1} title="What this policy covers">
            <p>
              &ldquo;Cookies&rdquo; are small files, and similar technologies are small pieces of
              information, that a website can store in your browser. Under UK law, we only need your
              consent to use cookies or similar technology that isn&apos;t strictly necessary for the
              site to work.
            </p>
          </LegalSection>

          <LegalSection id="cookies-we-use" number={2} title="Cookies we use">
            <p>
              We do not currently set any cookies on this site for analytics, advertising or marketing
              purposes. We don&apos;t use tools like Google Analytics, advertising pixels, or similar
              tracking technology.
            </p>
            <p>
              Because of this, you won&apos;t see a cookie consent banner when you visit. There&apos;s
              currently nothing on the site that needs your consent.
            </p>
          </LegalSection>

          <LegalSection id="booking-storage" number={3} title="Similar technology we do use: booking session storage">
            <p>
              When you go through our booking flow, we use your browser&apos;s built-in &ldquo;session
              storage&rdquo; to remember what you&apos;ve entered, such as your vehicle details, chosen
              service and contact details, as you move between the steps.
            </p>
            <ul>
              <li>It stays only in your browser and isn&apos;t automatically sent to our servers.</li>
              <li>It&apos;s cleared automatically once you finish your booking, or when you close the browser tab.</li>
              <li>It exists only so the booking form works properly across its steps, which is why it&apos;s strictly necessary and UK cookie law doesn&apos;t require us to ask your permission for it.</li>
            </ul>
          </LegalSection>

          <LegalSection id="if-this-changes" number={4} title="If this changes">
            <p>
              If we start using cookies or similar technology for analytics, marketing, or anything else
              that isn&apos;t strictly necessary, we&apos;ll update this policy and ask for your consent
              first, in line with UK law (the Privacy and Electronic Communications Regulations,
              alongside UK GDPR).
            </p>
          </LegalSection>

          <LegalSection id="managing-storage" number={5} title="Managing cookies and browser storage">
            <p>
              Most browsers let you view, delete and block cookies and site storage through their
              settings; check your browser&apos;s help pages for how to do this. Blocking storage
              entirely may stop parts of the booking flow, like remembering your progress between steps,
              from working properly.
            </p>
          </LegalSection>

          <LegalSection id="contact" number={6} title="Contact us">
            <p>
              Questions about this policy? Email us at{" "}
              <Placeholder>support@garagegaffer.co.uk</Placeholder>.
            </p>
          </LegalSection>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
