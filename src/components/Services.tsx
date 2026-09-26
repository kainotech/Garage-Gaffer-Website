import Link from "next/link";
import { SERVICE_CATEGORIES, TOTAL_SERVICE_COUNT } from "@/data/services";
import { CategoryIcon, accentForIndex } from "@/data/serviceCategoryVisuals";

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
            {`${TOTAL_SERVICE_COUNT} services across ${SERVICE_CATEGORIES.length} categories — from a strange noise you can't quite place to your annual full service. Book any of them and we'll handle the rest.`}
          </p>
        </div>

        <Link
          href="/services"
          className="group block relative overflow-hidden bg-white border border-[#DADCDB] rounded-2xl p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(13,122,95,0.12),0_4px_8px_rgba(0,0,0,0.06)] transition-all duration-200 reveal"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-2xl bg-[#0D7A5F]" />

          <div className="flex flex-wrap gap-2.5 mb-7">
            {SERVICE_CATEGORIES.map((category, i) => {
              const colors = accentForIndex(i);
              return (
                <span
                  key={category.slug}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-[family-name:var(--font-rubik)] text-[12.5px] font-semibold"
                  style={{
                    background: colors.well,
                    borderColor: `color-mix(in srgb, ${colors.accent} 15%, transparent)`,
                    color: colors.accent,
                  }}
                >
                  <CategoryIcon slug={category.slug} className="w-3.5 h-3.5" />
                  {category.name}
                </span>
              );
            })}
          </div>

          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h3 className="font-[family-name:var(--font-open-sans)] text-[22px] font-bold mb-1.5">
                Browse the full catalogue
              </h3>
              <p className="text-[#595C5B] text-[14.5px] leading-[1.6]">
                Every service we offer, with what&apos;s included — quoted for your exact vehicle.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 flex-shrink-0 font-[family-name:var(--font-rubik)] font-semibold text-[13px] uppercase tracking-[0.06em] text-[#0D7A5F] group-hover:text-[#055240] transition-colors">
              See all services
              <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
