import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceHero from "@/components/ServiceHero";
import ServicesCatalog from "@/components/services/ServicesCatalog";
import CTARepeat from "@/components/CTARepeat";

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
          current="All services"
          title={
            <>
              Everything your car needs. <em>All in one place.</em>
            </>
          }
          subtitle="From routine servicing to bodywork, pick what your car needs below and get an instant, fixed price."
        />

        <ServicesCatalog initialCategorySlug={category} />

        <CTARepeat />
      </main>

      <Footer />
    </>
  );
}
