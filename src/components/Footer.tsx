import Image from "next/image";

// Social links are on hold for now — flip this back on once the accounts are ready to link.
const SHOW_SOCIALS = false;

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

const footerColumns = [
  [
    { label: "Services", href: "/services" },
    { label: "How it works", href: "/how-it-works" },
  ],
  [
    { label: "About us", href: "/about" },
    { label: "Become a Gaffer", href: "/become-a-mechanic" },
  ],
  [
    { label: "Support", href: "/support" },
  ],
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1412] text-white/75 pt-14 pb-6" id="mechanics">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-white/8">
          {/* Brand */}
          <div>
            <Image
              src="/footer-logo.png"
              alt="Garage Gaffer"
              width={1653}
              height={524}
              className="h-[46px] w-auto mb-3"
            />
            <p className="text-pretty text-[13.5px] leading-[1.65] text-white/65 max-w-[340px] mb-4">
              Matching you with trusted, fully vetted local garages.
            </p>
            {SHOW_SOCIALS && (
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
            )}
          </div>

          {/* Links */}
          <div className="flex gap-10 md:ml-auto">
            {footerColumns.map((col, i) => (
              <ul key={i} className="flex flex-col gap-2.5 list-none p-0">
                {col.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/65 text-[14px] hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 text-[13px] text-white/45 flex-wrap gap-4">
          <span>© 2026 Garage Gaffer Ltd.</span>
          <div className="flex gap-5">
            {[
              { label: "Terms", href: "/terms" },
              { label: "Cookies", href: "/cookie-policy" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="text-white/60 hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
