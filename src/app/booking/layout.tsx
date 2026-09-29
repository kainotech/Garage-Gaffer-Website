import type { Metadata } from "next";
import BookingTopBar from "@/components/booking/BookingTopBar";
import Footer from "@/components/Footer";
import BookingProgressBar from "@/components/booking/BookingProgressBar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Book a Service",
  description: "Book trusted, vetted vehicle repairs and servicing in Bristol. Get an instant labour price and choose your availability.",
  robots: { index: false, follow: false },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BookingTopBar />
      <Suspense fallback={
        <div style={{ background: "#fff", borderBottom: "1px solid #DADCDB", height: 72 }} />
      }>
        <BookingProgressBar />
      </Suspense>
      <main style={{ minHeight: "calc(100vh - 144px)", background: "var(--color-bg)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
