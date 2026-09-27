import type { BookingSession, SelectedItem } from "./useBookingSession";

export function formatItemPrice(item: SelectedItem): string {
  return item.price != null ? `£${item.price}` : "Custom quote";
}

export function hasCustomQuoteItems(items: SelectedItem[]): boolean {
  return items.some((item) => item.price == null);
}

export function sumFixedPrice(items: SelectedItem[]): number {
  return items.reduce((acc, item) => acc + (item.price ?? 0), 0);
}

/**
 * Shared with the booking-confirmation API route (src/app/api/booking-confirm)
 * so the confirmation email and the on-screen confirmation page always agree
 * on wording.
 */
export function formatVehicleLabel(car: BookingSession["car"]): string {
  return [car.make, car.model, car.engineCapacity, car.year].filter(Boolean).join(" ") || car.reg || "Your vehicle";
}

export function formatWorkLabel(items: SelectedItem[]): string {
  if (items.length === 0) return "To be confirmed after inspection";
  return items.map((item) => item.name).join(", ");
}

export function formatPriceLabel(items: SelectedItem[]): string {
  if (items.length === 0 || hasCustomQuoteItems(items)) return "Priced after inspection";
  return `£${sumFixedPrice(items).toFixed(2)}`;
}
