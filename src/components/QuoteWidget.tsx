"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_CATEGORIES } from "@/data/services";

interface QuoteWidgetProps {
  idSuffix?: string;
  defaultService?: string;
  layout?: "card" | "inline";
}

export default function QuoteWidget({ idSuffix = "", defaultService, layout = "card" }: QuoteWidgetProps) {
  const router = useRouter();
  const postcodeRef = useRef<HTMLInputElement>(null);
  const regRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const reg = regRef.current?.value?.trim() ?? "";
    const postcode = postcodeRef.current?.value?.trim() ?? "";

    if (layout === "inline") {
      if (reg && postcode) {
        router.push(`/booking/step-1?reg=${encodeURIComponent(reg)}&postcode=${encodeURIComponent(postcode)}`);
      }
      return;
    }

    const service = serviceRef.current?.value?.trim() ?? "";
    if (reg && postcode && service) {
      router.push(`/booking?reg=${encodeURIComponent(reg)}&postcode=${encodeURIComponent(postcode)}&service=${encodeURIComponent(service)}`);
    }
  }

  if (layout === "inline") {
    return (
      <form id={idSuffix ? undefined : "quote"} className="w-full max-w-[720px] mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-2xl sm:rounded-full border border-[#DADCDB] shadow-[0_16px_48px_rgba(13,122,95,0.12),0_8px_16px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Registration */}
          <div className="flex-1 flex items-center gap-2.5 px-5 py-3.5 border-b sm:border-b-0 sm:border-r border-[#DADCDB]">
            <svg className="flex-shrink-0 w-4 h-4 text-[#8A8D8C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2" />
              <path d="M9 17h6" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            <input
              id={`reg${idSuffix}`}
              ref={regRef}
              type="text"
              placeholder="REGISTRATION NUMBER"
              maxLength={8}
              aria-label="Car registration"
              className="w-full min-w-0 bg-transparent font-[family-name:var(--font-open-sans)] font-extrabold tracking-[1.5px] uppercase text-[14px] text-[#1A1E1D] placeholder:text-[#8A8D8C] placeholder:normal-case placeholder:tracking-normal placeholder:font-semibold focus:outline-none"
              onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            />
          </div>

          {/* Postcode */}
          <div className="flex-1 flex items-center gap-2.5 px-5 py-3.5">
            <svg className="flex-shrink-0 w-4 h-4 text-[#8A8D8C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <input
              id={`postcode${idSuffix}`}
              ref={postcodeRef}
              type="text"
              placeholder="POSTAL CODE"
              autoComplete="postal-code"
              aria-label="Postcode"
              className="w-full min-w-0 bg-transparent text-[14px] text-[#1A1E1D] placeholder:text-[#8A8D8C] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-start gap-3 mt-4 flex-wrap">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-[14px] bg-[#0D7A5F] text-white font-[family-name:var(--font-rubik)] font-semibold text-[15px] rounded-full shadow-[0_2px_8px_rgba(13,122,95,0.25)] hover:bg-[#055240] hover:shadow-[0_6px_18px_rgba(13,122,95,0.3)] hover:-translate-y-px active:translate-y-px transition-all"
          >
            See my price
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <span className="text-[12.5px] text-[#595C5B]">No card needed. No commitment.</span>
        </div>
      </form>
    );
  }

  return (
    <form
      id={idSuffix ? undefined : "quote"}
      className="relative bg-white rounded-3xl p-7 shadow-[0_16px_48px_rgba(13,122,95,0.15),0_8px_16px_rgba(0,0,0,0.08)] border border-[rgba(13,122,95,0.1)]"
      onSubmit={handleSubmit}
    >
      {/* green tint border overlay */}
      <div className="absolute inset-[-1px] rounded-3xl bg-gradient-to-br from-[rgba(13,122,95,0.15)] to-transparent -z-10 pointer-events-none" />

      <div className="flex items-center justify-between mb-5">
        <h3 className="font-[family-name:var(--font-open-sans)] text-[19px] font-bold tracking-[-0.3px]">
          {idSuffix ? "Get your price" : "Get your price in 30 seconds"}
        </h3>
        <span className="flex items-center gap-1.5 bg-[#ECF7EF] text-[#0D7A5F] px-2.5 py-1 rounded-full text-[11.5px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A5F] animate-pulse-dot" />
          Live quote
        </span>
      </div>

      {/* Registration */}
      <div className="mb-3.5">
        <label htmlFor={`reg${idSuffix}`} className="block text-[13px] font-semibold text-[#1A1E1D] mb-1.5">
          Car registration
        </label>
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8D8C] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2" />
            <path d="M9 17h6" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
          </svg>
          <input
            id={`reg${idSuffix}`}
            ref={regRef}
            type="text"
            placeholder="AB12 CDE"
            maxLength={8}
            className="w-full bg-white border-[1.5px] border-[#DADCDB] rounded-lg pl-10 pr-3.5 py-3 text-[14px] uppercase text-[#1A1E1D] placeholder:text-[#8A8D8C] placeholder:normal-case hover:border-[#b0bab5] focus:outline-none focus:border-[#0D7A5F] focus:shadow-[0_0_0_3px_rgba(13,122,95,0.12)] transition-all"
            onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
          />
        </div>
      </div>

      {/* Postcode */}
      <div className="mb-3.5">
        <label htmlFor={`postcode${idSuffix}`} className="block text-[13px] font-semibold text-[#1A1E1D] mb-1.5">
          {idSuffix ? "Postcode" : "Your postcode"}
        </label>
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8D8C] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          <input
            id={`postcode${idSuffix}`}
            ref={postcodeRef}
            type="text"
            placeholder={idSuffix ? "e.g. BS8 1TH" : "e.g. BS1 4DJ"}
            autoComplete="postal-code"
            className="w-full bg-white border-[1.5px] border-[#DADCDB] rounded-lg pl-10 pr-3.5 py-3 text-[14px] text-[#1A1E1D] placeholder:text-[#8A8D8C] hover:border-[#b0bab5] focus:outline-none focus:border-[#0D7A5F] focus:shadow-[0_0_0_3px_rgba(13,122,95,0.12)] transition-all"
          />
        </div>
      </div>

      {/* Service */}
      <div className="mb-3.5">
        <label htmlFor={`service${idSuffix}`} className="block text-[13px] font-semibold text-[#1A1E1D] mb-1.5">
          What do you need?
        </label>
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8D8C] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <select
            id={`service${idSuffix}`}
            ref={serviceRef}
            defaultValue={defaultService ?? ""}
            className="w-full bg-white border-[1.5px] border-[#DADCDB] rounded-lg pl-10 pr-9 py-3 text-[14px] text-[#1A1E1D] appearance-none hover:border-[#b0bab5] focus:outline-none focus:border-[#0D7A5F] focus:shadow-[0_0_0_3px_rgba(13,122,95,0.12)] transition-all"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23595C5B' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
          >
            <option value="">Choose a category</option>
            {SERVICE_CATEGORIES.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-2 flex items-center justify-center gap-2 px-7 py-[14px] bg-[#0D7A5F] text-white font-[family-name:var(--font-rubik)] font-semibold text-[15px] rounded-xl shadow-[0_2px_8px_rgba(13,122,95,0.25)] hover:bg-[#055240] hover:shadow-[0_6px_18px_rgba(13,122,95,0.3)] hover:-translate-y-px active:translate-y-px transition-all"
      >
        See my price
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      {!idSuffix && (
        <div className="flex items-center justify-center gap-2 mt-3.5 text-[12.5px] text-[#595C5B]">
          <svg className="w-3.5 h-3.5 text-[#0D7A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          No card needed. No commitment.
        </div>
      )}
    </form>
  );
}
