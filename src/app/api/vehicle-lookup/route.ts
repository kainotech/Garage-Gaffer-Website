import { NextResponse } from "next/server";
import { lookupVehicleByRegistration } from "@/lib/mot-history/client";
import { InvalidRegistrationError, NotFoundError } from "@/lib/mot-history/types";
import { getVehicleTypeFromVes } from "@/lib/ves/client";

// Matches current UK plate format (AB12CDE) with an optional space; loose
// enough to also allow older/NI formats through to the API, which is the
// real arbiter of validity.
const PLATE_FORMAT = /^[A-Z0-9]{2,7}$/;

export async function POST(request: Request) {
  let body: { registration?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_registration", message: "Please enter a valid UK registration number." },
      { status: 400 },
    );
  }

  const registration = typeof body.registration === "string"
    ? body.registration.replace(/\s+/g, "").toUpperCase()
    : "";

  if (!PLATE_FORMAT.test(registration)) {
    return NextResponse.json(
      { error: "invalid_registration", message: "Please enter a valid UK registration number." },
      { status: 400 },
    );
  }

  try {
    const vehicle = await lookupVehicleByRegistration(registration);
    const vehicleType = await getVehicleTypeFromVes(registration);
    return NextResponse.json({ vehicle: { ...vehicle, vehicleType } });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return NextResponse.json(
        {
          error: "not_found",
          message: "We couldn't find a vehicle with that registration. Please check it or enter your details manually.",
        },
        { status: 404 },
      );
    }
    if (err instanceof InvalidRegistrationError) {
      return NextResponse.json(
        { error: "invalid_registration", message: "Please enter a valid UK registration number." },
        { status: 400 },
      );
    }

    console.error("Vehicle lookup failed", err);
    return NextResponse.json(
      {
        error: "lookup_failed",
        message: "We're having trouble looking up your vehicle right now. Please enter your details manually.",
      },
      { status: 502 },
    );
  }
}
