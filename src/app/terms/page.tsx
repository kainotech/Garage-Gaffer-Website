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
  title: "Terms & Conditions",
  description:
    "The terms that apply when you book vehicle work through Garage Gaffer, Bristol's mechanic booking marketplace.",
  alternates: { canonical: absoluteUrl("/terms") },
};

const sections = [
  { id: "who-we-are", label: "Who we are" },
  { id: "definitions", label: "Definitions" },
  { id: "our-role", label: "Our role: a marketplace, not a garage" },
  { id: "using-the-site", label: "Using the site" },
  { id: "getting-a-price", label: "Getting a price" },
  { id: "bookings", label: "Bookings, cancelling and rescheduling" },
  { id: "payment", label: "Payment" },
  { id: "your-rights", label: "Your rights" },
  { id: "cooling-off", label: "Cancelling under the Consumer Contracts Regulations" },
  { id: "independent-mechanics", label: "Independent mechanics" },
  { id: "partner-garages", label: "Garage and mechanic partners" },
  { id: "liability", label: "Liability" },
  { id: "your-information", label: "How we use your information" },
  { id: "complaints", label: "Complaints" },
  { id: "governing-law", label: "Governing law and jurisdiction" },
  { id: "changes", label: "Changes to these terms" },
  { id: "contact", label: "Contact us" },
];

