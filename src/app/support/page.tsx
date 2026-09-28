import Nav from "@/components/Nav";
import SupportHero from "@/components/support/SupportHero";
import ContactSection from "@/components/support/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Help Centre — Garage Gaffer support",
  description: "Get in touch with our team. We're here to help drivers and mechanics in Bristol.",
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
