"use client";

import { useState } from "react";
import { SERVICE_CATEGORIES } from "@/data/services";
import { CategoryIcon } from "@/data/serviceCategoryVisuals";

interface ServicesCatalogProps {
  initialCategorySlug?: string;
}

export default function ServicesCatalog({ initialCategorySlug }: ServicesCatalogProps) {
  const initialSlug =
    (initialCategorySlug && SERVICE_CATEGORIES.some((c) => c.slug === initialCategorySlug)
      ? initialCategorySlug
      : undefined) ?? SERVICE_CATEGORIES[0].slug;

  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const activeIndex = SERVICE_CATEGORIES.findIndex((c) => c.slug === activeSlug);
  const active = SERVICE_CATEGORIES[activeIndex];

  return (
    <section className="bg-[#FBFDFC] border-t border-b border-[#DADCDB] py-24 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-[640px] mb-12 reveal">
          <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
            Full catalogue
          </span>
          <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] mb-3">
            Every service, sorted by category.
          </h2>
          <p className="text-[#595C5B] text-[16px] leading-[1.7]">
            Pick a category to see what&apos;s included, every job is quoted for your exact vehicle, so there&apos;s no guessing on price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 reveal">
          {/* Category list */}
          <nav aria-label="Service categories" className="md:sticky md:top-[88px] md:self-start">
            <ul className="list-none p-0 flex flex-col gap-1 bg-white border border-[#DADCDB] rounded-2xl p-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              {SERVICE_CATEGORIES.map((category) => {
                const isActive = category.slug === activeSlug;
                return (
                  <li key={category.slug}>
                    <button
                      onClick={() => setActiveSlug(category.slug)}
                      aria-current={isActive}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors"
                      style={{
                        background: isActive ? "#ECF7EF" : "transparent",
                      }}
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border"
                        style={{
                          background: isActive ? "white" : "#ECF7EF",
                          borderColor: "color-mix(in srgb, #0D7A5F 15%, transparent)",
                          color: "#0D7A5F",
                        }}
                      >
                        <CategoryIcon slug={category.slug} />
                      </span>
                      <span
                        className="flex-grow font-[family-name:var(--font-rubik)] text-[13.5px] font-semibold"
                        style={{ color: isActive ? "#1A1E1D" : "#595C5B" }}
                      >
                        {category.name}
                      </span>
                      <span
                        className="font-[family-name:var(--font-rubik)] text-[11.5px] font-semibold px-1.5 py-0.5 rounded-md"
                        style={{
                          color: isActive ? "#0D7A5F" : "#8A8D8C",
                          background: isActive ? "white" : "transparent",
                        }}
                      >
                        {category.services.length}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 bg-white border border-[#DADCDB] rounded-2xl p-5">
              <h3 className="font-[family-name:var(--font-open-sans)] text-[15px] font-bold mb-1.5">
                Not sure what you need?
              </h3>
              <p className="text-[#595C5B] text-[13px] leading-[1.6] mb-4">
                Send us an enquiry and tell us what&apos;s going on with your car. We&apos;ll help you work out what it needs, free of charge.
              </p>
              <a
                href="mailto:support@garagegaffer.co.uk?subject=Help%20me%20find%20the%20right%20service&body=Hi%20Garage%20Gaffer%2C%0D%0A%0D%0AHere's%20what's%20going%20on%20with%20my%20car%3A%0D%0A%0D%0A"
                className="inline-flex items-center justify-center w-full px-3.5 py-2 rounded-lg text-[13px] font-semibold font-[family-name:var(--font-rubik)] bg-[#0D7A5F] text-white shadow-[0_2px_8px_rgba(13,122,95,0.25)] hover:bg-[#055240] transition-colors"
              >
                Send an enquiry
              </a>
            </div>
          </nav>

          {/* Service grid */}
          <div>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-[family-name:var(--font-open-sans)] text-[21px] font-bold">
                {active.name}
              </h3>
              <span className="font-[family-name:var(--font-rubik)] text-[13px] text-[#595C5B]">
                {active.services.length} service{active.services.length === 1 ? "" : "s"} available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {active.services.map((service) => (
                <article
                  key={service.name}
                  className="bg-white border border-[#DADCDB] rounded-xl p-5 flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(13,122,95,0.1),0_4px_8px_rgba(0,0,0,0.05)] transition-all duration-200"
                >
                  <h4 className="font-[family-name:var(--font-open-sans)] text-[15.5px] font-bold mb-1.5">
                    {service.name}
                  </h4>
                  <p className="text-[#595C5B] text-[13.5px] leading-[1.55]">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
