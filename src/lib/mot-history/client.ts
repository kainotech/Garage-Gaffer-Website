import { getAccessToken } from "./token";
import { mapMotHistoryResponseToVehicleDetails } from "./parse";
import { InvalidRegistrationError, NotFoundError, UpstreamError, type VehicleLookupResult } from "./types";

const REQUEST_TIMEOUT_MS = 8_000;

/**
 * Real-time single-registration lookup path. Only the bulk-download path
 * (/v1/trade/vehicles/bulk-download) was confirmed from public docs - this
 * path is a placeholder pending confirmation against the DVSA developer
 * portal spec. Update this one constant once confirmed.
 */
const LOOKUP_PATH = (registration: string) => `/v1/trade/vehicles/registration/${registration}`;

/**
 * Unlike the token URL/scope/client credentials (which are issued per
 * registration), the data API's host is the same fixed public endpoint for
 * every DVSA trade API user - it isn't something you're individually given.
 * This default is a best guess (not confirmed against the real spec); set
 * MOT_HISTORY_API_BASE_URL in .env.local to override it if the real one
 * turns out to differ.
 */
const DEFAULT_BASE_URL = "https://history.mot.api.gov.uk";

export async function lookupVehicleByRegistration(registration: string): Promise<VehicleLookupResult> {
  const baseUrl = process.env.MOT_HISTORY_API_BASE_URL || DEFAULT_BASE_URL;
  const apiKey = process.env.MOT_HISTORY_API_KEY;

  if (!apiKey) {
    throw new UpstreamError("MOT History API is not configured.");
  }

  const token = await getAccessToken();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${LOOKUP_PATH(registration)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-Key": apiKey,
        Accept: "application/json",
        "User-Agent": "GarageGaffer/1.0",
      },
      cache: "no-store",
      signal: controller.signal,
    });
  } catch {
    throw new UpstreamError("Could not reach the vehicle lookup service.");
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 404) {
    throw new NotFoundError();
  }

  if (response.status === 400) {
    throw new InvalidRegistrationError();
  }

  if (!response.ok) {
    console.error("MOT History API lookup failed", response.status, await safeText(response));
    throw new UpstreamError();
  }

  const raw = await response.json();
  return mapMotHistoryResponseToVehicleDetails(raw, registration);
}

async function safeText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return "";
  }
}
