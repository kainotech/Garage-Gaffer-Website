"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { VehicleType } from "@/data/pricingConfig";
import { isValidEmail } from "@/lib/validation";
import { isValidUkPhone } from "@/lib/phone";

export type SelectedItem = {
  id: string;
  name: string;
  /** undefined means the item is custom-quoted (no fixed price) */
  price?: number;
  partsIncluded?: boolean;
};

export type BookingSession = {
  car: {
    reg: string;
    postcode: string;
    make?: string;
    model?: string;
    fuelType?: string;
    engineCapacity?: string;
    year?: string;
    /** silently derived from make+model (or MOT lookup) - never asked for directly */
    vehicleType?: VehicleType;
  };
  /** slug of the selected category from SERVICE_CATEGORIES, or "" if not yet chosen */
  service: string;
  selectedWork: SelectedItem[];
  details: {
    firstName: string;
    lastName: string;
    email: string;
    address1: string;
    address2?: string;
    city: string;
    postcode: string;
    phone: string;
    /** dateSlotKey ("YYYY-MM-DD_HH:MM") of the single chosen repair slot, or null if not yet picked */
    availability: string | null;
    drivable: boolean;
    instructions?: string;
  };
  completedSteps: number[];
  /** true once the customer has confirmed the booking on Step 4 — locks the flow against further edits */
  confirmed: boolean;
  /** issued by POST /api/booking-confirm when the booking is confirmed; shown on the confirmation page and in the confirmation email */
  bookingRef?: string;
};

const SESSION_KEY = "booking_session";

const DEFAULT_SESSION: BookingSession = {
  car: { reg: "", postcode: "" },
  service: "",
  selectedWork: [],
  details: {
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    phone: "",
    availability: null,
    drivable: true,
    instructions: "",
  },
  completedSteps: [],
  confirmed: false,
};

export function useBookingSession() {
  function getSession(): BookingSession {
    if (typeof window === "undefined") return { ...DEFAULT_SESSION };
    try {
      const raw = window.sessionStorage.getItem(SESSION_KEY);
      if (!raw) return { ...DEFAULT_SESSION };
      return { ...DEFAULT_SESSION, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_SESSION };
    }
  }

  function updateSession(patch: Partial<BookingSession>): void {
    if (typeof window === "undefined") return;
    try {
      const current = getSession();
      const updated = { ...current, ...patch };
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    } catch {
      // sessionStorage unavailable — no-op
    }
  }

  function markStepComplete(step: number): void {
    if (typeof window === "undefined") return;
    const current = getSession();
    if (!current.completedSteps.includes(step)) {
      updateSession({ completedSteps: [...current.completedSteps, step] });
    }
  }

  function clearSession(): void {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // no-op
    }
  }

  return { getSession, updateSession, markStepComplete, clearSession };
}

/** The earliest booking step whose required info is still missing (4 = everything needed to confirm is present). */
export function firstIncompleteStep(s: BookingSession): 1 | 2 | 3 | 4 {
  const car = s.car;
  const hasVehicle = Boolean(car?.reg?.trim() || (car?.make && car?.model && car?.year));
  if (!car?.postcode?.trim() || !hasVehicle) return 1;
  if (!s.selectedWork?.length) return 2;
  const d = s.details;
  if (
    !d?.firstName?.trim() ||
    !d.lastName?.trim() ||
    !isValidEmail(d.email ?? "") ||
    !isValidUkPhone(d.phone ?? "") ||
    !d.availability
  ) {
    return 3;
  }
  return 4;
}

/**
 * Sends the customer back to the first step with missing required info, so a
 * direct link (or a lost session) can't skip ahead past steps that haven't
 * been completed. Pass `enabled: false` on a fresh-entry path that fills the
 * session itself.
 */
export function useBookingStepGuard(step: 2 | 3 | 4, enabled: boolean = true): void {
  const router = useRouter();
  const { getSession } = useBookingSession();

  useEffect(() => {
    if (!enabled) return;
    const s = getSession();
    if (s.confirmed) return; // the lock guard sends confirmed bookings to the confirmation page
    const first = firstIncompleteStep(s);
    if (first < step) router.replace(`/booking/step-${first}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}

/**
 * Redirects away from an editable booking step once the booking has been confirmed,
 * so a customer can't use the back button (or a direct link) to reopen and change
 * a booking that's already gone through. Pass `enabled: false` on a page's
 * "start a brand new booking" entry path, so that fresh entry can reset the lock
 * itself instead of being redirected away before it gets the chance to.
 */
export function useBookingLockGuard(enabled: boolean = true): void {
  const router = useRouter();
  const { getSession } = useBookingSession();

  useEffect(() => {
    if (enabled && getSession().confirmed) {
      router.replace("/booking/confirmation");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}
