import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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

// No server-side reading of ?category= here: that would make the page render on
// every request instead of being prebuilt and cached. ServicesCatalog reads it in
// the browser instead.
export default function ServicesPage() {
  return (
    <>
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

        <ServicesCatalog />

        <CTARepeat />
      </main>

      <Footer />
    </>
  );
}
