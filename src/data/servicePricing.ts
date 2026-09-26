/**
 * Baseline labour hours per service, at the "car" reference vehicle type.
 * `pricingConfig.ts`'s VEHICLE_TYPE_MULTIPLIERS scale these for the other four
 * vehicle categories. Keyed by the same `${categorySlug}::${serviceName}` id
 * format already used for SelectedItem.id, so this stays independent of
 * `services.ts` (pure marketing copy) and is trivially bulk-editable on its own.
 *
 * Grounded in UK repair-time conventions (brake jobs are the calibration anchor:
 * front pads alone ~1-1.5h, pads+discs ~1.5-2.5h, full 4-corner ~2.5-4h) reasoned
 * analogously per category. Edit any value independently to retune that one price.
 */
export const SERVICE_BASE_HOURS: Record<string, number> = {
  // Servicing
  "servicing::Interim Service": 1.0,
  "servicing::Full Service": 1.8,
  "servicing::Major Service": 3.0,
  "servicing::Oil & Filter Change": 0.6,

  // Brakes (calibration anchor category)
  "brakes::Brake Pad Replacement": 1.2,
  "brakes::Brake Disc Replacement": 2.0,
  "brakes::Brake Fluid Change": 0.8,
  "brakes::Brake Caliper Repair": 1.3,
  "brakes::Handbrake Repair": 1.2,
  "brakes::Brake Master Cylinder Replacement": 1.8,
  "brakes::Brake Hose Replacement": 1.0,

  // Engine & Mechanical
  "engine-mechanical::Cambelt Replacement": 4.0,
  "engine-mechanical::Clutch Replacement": 5.0,
  "engine-mechanical::Head Gasket Repair": 8.0,
  "engine-mechanical::Turbo Repair": 4.0,
  "engine-mechanical::Water Pump Replacement": 2.5,
  "engine-mechanical::Gearbox Repair": 6.0,
  "engine-mechanical::Engine Rebuild": 20.0,
  "engine-mechanical::Flywheel Replacement": 4.5,
  "engine-mechanical::Clutch Slave Cylinder Replacement": 2.0,
  "engine-mechanical::Gear Linkage Replacement": 1.5,
  "engine-mechanical::Gearbox Oil Change": 0.8,
  "engine-mechanical::Spark Plug Replacement": 1.0,
  "engine-mechanical::Ignition Coil Replacement": 0.7,

  // Exhaust & Emissions
  "exhaust-emissions::Exhaust Repair": 2.0,
  "exhaust-emissions::DPF Cleaning": 1.5,
  "exhaust-emissions::Catalytic Converter Replacement": 1.8,
  "exhaust-emissions::Emissions Testing": 0.5,

  // Electrical & Diagnostics
  "electrical-diagnostics::Fault Code Diagnostics": 0.8,
  "electrical-diagnostics::Battery Testing & Replacement": 0.5,
  "electrical-diagnostics::Alternator Replacement": 2.0,
  "electrical-diagnostics::Starter Motor Replacement": 2.0,
  "electrical-diagnostics::Lighting Repairs": 0.8,
  "electrical-diagnostics::Warning Light Investigation": 0.8,
  "electrical-diagnostics::Electric Window Motor Replacement": 1.5,
  "electrical-diagnostics::Central Locking Repair": 1.2,
  "electrical-diagnostics::ABS Fault Diagnostic": 1.3,
  "electrical-diagnostics::Sensor Replacement": 0.7,

  // Suspension & Steering
  "suspension-steering::Shock Absorber Replacement": 1.8,
  "suspension-steering::Spring Replacement": 2.0,
  "suspension-steering::Suspension Bush Replacement": 1.5,
  "suspension-steering::Power Steering Repair": 2.5,
  "suspension-steering::Drop Links & Anti-Roll Bar": 1.0,

  // Heating & Air Conditioning
  "heating-air-conditioning::A/C Re-gas": 1.0,
  "heating-air-conditioning::A/C Leak Detection & Repair": 2.0,
  "heating-air-conditioning::Cabin Filter Replacement": 0.4,
  "heating-air-conditioning::Heater Matrix Repair": 4.0,
  "heating-air-conditioning::A/C Compressor Replacement": 2.5,
  "heating-air-conditioning::Blower Motor Replacement": 1.5,

  // Bodywork & Cosmetic
  "bodywork-cosmetic::Paintless Dent Removal": 1.5,
  "bodywork-cosmetic::Scratch Repair": 1.2,
  "bodywork-cosmetic::Bumper Repair": 2.5,
  "bodywork-cosmetic::Panel Respray": 5.0,
  "bodywork-cosmetic::Windscreen Repair": 1.0,

  // EV & Hybrid
  "ev-hybrid::EV Servicing": 1.8,
  "ev-hybrid::Hybrid Servicing": 2.2,
  "ev-hybrid::EV Battery Diagnostics": 1.2,
  "ev-hybrid::Charging Port Inspection": 0.8,

  // Cooling System
  "cooling-system::Radiator Repair & Replacement": 2.0,
  "cooling-system::Thermostat Replacement": 1.2,
  "cooling-system::Cooling Fan Repair": 1.2,
  "cooling-system::Coolant Flush & Replacement": 1.0,
  "cooling-system::Radiator Hose Replacement": 1.0,

  // Fuel System
  "fuel-system::Fuel Pump Replacement": 2.5,
  "fuel-system::Fuel Injector Cleaning & Replacement": 1.8,
  "fuel-system::Fuel Filter Replacement": 0.7,
};
