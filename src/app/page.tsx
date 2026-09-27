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

export default function Home() {
  return (
    <>
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
