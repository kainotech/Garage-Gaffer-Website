import Image from "next/image";
import QuoteWidget from "./QuoteWidget";

export default function CTARepeat() {
  return (
    <section className="py-24 md:py-16 bg-gradient-to-b from-[#F5F7F6] to-[#F3FFE3]">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 items-end">
        <div>
          <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
            Ready when you are
          </span>
          <h2 className="font-[family-name:var(--font-open-sans)] text-[55px] md:text-[36px] font-extrabold leading-[1.1] tracking-[-1.4px] mb-3.5">
            Your car, <em className="not-italic text-[#0D7A5F] bg-gradient-to-b from-transparent from-[62%] to-[rgba(13,122,95,0.15)] to-[62%] px-0.5 font-extrabold">sorted</em>. See your price and book today.
          </h2>
          <p className="text-[16px] leading-[1.65] text-[#595C5B] mb-8">
            Pop in your reg and postcode to see your labour price. No card, no commitment, no awkward phone calls.
          </p>

          <QuoteWidget idSuffix="2" layout="inline" />
        </div>

        <div className="relative max-w-[420px] mx-auto md:mx-0 md:ml-auto">
          <Image
            src="/cta-final.png"
            alt=""
            width={1278}
            height={1230}
            className="w-full h-auto"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
