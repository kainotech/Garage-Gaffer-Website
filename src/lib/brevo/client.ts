const BREVO_API_BASE_URL = "https://api.brevo.com/v3";
const REQUEST_TIMEOUT_MS = 8_000;

export class BrevoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BrevoError";
  }
}

type BookingContact = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  postcode?: string;
  drivable?: boolean;
  instructions?: string;
  vehicleReg?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleFuelType?: string;
  vehicleEngineSize?: string;
  vehicleYear?: string;
};

/** Plain-text labels shared with the confirmation page, so the email and the on-screen summary always agree. */
export type BookingEmailSummary = {
  bookingRef: string;
  vehicleLabel: string;
  workLabel: string;
  /** each selected service with its own price - rendered as the breakdown table rows in the confirmation email */
  workItems: { name: string; priceLabel: string }[];
  dateTimeLabel: string;
  locationLabel: string;
  priceLabel: string;
};

type SupportContact = {
  email: string;
  name: string;
  phone?: string;
};

export type SupportEmailSummary = {
  topic: string;
  message: string;
  bookingRef?: string;
};

type MechanicContact = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export type MechanicEmailSummary = {
  role: string;
};

/** Escapes user-supplied text before it's interpolated into the internal alert email's raw HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function brevoFetch(path: string, body: unknown): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new BrevoError("BREVO_API_KEY is not set");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${BREVO_API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new BrevoError(`Brevo ${path} responded ${response.status}: ${await response.text()}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Upserts the customer as a Brevo Contact (matched by email) into the
 * "Garage Gaffer Customers" list. Every field the booking form collects is
 * saved as a contact attribute, with their latest booking on LAST_BOOKING_*,
 * so the business can see it all against each contact without leaving Brevo.
 * Brevo silently ignores attributes that don't exist yet - a new one must be
 * created in Brevo (Contacts > Settings > Contact attributes) before it's stored.
 */
export async function upsertBookingContact(contact: BookingContact, summary: BookingEmailSummary): Promise<void> {
  const listId = process.env.BREVO_CUSTOMERS_LIST_ID;

  await brevoFetch("/contacts", {
    email: contact.email,
    updateEnabled: true,
    listIds: listId ? [Number(listId)] : undefined,
    attributes: {
      FIRSTNAME: contact.firstName,
      LASTNAME: contact.lastName,
      PHONE: contact.phone,
      ADDRESS_LINE_1: contact.address1,
      ADDRESS_LINE_2: contact.address2,
      CITY: contact.city,
      POSTCODE: contact.postcode,
      VEHICLE_REG: contact.vehicleReg,
      VEHICLE_MAKE: contact.vehicleMake,
      VEHICLE_MODEL: contact.vehicleModel,
      VEHICLE_FUEL_TYPE: contact.vehicleFuelType,
      VEHICLE_ENGINE_SIZE: contact.vehicleEngineSize,
      VEHICLE_YEAR: contact.vehicleYear,
      VEHICLE_DRIVABLE: contact.drivable === undefined ? undefined : contact.drivable ? "Yes" : "No",
      SPECIAL_INSTRUCTIONS: contact.instructions,
      LAST_BOOKING_REF: summary.bookingRef,
      LAST_BOOKING_VEHICLE: summary.vehicleLabel,
      LAST_BOOKING_SERVICE: summary.workLabel,
      LAST_BOOKING_DATE: summary.dateTimeLabel,
      LAST_BOOKING_PRICE: summary.priceLabel,
    },
  });
}

/**
 * The itemised "Work booked / Labour price" rows for the confirmation email's
 * breakdown table. Built here (not with a loop in the Brevo template) so it
 * renders the same whichever way the template is edited; the table's header,
 * total row and styling live in the template.
 */
function buildWorkRows(summary: BookingEmailSummary): string {
  const cell = "padding:12px 16px; border-bottom:1px solid #ECEEED; font-size:14px; color:#1A1E1D; vertical-align:top;";
  const items = summary.workItems.length
    ? summary.workItems
    : [{ name: summary.workLabel, priceLabel: "Quoted after inspection" }];
  return items
    .map(
      (item) =>
        `<tr><td style="${cell}">${escapeHtml(item.name)}</td>` +
        `<td style="${cell} text-align:right; white-space:nowrap;">${escapeHtml(item.priceLabel)}</td></tr>`,
    )
    .join("");
}

/**
 * Sends the booking confirmation via the "Garage Gaffer - Booking
 * Confirmation" transactional template (BREVO_CONFIRMATION_TEMPLATE_ID).
 * Edit its wording or design any time in Brevo under Campaigns > Templates -
 * no code change needed, since the content lives there, not here.
 */
export async function sendBookingConfirmationEmail(contact: BookingContact, summary: BookingEmailSummary): Promise<void> {
  const templateId = process.env.BREVO_CONFIRMATION_TEMPLATE_ID;
  if (!templateId) throw new BrevoError("BREVO_CONFIRMATION_TEMPLATE_ID is not set");

  await brevoFetch("/smtp/email", {
    to: [{ email: contact.email, name: `${contact.firstName} ${contact.lastName}`.trim() }],
    templateId: Number(templateId),
    params: {
      FIRSTNAME: contact.firstName,
      BOOKING_REF: summary.bookingRef,
      VEHICLE_LABEL: summary.vehicleLabel,
      // Escaped because these are free-text fields substituted into the
      // template's raw HTML - Brevo does not HTML-escape params itself.
      VEHICLE_REG: escapeHtml(contact.vehicleReg || "Not provided"),
      // WORK_LABEL is the older single-line version, kept so the live template keeps
      // working until it's switched over to the WORK_ROWS breakdown table.
      WORK_LABEL: summary.workLabel,
      WORK_ROWS: buildWorkRows(summary),
      DATE_TIME_LABEL: summary.dateTimeLabel,
      LOCATION_LABEL: summary.locationLabel,
      PRICE_LABEL: summary.priceLabel,
    },
  });
}

