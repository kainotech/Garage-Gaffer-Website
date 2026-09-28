import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Why from "@/components/Why";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Coverage from "@/components/Coverage";
import FAQ from "@/components/FAQ";
import CTARepeat from "@/components/CTARepeat";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function Home() {
  return (
    <>
      {/* Organisation / WebSite structured data - powers the logo Google can
          show next to the site name in search results */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "Garage Gaffer",
              url: SITE_URL,
              logo: absoluteUrl("/icon.png"),
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: "Garage Gaffer",
              url: SITE_URL,
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
          ],
        }}
      />

      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <Why />
        <HowItWorks />
        <Services />
        <Coverage />
        <FAQ />
        <CTARepeat />
      </main>
      <Footer />
    </>
  );
}
