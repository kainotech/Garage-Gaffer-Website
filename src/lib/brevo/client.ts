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
  optIn: boolean;
};

/** Plain-text labels shared with the confirmation page, so the email and the on-screen summary always agree. */
export type BookingEmailSummary = {
  bookingRef: string;
  vehicleLabel: string;
  workLabel: string;
  dateTimeLabel: string;
  locationLabel: string;
  priceLabel: string;
};

/**
 * Brevo's SMS attribute requires international format, but the booking form
 * collects UK numbers the normal local way (e.g. "07700 900123") with no
 * format enforcement - convert that to E.164 so real customer numbers don't
 * get rejected by Brevo's validator.
 */
function normalizePhoneForBrevo(phone?: string): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/[^\d+]/g, "");
  if (!digits) return undefined;
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return `+44${digits.slice(1)}`;
  return `+44${digits}`;
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
 * "Garage Gaffer Customers" list, stamping their latest booking onto custom
 * attributes (LAST_BOOKING_*) so the business can see booking history
 * against each contact without leaving Brevo.
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
      SMS: normalizePhoneForBrevo(contact.phone),
      OPT_IN: contact.optIn,
      LAST_BOOKING_REF: summary.bookingRef,
      LAST_BOOKING_VEHICLE: summary.vehicleLabel,
      LAST_BOOKING_SERVICE: summary.workLabel,
      LAST_BOOKING_DATE: summary.dateTimeLabel,
      LAST_BOOKING_PRICE: summary.priceLabel,
    },
  });
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
      WORK_LABEL: summary.workLabel,
      DATE_TIME_LABEL: summary.dateTimeLabel,
      LOCATION_LABEL: summary.locationLabel,
      PRICE_LABEL: summary.priceLabel,
    },
  });
}
