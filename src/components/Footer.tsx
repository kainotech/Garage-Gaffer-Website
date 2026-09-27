const WrenchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const socials = [
  {
    label: "Instagram",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" /></svg>,
  },
  {
    label: "Facebook",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  },
  {
    label: "X",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 3h3l-7.5 8.6L22 21h-6.8l-5.3-6.6L3.8 21H1l8-9.2L1 3h6.9l4.8 6.1L18 3zm-1.2 16h1.7L7.3 5H5.4l11.4 14z" /></svg>,
  },
  {
    label: "TikTok",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.5 8.5a7.5 7.5 0 0 1-4.4-1.4v8.2a6.2 6.2 0 1 1-6.2-6.2c.3 0 .6 0 .9.1v3.3a3 3 0 1 0 2.1 2.8V2h3.2a4.3 4.3 0 0 0 4.4 4.2v2.3z" /></svg>,
  },
];

const footerLinks = [
  {
    heading: "Services",
    links: [
      { label: "Servicing", href: "/services?category=servicing" },
      { label: "Brakes", href: "/services?category=brakes" },
      { label: "Engine & Mechanical", href: "/services?category=engine-mechanical" },
      { label: "Electrical & Diagnostics", href: "/services?category=electrical-diagnostics" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    heading: "For mechanics",
    links: [
      { label: "Become a Gaffer", href: "/become-a-mechanic" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help centre", href: "/support" },
      { label: "Contact us", href: "/support" },
      { label: "Warranty claim", href: "/support" },
      { label: "0117 000 0000", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1412] text-white/75 pt-20 pb-8" id="mechanics">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 pb-12 border-b border-white/8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 font-[family-name:var(--font-open-sans)] font-extrabold text-[17px] text-white mb-4">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0D7A5F] to-[#055240] flex items-center justify-center shadow-[0_4px_10px_rgba(13,122,95,0.3)]">
                <WrenchIcon />
              </span>
              Garage Gaffer
            </div>
            <p className="text-[13.5px] leading-[1.65] text-white/65 max-w-[280px] mb-5">
              Bristol&apos;s home for vetted mobile mechanics. Honest work, fair prices, parked on your driveway.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/8 text-white flex items-center justify-center hover:bg-[#0D7A5F] hover:-translate-y-0.5 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="font-[family-name:var(--font-rubik)] text-[13px] font-bold uppercase tracking-[0.06em] text-white mb-4">{col.heading}</h4>
              <ul className="flex flex-col gap-2.5 list-none p-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/65 text-[14px] hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-8 text-[13px] text-white/45 flex-wrap gap-4">
          <span>© 2026 Garage Gaffer Ltd. Registered in England &amp; Wales.</span>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-white/60 hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
