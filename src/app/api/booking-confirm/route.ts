import { NextResponse } from "next/server";
import type { BookingSession } from "@/components/booking/useBookingSession";
import { generateBookingRef } from "@/components/booking/bookingRef";
import { formatVehicleLabel, formatWorkLabel, formatPriceLabel } from "@/components/booking/pricing";
import { formatSlotLabel } from "@/components/booking/step3/slotLabel";
import { upsertBookingContact, sendBookingConfirmationEmail } from "@/lib/brevo/client";

export async function POST(request: Request) {
  let body: Partial<BookingSession>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "Invalid booking data." }, { status: 400 });
  }

  const details = body.details;
  if (!details?.email || !details.firstName) {
    return NextResponse.json(
      { error: "missing_details", message: "Name and email are required to confirm a booking." },
      { status: 400 },
    );
  }

  const bookingRef = generateBookingRef();
  const selectedWork = body.selectedWork ?? [];
  const summary = {
    bookingRef,
    vehicleLabel: formatVehicleLabel(body.car ?? { reg: "", postcode: "" }),
    workLabel: formatWorkLabel(selectedWork),
    dateTimeLabel: details.availability ? formatSlotLabel(details.availability) : "To be confirmed",
    locationLabel: [details.address1, details.city, details.postcode].filter(Boolean).join(", "),
    priceLabel: formatPriceLabel(selectedWork),
  };

  const contact = {
    email: details.email,
    firstName: details.firstName,
    lastName: details.lastName ?? "",
    phone: details.phone,
    optIn: details.optIn ?? false,
  };

  // Brevo is a notification/CRM sync, not part of the booking itself - a
  // hiccup in either call should never stop the customer's booking from
  // going through, and a failed contact sync must never suppress the
  // confirmation email (or vice versa), so each is independent.
  const [contactResult, emailResult] = await Promise.allSettled([
    upsertBookingContact(contact, summary),
    sendBookingConfirmationEmail(contact, summary),
  ]);
  if (contactResult.status === "rejected") {
    console.error("Brevo contact sync failed", contactResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("Brevo confirmation email failed", emailResult.reason);
  }

  return NextResponse.json({ bookingRef, emailSent: emailResult.status === "fulfilled" });
}
