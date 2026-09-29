import type { Metadata } from "next";
import { Open_Sans, Rubik } from "next/font/google";
import "./globals.css";
import StyledJsxRegistry from "./registry";
import { SITE_URL } from "@/lib/site";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

const title = "Garage Gaffer | Your Trusted Mechanic Partner in Bristol";
const description =
  "Your trusted mechanic partner in Bristol. Tell us what your car needs and we'll match you with a vetted local partner garage. See your labour price upfront and book online.";

// Link previews (WhatsApp, iMessage, Slack) fetch the image from the exact URL
// in the tags. Until a custom domain is pointed at Vercel, that URL would
// 404, so on Vercel with no explicit NEXT_PUBLIC_SITE_URL we build the tags
// from the deployment's own *.vercel.app host instead. Once a custom domain is
// attached, Vercel reports that instead (the shortest one, which would be the
// secondary garagegaffer.com), so we ignore it and stay on SITE_URL (the
// primary garagegaffer.co.uk) to match the canonicals.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const previewBase =
  !process.env.NEXT_PUBLIC_SITE_URL && vercelHost?.endsWith(".vercel.app")
    ? `https://${vercelHost}`
    : SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(previewBase),
  title: {
    default: title,
    template: "%s | Garage Gaffer",
  },
  description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: previewBase,
    siteName: "Garage Gaffer",
    title,
    description,
    images: [
      {
        url: "/social-preview.jpg",
        width: 1200,
        height: 675,
        alt: "Garage Gaffer — Your Trusted Mechanic Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/social-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${rubik.variable} ${openSans.variable}`}>
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}
