import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SupportHero from "@/components/support/SupportHero";
import ContactSection from "@/components/support/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help Centre",
  description: "Get in touch with our team. We're here to help drivers and mechanics in Bristol.",
  alternates: { canonical: absoluteUrl("/support") },
};

export default function SupportPage() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <SupportHero />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
