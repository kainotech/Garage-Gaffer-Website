/** Generates a customer-facing booking reference, e.g. "GG-2026-48213". */
export function generateBookingRef(): string {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `GG-${new Date().getFullYear()}-${n}`;
}
