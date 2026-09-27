import Link from "next/link";
import { TOTAL_SERVICE_COUNT } from "@/data/services";

const serviceAreas = [
  {
    key: "servicing",
    label: "Servicing",
    desc: "Interim, full and major services, plus oil and filter changes.",
    icon: (
      <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Zm7.43-2.5c.04-.33.07-.66.07-1s-.03-.67-.07-1l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.3 7.3 0 0 0-1.73-1L14.5 2.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5l-.34 2.03c-.63.22-1.2.54-1.73.94l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64L4.57 10.5c-.04.33-.07.66-.07 1s.03.67.07 1l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .6.22l2.49-1c.53.4 1.1.72 1.73.94l.34 2.03a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5l.34-2.03c.63-.22 1.2-.54 1.73-.94l2.49 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.64L19.43 13Z" />
    ),
  },
  {
    key: "repairs",
    label: "Repairs",
    desc: "Brakes, engine, suspension, cooling and more, sorted properly.",
    icon: (
      <path d="M22.7 19 13.6 9.9c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6l-3 3-4.3-4.3C.6 7.1 1 10.1 3 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1 0-1.4Z" />
    ),
  },
  {
    key: "mot",
    label: "MOT",
    desc: "MOT testing to keep your car legal and road safe.",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm-1.2 14.6-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6Z"
      />
    ),
  },
  {
    key: "diagnostics",
    label: "Diagnostics",
    desc: "Warning light or strange noise, we'll track down the cause.",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  },
  {
    key: "inspections",
    label: "Inspections",
    desc: "Health checks that catch small issues before they get big.",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5L20.5 19l-5-5Zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"
      />
    ),
  },
];

export default function Services() {
  return (
    <section className="bg-[#FBFDFC] border-t border-b border-[#DADCDB] py-24 md:py-16" id="services">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-[640px] mb-12 reveal">
          <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
            Our services
          </span>
          <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] mb-3">
            Whatever your car needs, we&apos;ve got a mechanic for it.
          </h2>
          <p className="text-[#595C5B] text-[16px] leading-[1.7]">
            {`${TOTAL_SERVICE_COUNT} services, quoted for your exact vehicle. Genuine cover for everything, big or small.`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-12">
          {serviceAreas.map((area) => (
            <div
              key={area.key}
              className="reveal bg-white border border-[#DADCDB] rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(13,122,95,0.12),0_4px_8px_rgba(0,0,0,0.06)] transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-[#0D7A5F] flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="#fff"
                  className="w-7 h-7"
                  aria-hidden="true"
                >
                  {area.icon}
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-open-sans)] text-[16px] font-bold mb-1.5">
                {area.label}
              </h3>
              <p className="text-[13px] text-[#595C5B] leading-[1.5]">{area.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center reveal">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-[1.5px] border-[#0D7A5F] text-[#0D7A5F] font-[family-name:var(--font-rubik)] font-semibold text-[14px] hover:bg-[#ECF7EF] transition-colors"
          >
            Browse all services
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