/**
 * Upserts the enquirer as a Brevo Contact (matched by email) into the
 * support enquiries list, stamping their latest enquiry onto custom
 * attributes so the business can see enquiry history against each contact.
 */
export async function upsertSupportContact(contact: SupportContact, summary: SupportEmailSummary): Promise<void> {
  const listId = process.env.BREVO_SUPPORT_LIST_ID;
  const [firstName, ...rest] = contact.name.trim().split(/\s+/);

  await brevoFetch("/contacts", {
    email: contact.email,
    updateEnabled: true,
    listIds: listId ? [Number(listId)] : undefined,
    attributes: {
      FIRSTNAME: firstName,
      LASTNAME: rest.join(" "),
      PHONE: contact.phone,
      LAST_ENQUIRY_TOPIC: summary.topic,
      LAST_ENQUIRY_MESSAGE: summary.message,
      LAST_ENQUIRY_BOOKING_REF: summary.bookingRef ?? "",
    },
  });
}

/**
 * Sends the support enquiry acknowledgement via the "Garage Gaffer - Support
 * Enquiry Received" transactional template (BREVO_SUPPORT_TEMPLATE_ID).
 * Content lives in Brevo, not here - same pattern as the booking confirmation.
 */
export async function sendSupportAcknowledgementEmail(contact: SupportContact, summary: SupportEmailSummary): Promise<void> {
  const templateId = process.env.BREVO_SUPPORT_TEMPLATE_ID;
  if (!templateId) throw new BrevoError("BREVO_SUPPORT_TEMPLATE_ID is not set");

  await brevoFetch("/smtp/email", {
    to: [{ email: contact.email, name: contact.name }],
    templateId: Number(templateId),
    params: {
      // Escaped because these are free-text fields substituted into the
      // template's raw HTML - Brevo does not HTML-escape params itself.
      NAME: escapeHtml(contact.name),
      TOPIC: escapeHtml(summary.topic),
      MESSAGE: escapeHtml(summary.message).replace(/\n/g, "<br/>"),
      BOOKING_REF: summary.bookingRef ? escapeHtml(summary.bookingRef) : "",
    },
  });
}

/**
 * Upserts the applicant as a Brevo Contact (matched by email) into the
 * mechanic applications list, stamping their applicant role onto a custom
 * attribute so the business can see it against each contact.
 */
export async function upsertMechanicContact(contact: MechanicContact, summary: MechanicEmailSummary): Promise<void> {
  const listId = process.env.BREVO_MECHANIC_LIST_ID;

  await brevoFetch("/contacts", {
    email: contact.email,
    updateEnabled: true,
    listIds: listId ? [Number(listId)] : undefined,
    attributes: {
      FIRSTNAME: contact.firstName,
      LASTNAME: contact.lastName,
      PHONE: contact.phone,
      APPLICANT_ROLE: summary.role,
    },
  });
}

/**
 * Sends the mechanic application acknowledgement via the "Garage Gaffer -
 * Mechanic Application Received" transactional template
 * (BREVO_MECHANIC_TEMPLATE_ID). Content lives in Brevo, not here.
 */
export async function sendMechanicAcknowledgementEmail(contact: MechanicContact, summary: MechanicEmailSummary): Promise<void> {
  const templateId = process.env.BREVO_MECHANIC_TEMPLATE_ID;
  if (!templateId) throw new BrevoError("BREVO_MECHANIC_TEMPLATE_ID is not set");

  await brevoFetch("/smtp/email", {
    to: [{ email: contact.email, name: `${contact.firstName} ${contact.lastName}`.trim() }],
    templateId: Number(templateId),
    params: {
      FIRSTNAME: escapeHtml(contact.firstName),
      APPLICANT_ROLE: escapeHtml(summary.role),
    },
  });
}

/**
 * Sends a plain internal notification to the team inbox (BREVO_TEAM_ALERT_EMAIL).
 * Used for every form on the site (bookings, support, mechanic applications) so
 * staff don't have to rely on checking Brevo's contact list for new activity.
 * Unlike the customer-facing emails, this has no Brevo template - callers must
 * escape any user-supplied text themselves (see escapeHtml) before building htmlContent.
 */
export async function sendInternalAlertEmail(subject: string, htmlContent: string): Promise<void> {
  const toEmail = process.env.BREVO_TEAM_ALERT_EMAIL;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!toEmail) throw new BrevoError("BREVO_TEAM_ALERT_EMAIL is not set");
  if (!senderEmail) throw new BrevoError("BREVO_SENDER_EMAIL is not set");

  await brevoFetch("/smtp/email", {
    to: [{ email: toEmail }],
    sender: { name: "Garage Gaffer Website", email: senderEmail },
    subject,
    htmlContent,
  });
}
