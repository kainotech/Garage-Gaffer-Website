import { NextResponse } from "next/server";
import {
  upsertSupportContact,
  sendSupportAcknowledgementEmail,
  // sendInternalAlertEmail,
  // escapeHtml,
} from "@/lib/brevo/client";
import { isValidUkPhone, UK_PHONE_ERROR } from "@/lib/phone";
import { isValidEmail, INVALID_EMAIL_ERROR } from "@/lib/validation";

type SupportContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  bookingRef?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: SupportContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "Invalid form data." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const topic = body.topic?.trim();
  const message = body.message?.trim();

  if (!name || !email || !topic || !message) {
    return NextResponse.json(
      { error: "missing_details", message: "Name, email, topic and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email", message: INVALID_EMAIL_ERROR }, { status: 400 });
  }

  if (body.phone?.trim() && !isValidUkPhone(body.phone)) {
    return NextResponse.json({ error: "invalid_phone", message: UK_PHONE_ERROR }, { status: 400 });
  }

  const contact = { email, name, phone: body.phone?.trim() || undefined };
  const summary = { topic, message, bookingRef: body.bookingRef?.trim() || undefined };

  // Same independence rule as the booking flow - a Brevo hiccup in any one of
  // these must never block the enquiry from going through or suppress the others.
  // Internal team alert disabled for now - re-enable once BREVO_TEAM_ALERT_EMAIL
  // and BREVO_SENDER_EMAIL are set (see sendInternalAlertEmail in @/lib/brevo/client).
  const [contactResult, emailResult] = await Promise.allSettled([
    upsertSupportContact(contact, summary),
    sendSupportAcknowledgementEmail(contact, summary),
    // sendInternalAlertEmail(
    //   `New support enquiry: ${topic}`,
    //   `<p>New support enquiry received.</p>
    //    <ul>
    //      <li><strong>Name:</strong> ${escapeHtml(name)}</li>
    //      <li><strong>Email:</strong> ${escapeHtml(email)}</li>
    //      <li><strong>Phone:</strong> ${escapeHtml(contact.phone ?? "—")}</li>
    //      <li><strong>Topic:</strong> ${escapeHtml(topic)}</li>
    //      <li><strong>Booking ref:</strong> ${escapeHtml(summary.bookingRef ?? "—")}</li>
    //    </ul>
    //    <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    // ),
  ]);

  if (contactResult.status === "rejected") {
    console.error("Brevo contact sync failed", contactResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("Brevo acknowledgement email failed", emailResult.reason);
  }

  return NextResponse.json({ received: true });
}
