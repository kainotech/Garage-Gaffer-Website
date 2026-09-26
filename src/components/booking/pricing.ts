import type { SelectedItem } from "./useBookingSession";

export function formatItemPrice(item: SelectedItem): string {
  return item.price != null ? `£${item.price}` : "Custom quote";
}

export function hasCustomQuoteItems(items: SelectedItem[]): boolean {
  return items.some((item) => item.price == null);
}

export function sumFixedPrice(items: SelectedItem[]): number {
  return items.reduce((acc, item) => acc + (item.price ?? 0), 0);
}
