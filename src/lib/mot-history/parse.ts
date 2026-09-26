import type { VehicleLookupResult } from "./types";

/**
 * The only place that knows the upstream MOT History API's field names.
 *
 * TODO: confirm exact field names once a real sample response is available
 * from the DVSA developer portal - the public docs did not expose the full
 * schema for the real-time single-registration lookup. This is written
 * against the commonly-documented shape of the DVSA "MOT tests by
 * registration" response; verify make/model/fuelType/engineCapacity/colour
 * field names against a real response before relying on this in production.
 */
export function mapMotHistoryResponseToVehicleDetails(
  raw: unknown,
  registration: string,
): VehicleLookupResult {
  const data = (raw ?? {}) as Record<string, unknown>;

  return {
    registration,
    make: asString(data.make),
    model: asString(data.model),
    fuelType: asString(data.fuelType),
    engineCapacity: asString(data.engineSize),
    year: yearFromDate(asString(data.manufactureDate) ?? asString(data.registrationDate)),
    colour: asString(data.primaryColour),
  };
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function yearFromDate(dateStr: string | undefined): string | undefined {
  if (!dateStr) return undefined;
  const match = dateStr.match(/^(\d{4})/);
  return match ? match[1] : undefined;
}
