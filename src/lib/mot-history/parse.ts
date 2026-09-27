import type { VehicleLookupResult } from "./types";

/**
 * The only place that knows the upstream MOT History API's field names.
 *
 * Confirmed against the published OpenAPI spec (VehicleWithMotResponse /
 * NewRegVehicleResponse schemas) at
 * https://documentation.history.mot.api.gov.uk/mot-history-api/api-specification/mot_history_open_api_specification.yml
 * The response is one of those two shapes depending on whether the vehicle
 * has any MOT tests yet; only NewRegVehicleResponse has manufactureYear
 * directly, so VehicleWithMotResponse falls back to deriving it from a date.
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
    year:
      asString(data.manufactureYear) ??
      yearFromDate(asString(data.manufactureDate) ?? asString(data.registrationDate)),
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
