import { NextResponse } from "next/server";
import {
  upsertMechanicContact,
  sendMechanicAcknowledgementEmail,
  // sendInternalAlertEmail,
  // escapeHtml,
} from "@/lib/brevo/client";
import { isValidUkPhone, UK_PHONE_ERROR } from "@/lib/phone";

type MechanicApplicationBody = {
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export async function POST(request: Request) {
  let body: MechanicApplicationBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "Invalid form data." }, { status: 400 });
  }

  const role = body.role?.trim();
  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const email = body.email?.trim();

  if (!role || !firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "missing_details", message: "Role, name and email are required." },
      { status: 400 },
    );
  }

  if (body.phone?.trim() && !isValidUkPhone(body.phone)) {
    return NextResponse.json({ error: "invalid_phone", message: UK_PHONE_ERROR }, { status: 400 });
  }

  const contact = { email, firstName, lastName, phone: body.phone?.trim() || undefined };
  const summary = { role };

  // Same independence rule as the booking flow - a Brevo hiccup in any one of
  // these must never block the application from going through or suppress the others.
  // Internal team alert disabled for now - re-enable once BREVO_TEAM_ALERT_EMAIL
  // and BREVO_SENDER_EMAIL are set (see sendInternalAlertEmail in @/lib/brevo/client).
  const [contactResult, emailResult] = await Promise.allSettled([
    upsertMechanicContact(contact, summary),
    sendMechanicAcknowledgementEmail(contact, summary),
    // sendInternalAlertEmail(
    //   `New mechanic application: ${firstName} ${lastName}`,
    //   `<p>New mechanic application received.</p>
    //    <ul>
    //      <li><strong>Applying as:</strong> ${escapeHtml(role)}</li>
    //      <li><strong>Name:</strong> ${escapeHtml(`${firstName} ${lastName}`)}</li>
    //      <li><strong>Email:</strong> ${escapeHtml(email)}</li>
    //      <li><strong>Phone:</strong> ${escapeHtml(contact.phone ?? "—")}</li>
    //    </ul>`,
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
