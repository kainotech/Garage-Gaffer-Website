/** Turns a dateSlotKey ("YYYY-MM-DD_HH:MM") back into a readable label, e.g. "Tue, 14 Oct, 09:00–09:30". */
export function formatSlotLabel(key: string): string {
  const [datePart, timePart] = key.split("_");
  if (!datePart || !timePart) return key;
  const date = new Date(`${datePart}T00:00:00`);
  const [h, m] = timePart.split(":").map(Number);
  const endMins = h * 60 + m + 30;
  const endLabel = `${String(Math.floor(endMins / 60)).padStart(2, "0")}:${String(endMins % 60).padStart(2, "0")}`;
  const dateLabel = date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  return `${dateLabel}, ${timePart}–${endLabel}`;
}
