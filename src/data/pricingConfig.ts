export type VehicleType = "car" | "motorcycle" | "lgv" | "hgv" | "bus";
// DVLA-style names, used only in code comments / admin-facing copy, never shown to the customer:
// car = Cars · motorcycle = Motorcycles · lgv = Light Goods Vehicles (LGVs)
// hgv = Heavy Goods Vehicles (HGVs) · bus = Buses and Coaches

/**
 * UK mobile-mechanic labour rate. Researched range: £40-£70/hr, with £50-£55/hr
 * the common middle ground outside London (Bristol is outside London). Independent
 * garages run £55-£95/hr, main dealers £130-£220/hr - shown for context only.
 * Change this single number to retune every price in the app.
 */
export const HOURLY_LABOUR_RATE = 55; // £/hour

/**
 * PLACEHOLDER - not researched, no source exists for this figure. This is a business
 * decision that needs confirming before launch. 20% is a reasonable placeholder only.
 * Change this single number to retune every price in the app.
 *
 * This is charged ON TOP of raw labour cost, collected from the customer - not
 * deducted from the mechanic's pay. Customer pays baseHours × multiplier × rate ×
 * (1 + margin); the mechanic's payout is baseHours × multiplier × rate (unaffected
 * by this number); the margin is Garage Gaffer's cut of the difference.
 */
export const PLATFORM_MARGIN_PERCENT = 20; // %

/**
 * Scales baseHours per vehicle type. Edit any value independently - each vehicle
 * type's pricing can be tuned without affecting the others.
 */
export const VEHICLE_TYPE_MULTIPLIERS: Record<VehicleType, number> = {
  car: 1.0, // reference vehicle type
  motorcycle: 0.55, // smaller components, faster fluid/parts swaps; offset by fiddly
  // fairing/tank removal on some jobs
  lgv: 1.15, // largely car-like mechanically, but bigger panels/wheels/fluid volumes
  hgv: 1.85, // different vehicle class entirely - air brakes, heavier components,
  // lifting equipment; small slice of bookings, treat as a rough placeholder
  bus: 2.0, // similar scale to HGV plus passenger systems (doors, cabin HVAC,
  // kneeling suspension); smallest, most specialist slice of all -
  // the roughest placeholder of the five, flag for real-world calibration
  // the first time a bus/coach booking actually happens
};

export function calculateServicePrice(baseHours: number, vehicleType: VehicleType = "car"): number {
  const multiplier = VEHICLE_TYPE_MULTIPLIERS[vehicleType] ?? 1.0;
  const raw = baseHours * multiplier * HOURLY_LABOUR_RATE * (1 + PLATFORM_MARGIN_PERCENT / 100);
  return Math.round(raw); // whole pounds - these are estimates, not exact invoices
}
