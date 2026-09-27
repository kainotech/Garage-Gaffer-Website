import Image from "next/image";

export default function Coverage() {
  return (
    <section className="relative h-[560px] md:h-[720px] overflow-hidden">
      <Image
        src="/bristol-coverage-map.png"
        alt="Illustrated map of Garage Gaffer's Bristol coverage area, marking Clifton, Redland, Bishopston, St Werburghs, Fishponds, Henleaze, Southville, Bedminster, Totterdown and Brislington"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Scrim, concentrated bottom-right where the content sits */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 1200px 980px at 100% 100%, rgba(10,20,18,0.92) 0%, rgba(10,20,18,0.55) 42%, rgba(10,20,18,0.15) 66%, transparent 82%)",
        }}
        aria-hidden="true"
      />

      {/* Content, bottom-right corner */}
      <div className="reveal absolute bottom-8 right-6 md:bottom-14 md:right-14 max-w-[240px] md:max-w-[320px] text-right">
        <h2
          className="font-[family-name:var(--font-open-sans)] text-[19px] md:text-[24px] font-extrabold leading-[1.2] tracking-[-0.3px] mb-9 [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
          style={{ color: "#ffffff" }}
        >
          Covering every corner of Bristol.
        </h2>
        <a
          href="/booking"
          className="inline-flex items-center gap-2 px-7 py-[14px] bg-[#0D7A5F] text-white font-[family-name:var(--font-rubik)] font-semibold text-[15px] rounded-xl shadow-[0_2px_8px_rgba(13,122,95,0.25)] hover:bg-[#055240] hover:shadow-[0_6px_18px_rgba(13,122,95,0.3)] hover:-translate-y-px active:translate-y-px transition-all"
        >
          Book My Job
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
