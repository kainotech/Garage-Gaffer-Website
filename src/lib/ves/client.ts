import type { VehicleType } from "@/data/pricingConfig";

const REQUEST_TIMEOUT_MS = 5_000;

/**
 * Confirmed against the published VES OpenAPI spec: single API key in a
 * header, POST body with registrationNumber - no OAuth2 involved, unlike
 * the MOT History API.
 */
const DEFAULT_BASE_URL = "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";

/**
 * VES's `typeApproval` field is the EU/GB whole-vehicle type-approval
 * category, confirmed against the spec: M1 = car, N1 = LGV, N2/N3 = HGV,
 * M2/M3 = bus/coach, L1-L7 = motorcycle/moped/quad. Matched by prefix since
 * DVLA sometimes appends a sub-category letter (e.g. "M1G").
 */
function mapTypeApprovalToVehicleType(typeApproval: unknown): VehicleType | undefined {
  if (typeof typeApproval !== "string") return undefined;
  const code = typeApproval.toUpperCase();

  if (code.startsWith("M1")) return "car";
  if (code.startsWith("N1")) return "lgv";
  if (code.startsWith("N2") || code.startsWith("N3")) return "hgv";
  if (code.startsWith("M2") || code.startsWith("M3")) return "bus";
  if (code.startsWith("L")) return "motorcycle";
  return undefined;
}

/**
 * Best-effort vehicle-category lookup via DVLA's Vehicle Enquiry Service.
 * MOT History stays the primary source for make/model/fuel/engine/year -
 * this is called alongside it purely to get an authoritative category
 * instead of guessing from the make+model table.
 *
 * Deliberately never throws: a missing key, network failure, unknown
 * registration, or an unrecognised typeApproval value should never break
 * the plate-lookup flow - it just means the caller falls back to the
 * make/model table instead.
 */
export async function getVehicleTypeFromVes(registration: string): Promise<VehicleType | undefined> {
  const apiKey = process.env.VES_API_KEY;
  if (!apiKey) return undefined;

  const baseUrl = process.env.VES_API_BASE_URL || DEFAULT_BASE_URL;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ registrationNumber: registration }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) return undefined;

    const data = await response.json();
    return mapTypeApprovalToVehicleType(data?.typeApproval);
  } catch {
    return undefined;
  } finally {
    clearTimeout(timeout);
  }
}
