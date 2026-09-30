"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useConsent } from "@/lib/consent";

// GTM (and so GA4) only loads once the visitor has allowed analytics cookies.
export default function ConsentGatedGTM({ gtmId }: { gtmId: string }) {
  const consent = useConsent();
  if (!consent?.analytics) return null;
  return <GoogleTagManager gtmId={gtmId} />;
}
