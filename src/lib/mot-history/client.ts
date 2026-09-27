import { getAccessToken } from "./token";
import { mapMotHistoryResponseToVehicleDetails } from "./parse";
import { InvalidRegistrationError, NotFoundError, UpstreamError, type VehicleLookupResult } from "./types";

const REQUEST_TIMEOUT_MS = 8_000;

/**
 * Real-time single-registration lookup path. Confirmed against the published
 * OpenAPI spec (GET /v1/trade/vehicles/registration/{registration}):
 * https://documentation.history.mot.api.gov.uk/mot-history-api/api-specification/mot_history_open_api_specification.yml
 */
const LOOKUP_PATH = (registration: string) => `/v1/trade/vehicles/registration/${registration}`;

/**
 * Confirmed against the OpenAPI spec's `servers` entry (see LOOKUP_PATH
 * comment) - the same fixed public host for every DVSA trade API user, not
 * something issued per registration. Overridable via MOT_HISTORY_API_BASE_URL
 * in case DVSA ever moves it.
 *
 * Confirmed root cause of local "lookup failed" errors: this host sits
 * behind Incapsula bot-protection that 403s any request from a non-UK IP,
 * independent of our code (reproduced with a bare fetch, bypassing this
 * file entirely - the OAuth token exchange against a different host
 * succeeds fine). vercel.json pins deploys to lhr1 (London) so production
 * calls this API from a UK IP; to test the real lookup locally, route
 * outbound traffic through a UK IP (e.g. a UK VPN/proxy).
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
