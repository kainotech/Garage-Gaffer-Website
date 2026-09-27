"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/88 backdrop-saturate-180 backdrop-blur-[14px] border-b border-[#DADCDB]">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-6 h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/gg-logo.png" alt="Garage Gaffer" width={172} height={64} className="h-14 w-auto" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-7" aria-label="Primary">
          <Link href="/services" className="px-3 py-2 rounded-lg font-[family-name:var(--font-rubik)] font-medium text-[13.5px] text-[#595C5B] hover:bg-[#F5F7F6] hover:text-[#1A1E1D] transition-colors">
            Our Services
          </Link>

          {["How It Works", "About Us", "Become a Mechanic", "Support"].map((label) => {
            const hrefs: Record<string, string> = {
              "How It Works": "/how-it-works",
              "About Us": "/about",
              "Become a Mechanic": "/become-a-mechanic",
              "Support": "/support",
            };
            return (
              <Link key={label} href={hrefs[label]} className="px-3 py-2 rounded-lg font-[family-name:var(--font-rubik)] font-medium text-[13.5px] text-[#595C5B] hover:bg-[#F5F7F6] hover:text-[#1A1E1D] transition-colors">
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <Link href="/booking" className="px-3.5 py-1.5 rounded-lg text-[13px] font-semibold font-[family-name:var(--font-rubik)] bg-[#0D7A5F] text-white shadow-[0_2px_8px_rgba(13,122,95,0.25)] hover:bg-[#055240] hover:shadow-[0_6px_18px_rgba(13,122,95,0.3)] hover:-translate-y-px transition-all">
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden ml-auto w-10 h-10 flex items-center justify-center rounded-lg text-[#1A1E1D] hover:bg-[#F5F7F6] transition-colors"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#DADCDB] bg-white px-6 py-4 flex flex-col gap-2">
          <Link href="/services" className="py-2 text-[15px] font-medium text-[#1A1E1D]" onClick={() => setMobileOpen(false)}>Our Services</Link>
          <Link href="/how-it-works" className="py-2 text-[15px] font-medium text-[#1A1E1D]" onClick={() => setMobileOpen(false)}>How It Works</Link>
          <Link href="/about" className="py-2 text-[15px] font-medium text-[#1A1E1D]" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link href="/become-a-mechanic" className="py-2 text-[15px] font-medium text-[#1A1E1D]" onClick={() => setMobileOpen(false)}>Become a Mechanic</Link>
          <Link href="/support" className="py-2 text-[15px] font-medium text-[#1A1E1D]" onClick={() => setMobileOpen(false)}>Support</Link>
          <div className="flex gap-3 mt-2 pt-2 border-t border-[#DADCDB]">
            <Link href="/booking" className="flex-1 py-2.5 rounded-lg text-[14px] font-semibold text-center bg-[#0D7A5F] text-white" onClick={() => setMobileOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
