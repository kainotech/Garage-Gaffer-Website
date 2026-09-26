"use client";

import type { VehicleType } from "@/data/pricingConfig";

export type SelectedItem = {
  id: string;
  name: string;
  /** undefined means the item is custom-quoted (no fixed price) */
  price?: number;
  labourTime?: string;
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
    optIn: boolean;
    address1: string;
    address2?: string;
    city: string;
    postcode: string;
    phone: string;
    availability: string[];
    drivable: boolean;
    instructions?: string;
  };
  completedSteps: number[];
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
    optIn: true,
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    phone: "",
    availability: [],
    drivable: true,
    instructions: "",
  },
  completedSteps: [],
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
