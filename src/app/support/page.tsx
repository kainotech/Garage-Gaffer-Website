import Nav from "@/components/Nav";
import SupportHero from "@/components/support/SupportHero";
import SupportCategories from "@/components/support/SupportCategories";
import SupportFAQ from "@/components/support/SupportFAQ";
import MechanicHub from "@/components/support/MechanicHub";
import ContactSection from "@/components/support/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Help Centre — Garage Gaffer support",
  description: "Search for answers, browse by topic, or get in touch with our team. We're here to help drivers and mechanics in Bristol.",
};

export default function SupportPage() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <SupportHero />
        <SupportCategories />
        <SupportFAQ />
        <MechanicHub />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
