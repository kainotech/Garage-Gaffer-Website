/**
 * Clean shape the rest of the app consumes. Every field is optional: any
 * field the upstream response can't be confidently mapped to (see parse.ts)
 * is left undefined, and the UI falls back to asking the customer to fill
 * it in manually rather than guessing.
 */
export interface VehicleLookupResult {
  registration: string;
  make?: string;
  model?: string;
  fuelType?: string;
  engineCapacity?: string;
  year?: string;
  colour?: string;
}

export class InvalidRegistrationError extends Error {
  constructor(message = "Please enter a valid UK registration number.") {
    super(message);
    this.name = "InvalidRegistrationError";
  }
}

export class NotFoundError extends Error {
  constructor(message = "We couldn't find a vehicle with that registration.") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UpstreamError extends Error {
  constructor(message = "We're having trouble looking up your vehicle right now.") {
    super(message);
    this.name = "UpstreamError";
  }
}
