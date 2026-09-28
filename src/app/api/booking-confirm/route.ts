import { NextResponse } from "next/server";
import type { BookingSession } from "@/components/booking/useBookingSession";
import { generateBookingRef } from "@/components/booking/bookingRef";
import { formatVehicleLabel, formatWorkLabel, formatPriceLabel } from "@/components/booking/pricing";
import { formatSlotLabel } from "@/components/booking/step3/slotLabel";
import { upsertBookingContact, sendBookingConfirmationEmail /*, sendInternalAlertEmail, escapeHtml */ } from "@/lib/brevo/client";

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
  };

  // Brevo is a notification/CRM sync, not part of the booking itself - a
  // hiccup in any of these calls should never stop the customer's booking
  // from going through, and a failure in one must never suppress the others,
  // so each is independent.
  // Internal team alert disabled for now - re-enable once BREVO_TEAM_ALERT_EMAIL
  // and BREVO_SENDER_EMAIL are set (see sendInternalAlertEmail in @/lib/brevo/client).
  const [contactResult, emailResult] = await Promise.allSettled([
    upsertBookingContact(contact, summary),
    sendBookingConfirmationEmail(contact, summary),
    // sendInternalAlertEmail(
    //   `New booking: ${bookingRef}`,
    //   `<p>New booking received.</p>
    //    <ul>
    //      <li><strong>Booking ref:</strong> ${escapeHtml(bookingRef)}</li>
    //      <li><strong>Name:</strong> ${escapeHtml(`${contact.firstName} ${contact.lastName}`.trim())}</li>
    //      <li><strong>Email:</strong> ${escapeHtml(contact.email)}</li>
    //      <li><strong>Phone:</strong> ${escapeHtml(contact.phone ?? "—")}</li>
    //      <li><strong>Vehicle:</strong> ${escapeHtml(summary.vehicleLabel)}</li>
    //      <li><strong>Work:</strong> ${escapeHtml(summary.workLabel)}</li>
    //      <li><strong>Date/time:</strong> ${escapeHtml(summary.dateTimeLabel)}</li>
    //      <li><strong>Location:</strong> ${escapeHtml(summary.locationLabel)}</li>
    //      <li><strong>Price:</strong> ${escapeHtml(summary.priceLabel)}</li>
    //    </ul>`,
    // ),
  ]);
  if (contactResult.status === "rejected") {
    console.error("Brevo contact sync failed", contactResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("Brevo confirmation email failed", emailResult.reason);
  }

  return NextResponse.json({ bookingRef, emailSent: emailResult.status === "fulfilled" });
}
