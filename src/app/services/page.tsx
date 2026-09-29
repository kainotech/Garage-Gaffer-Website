import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceHero from "@/components/ServiceHero";
import ServicesCatalog from "@/components/services/ServicesCatalog";
import CTARepeat from "@/components/CTARepeat";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Every service our vetted Bristol mechanics offer, by category: servicing, brakes, engine, electrics, bodywork and more, with an instant labour price for your exact vehicle.",
  alternates: { canonical: absoluteUrl("/services") },
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
          current="All services"
          title={
            <>
              Everything your car needs. <em>All in one place.</em>
            </>
          }
          subtitle="From routine servicing to bodywork, pick what your car needs below and get an instant, upfront labour price."
        />

        <ServicesCatalog initialCategorySlug={category} />

        <CTARepeat />
      </main>

      <Footer />
    </>
  );
}