export default function TermsPage() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <LegalHero
          eyebrow="Legal"
          title="Terms & Conditions"
          meta="Last updated 29 September 2026 · Governed by the law of England and Wales"
          intro={
            <>
              These terms apply whenever you book vehicle work through garagegaffer.co.uk. Please read
              them alongside our{" "}
              <Link href="/cookie-policy" className="text-[#0D7A5F] underline underline-offset-2 hover:text-[#055240]">
                Cookie Policy
              </Link>
              , which explains how we handle data in your browser.
            </>
          }
        />

        <div className="max-w-[1080px] mx-auto px-6 py-16 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <LegalSidebarNav items={sections} />
            <div className="max-w-[720px] min-w-0">

          <LegalSection id="who-we-are" number={1} title="Who we are">
            <p>
              Garage Gaffer is operated by <strong>Garage Gaffer Ltd</strong>, a company registered in
              England and Wales.
            </p>
            <p>
              In these terms, &ldquo;Garage Gaffer&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
              &ldquo;our&rdquo; mean Garage Gaffer Ltd. &ldquo;You&rdquo; and &ldquo;your&rdquo; mean the
              person booking vehicle work through our website.
            </p>
          </LegalSection>

          <LegalSection id="definitions" number={2} title="Definitions">
            <ul>
              <li><strong>Platform</strong> means the Garage Gaffer website and booking service.</li>
              <li><strong>Mechanic</strong> means an independent mechanic or garage who carries out vehicle work booked through the Platform.</li>
              <li><strong>Booking</strong> means a job you arrange through the Platform for a Mechanic to carry out.</li>
              <li><strong>Charges</strong> means the labour price shown to you for a Booking at the time you book it.</li>
            </ul>
          </LegalSection>

          <LegalSection id="our-role" number={3} title="Our role: a marketplace, not a garage">
            <p>
              Garage Gaffer is a booking platform. We connect you with independent, vetted mechanics; we
              are not a garage ourselves, and we do not carry out any vehicle work.
            </p>
            <p>
              Each Mechanic is an independent business, or a self-employed tradesperson, and not our
              employee or agent. They are responsible for the vehicle work they carry out, in the same
              way any garage is responsible for its own work. We check every Mechanic before they can
              take jobs on the Platform, including a DBS check, verification of trade qualifications, and
              confirmation of public liability insurance, but we do not supervise individual jobs once
              they&apos;re under way.
            </p>
          </LegalSection>

          <LegalSection id="using-the-site" number={4} title="Using the site">
            <p>
              You must be at least 18 and able to form a legally binding contract to make a Booking. You
              must give accurate information about yourself and your vehicle: an incorrect registration
              number or postcode can lead to an incorrect price, or a Mechanic being unable to complete
              the job.
            </p>
          </LegalSection>

          <LegalSection id="getting-a-price" number={5} title="Getting a price">
            <p>
              You get a price by entering your registration number (or your car&apos;s details) and
              postcode, then choosing the work you need. The price shown for your chosen job at that
              point is the labour price, worked out for your specific vehicle. It won&apos;t change once
              you&apos;ve booked, provided the vehicle details you gave us were accurate.
            </p>
            <p>
              The labour price doesn&apos;t include spare parts. If your job needs parts, we&apos;ll
              confirm their cost with you separately, and they&apos;ll only be supplied with your
              agreement.
            </p>
            <p>
              If a Mechanic finds that further work is genuinely needed once they&apos;ve started (for
              example, an underlying fault only visible once your car is on the ramp), they&apos;ll
              contact you to agree a separate price for that extra work before carrying it out. The
              labour price for the job you originally booked won&apos;t change without your agreement.
            </p>
          </LegalSection>

          <LegalSection id="bookings" number={6} title="Bookings, cancelling and rescheduling">
            <p>
              When you book a slot, we pass your Booking to a Mechanic. You can cancel or reschedule at
              any time before your appointment, since we don&apos;t take any payment until the work has
              been carried out.
            </p>
            <p>
              We&apos;d appreciate as much notice as possible if your plans change, so the Mechanic
              isn&apos;t left holding a slot for a job that&apos;s no longer happening.
              If you cancel at very short notice or don&apos;t show up, the Mechanic may not be able to
              attend, and repeated late cancellations may affect your ability to book with us again.
            </p>
          </LegalSection>

          <LegalSection id="payment" number={7} title="Payment">
            <p>
              You pay the Mechanic directly once the work has been completed. We don&apos;t currently
              collect payment through the Platform, and no card details are taken when you make a
              Booking. There is no charge for making a Booking itself.
            </p>
          </LegalSection>

          <LegalSection id="your-rights" number={8} title="Your rights">
            <p>
              Nothing in these terms affects your statutory rights. Under the Consumer Rights Act 2015,
              vehicle work carried out through the Platform must be performed with reasonable care and
              skill, within a reasonable time, and for the price agreed.
            </p>
            <p>
              If something goes wrong with completed work, contact us and we&apos;ll help you resolve it
              with the Mechanic who carried it out.
            </p>
          </LegalSection>

          <LegalSection id="cooling-off" number={9} title="Cancelling under the Consumer Contracts Regulations">
            <p>
              Because you book through our website, you normally have the right to cancel within 14 days
              of booking, without giving a reason, under the Consumer Contracts Regulations 2013.
            </p>
            <p>
              If you ask for the work to be carried out before the 14 days are up, which will usually be
              the case since most Bookings are for a slot within the next few days, you may lose this
              cancellation right once the work has started or been completed. We&apos;ll always confirm
              your Booking details, including the price and date of the work, before you&apos;re
              committed.
            </p>
            <p>
              This is separate from the cancellation and rescheduling arrangements in the section above,
              which cover changing or cancelling your slot with a Mechanic.
            </p>
          </LegalSection>

          <LegalSection id="independent-mechanics" number={10} title="Independent mechanics">
            <p>
              Every Mechanic on the Platform is vetted before they can take jobs, including a DBS check,
              verification of trade qualifications such as City &amp; Guilds or IMI, and confirmation of
              public liability insurance.
            </p>
            <p>
              Even so, each Mechanic is responsible for their own work, conduct and legal obligations to
              you as a consumer. Garage Gaffer is not a party to the contract for the vehicle work itself;
              that contract is between you and the Mechanic.
            </p>
          </LegalSection>

          <LegalSection id="partner-garages" number={11} title="Garage and mechanic partners">
            <p>
              This section applies if you apply to join Garage Gaffer as a garage or mechanic. When you
              submit the application form, you agree to these terms, including this section.
            </p>
            <p>
              Your application must be accurate and complete. We may ask for supporting documents,
              including proof of Level 3 trade qualifications (such as City &amp; Guilds or IMI), public
              liability insurance and a DBS check, and you must keep these valid for as long as you take
              jobs through the Platform. We use the details you give us to assess your application and
              to get in touch with you about it.
            </p>
            <p>
              You are an independent business, or a self-employed tradesperson, and not our employee
              or agent. You are free to take work from other sources, and we don&apos;t require
              exclusivity. Being accepted onto the Platform doesn&apos;t promise any minimum amount
              of work.
            </p>
            <p>
              For each Booking you accept, you are responsible for carrying out the work with
              reasonable care and skill, at the labour price shown to the customer. You must agree any
              extra work or parts with the customer, through us, before carrying them out.
            </p>
            <p>
              We may pause or remove a partner who doesn&apos;t meet our standards, including where
              customer ratings consistently fall below our threshold. Any fees and payment
              arrangements for partners are confirmed to you in writing when you are onboarded.
            </p>
          </LegalSection>

          <LegalSection id="liability" number={12} title="Liability">
            <p>
              Nothing in these terms limits or excludes our liability for death or personal injury caused
              by our negligence, for fraud or fraudulent misrepresentation, or for anything else that
              cannot lawfully be limited or excluded.
            </p>
            <p>
              Subject to that, we are not liable for the acts or omissions of any Mechanic, including the
              standard of any vehicle work carried out; responsibility for that sits with the Mechanic, as
              explained above. Our own liability for losses arising from your use of the Platform itself
              is limited to the Charges for the relevant Booking, and we are not liable for indirect
              losses or losses to a business.
            </p>
          </LegalSection>

          <LegalSection id="your-information" number={13} title="How we use your information">
            <p>
              We use the vehicle and contact details you give us to look up your vehicle, work out your
              price, process your Booking, and get in touch with you about it. This can include sharing
              your registration number with official UK vehicle information services to confirm your
              vehicle&apos;s details, and sharing your booking and contact details with the systems we use
              to run the Platform and send you a booking confirmation.
            </p>
            <p>
              If you have questions about how your information is used, contact us at{" "}
              <Placeholder>support@garagegaffer.co.uk</Placeholder>.
            </p>
          </LegalSection>

          <LegalSection id="complaints" number={14} title="Complaints">
            <p>
              If something goes wrong, contact us at{" "}
              <Placeholder>support@garagegaffer.co.uk</Placeholder> and we&apos;ll do our best to put it
              right.
            </p>
            <p>
              We are not currently a member of a certified alternative dispute resolution (ADR) scheme.
              If we can&apos;t resolve a complaint between us, Citizens Advice offers free, impartial
              advice on your consumer rights and next steps.
            </p>
          </LegalSection>

          <LegalSection id="governing-law" number={15} title="Governing law and jurisdiction">
            <p>
              These terms, and any Booking made through the Platform, are governed by the law of England
              and Wales. Disputes can be brought in the courts of England and Wales, or, if you live in
              Scotland or Northern Ireland, in the courts there instead.
            </p>
          </LegalSection>

          <LegalSection id="changes" number={16} title="Changes to these terms">
            <p>
              We may update these terms from time to time, for example to reflect changes to how the
              Platform works or changes in the law. The current version is always the one on this page,
              with the &ldquo;last updated&rdquo; date at the top. Continuing to use the Platform after a
              change means you accept the updated terms.
            </p>
          </LegalSection>

          <LegalSection id="contact" number={17} title="Contact us">
            <p>
              Questions about these terms? Email us at support@garagegaffer.co.uk.
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
