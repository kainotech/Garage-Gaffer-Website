import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceHero from "@/components/ServiceHero";
import ServicesCatalog from "@/components/services/ServicesCatalog";
import { TOTAL_SERVICE_COUNT } from "@/data/services";

export const metadata: Metadata = {
  title: "All Services — Bristol Mobile Mechanics | Garage Gaffer",
  description:
    "Every service Garage Gaffer's vetted Bristol mechanics offer, organised by category. Servicing, brakes, engine, electrics, bodywork and more — quoted for your exact vehicle.",
};

interface ServicesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const { category } = await searchParams;

  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <ServiceHero
          breadcrumb={{ parent: "Services", current: "All services" }}
          title={
            <>
              Everything your car needs.{" "}
              <em className="italic not-italic text-[#0D7A5F] bg-gradient-to-b from-transparent from-62% to-[rgba(13,122,95,0.15)] to-62% px-0.5 font-extrabold">
                All in one place.
              </em>
            </>
          }
          subtitle={`Browse all ${TOTAL_SERVICE_COUNT} services we offer, grouped by category — book any of them and a vetted Bristol mechanic will quote you direct.`}
          meta={{ mechanicCount: 127, quoteTime: "7 mins" }}
          idSuffix="services-hero"
        />

        <ServicesCatalog initialCategorySlug={category} />

        <section className="bg-white py-24 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6 text-center reveal">
            <h2 className="font-[family-name:var(--font-open-sans)] text-[28px] font-extrabold leading-[1.2] tracking-[-0.4px] mb-3">
              Ready to get started?
            </h2>
            <p className="text-[#595C5B] text-[15px] leading-[1.7] mb-7 max-w-[480px] mx-auto">
              Post your job and get a direct quote from a vetted Bristol mechanic — free to post, no card needed.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-[14px] font-semibold font-[family-name:var(--font-rubik)] bg-[#0D7A5F] text-white shadow-[0_2px_8px_rgba(13,122,95,0.25)] hover:bg-[#055240] hover:shadow-[0_6px_18px_rgba(13,122,95,0.3)] hover:-translate-y-px transition-all"
            >
              Book your service
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
