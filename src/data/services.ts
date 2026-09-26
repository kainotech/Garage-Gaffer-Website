export interface ServiceItem {
  name: string;
  description: string;
}

export interface ServiceCategory {
  slug: string;
  name: string;
  services: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "servicing",
    name: "Servicing",
    services: [
      {
        name: "Interim Service",
        description:
          "Essential 6-month check including oil and filter change, fluid top-ups, tyre and brake inspection.",
      },
      {
        name: "Full Service",
        description:
          "Comprehensive annual service covering all major components, fluids, filters and a detailed inspection report.",
      },
      {
        name: "Major Service",
        description:
          "Our most thorough service including all filters, spark plugs, full fluid replacement and extended checks.",
      },
      {
        name: "Oil & Filter Change",
        description:
          "Quick standalone oil and filter change using manufacturer-recommended oil grade.",
      },
    ],
  },
  {
    slug: "brakes",
    name: "Brakes",
    services: [
      {
        name: "Brake Pad Replacement",
        description:
          "Front or rear brake pad replacement using quality pads. Price per axle.",
      },
      {
        name: "Brake Disc Replacement",
        description:
          "Brake disc and pad replacement for worn or warped discs. Price per axle.",
      },
      {
        name: "Brake Fluid Change",
        description:
          "Complete brake fluid replacement, recommended every 2 years for optimal braking performance.",
      },
      {
        name: "Brake Caliper Repair",
        description:
          "Seized or leaking brake caliper repair or replacement to restore full braking power.",
      },
      {
        name: "Handbrake Repair",
        description:
          "Handbrake cable adjustment or replacement, including electronic handbrake diagnostics.",
      },
      {
        name: "Brake Master Cylinder Replacement",
        description:
          "Brake master cylinder replacement to restore proper hydraulic braking pressure.",
      },
      {
        name: "Brake Hose Replacement",
        description:
          "Flexible brake hose replacement to fix leaks and maintain safe braking performance.",
      },
    ],
  },
  {
    slug: "engine-mechanical",
    name: "Engine & Mechanical",
    services: [
      {
        name: "Cambelt Replacement",
        description:
          "Timing belt replacement to prevent catastrophic engine damage. Includes tensioner and water pump check.",
      },
      {
        name: "Clutch Replacement",
        description:
          "Complete clutch kit replacement including release bearing. Dual-mass flywheel inspection included.",
      },
      {
        name: "Head Gasket Repair",
        description:
          "Head gasket replacement including cylinder head inspection and pressure testing.",
      },
      {
        name: "Turbo Repair",
        description:
          "Turbocharger diagnosis, repair or replacement for diesel and petrol turbo engines.",
      },
      {
        name: "Water Pump Replacement",
        description:
          "Water pump replacement to prevent overheating. Often done alongside cambelt for efficiency.",
      },
      {
        name: "Gearbox Repair",
        description:
          "Manual and automatic gearbox diagnostics, repair and fluid changes.",
      },
      {
        name: "Engine Rebuild",
        description:
          "Major engine overhaul and rebuild for serious engine damage or wear.",
      },
      {
        name: "Flywheel Replacement",
        description:
          "Dual-mass or solid flywheel replacement, often done alongside clutch for efficiency.",
      },
      {
        name: "Clutch Slave Cylinder Replacement",
        description:
          "Hydraulic clutch slave cylinder replacement to restore clutch pedal operation.",
      },
      {
        name: "Gear Linkage Replacement",
        description:
          "Gear linkage cable or rod replacement to fix stiff or imprecise gear changes.",
      },
      {
        name: "Gearbox Oil Change",
        description:
          "Manual or automatic gearbox fluid change to ensure smooth shifting and extend gearbox life.",
      },
      {
        name: "Spark Plug Replacement",
        description:
          "Standalone spark plug replacement to restore smooth running, fuel efficiency and reliable starting.",
      },
      {
        name: "Ignition Coil Replacement",
        description:
          "Ignition coil replacement to fix misfires, rough idling and poor engine performance.",
      },
    ],
  },
  {
    slug: "exhaust-emissions",
    name: "Exhaust & Emissions",
    services: [
      {
        name: "Exhaust Repair",
        description:
          "Exhaust system repair or partial replacement including silencer, centre section and downpipe.",
      },
      {
        name: "DPF Cleaning",
        description:
          "Diesel particulate filter cleaning and forced regeneration to restore performance and pass MOT.",
      },
      {
        name: "Catalytic Converter Replacement",
        description:
          "Catalytic converter supply and fitting to restore emissions compliance.",
      },
      {
        name: "Emissions Testing",
        description:
          "Pre-MOT emissions check for petrol and diesel vehicles to identify issues before your test.",
      },
    ],
  },
  {
    slug: "electrical-diagnostics",
    name: "Electrical & Diagnostics",
    services: [
      {
        name: "Fault Code Diagnostics",
        description:
          "Advanced OBD-II and manufacturer-level diagnostic scan to identify fault codes and issues.",
      },
      {
        name: "Battery Testing & Replacement",
        description:
          "Battery health check and replacement with quality batteries suited to your vehicle.",
      },
      {
        name: "Alternator Replacement",
        description:
          "Alternator testing, repair and replacement to keep your electrical system charging properly.",
      },
      {
        name: "Starter Motor Replacement",
        description:
          "Starter motor diagnosis and replacement for vehicles that won't crank or start.",
      },
      {
        name: "Lighting Repairs",
        description:
          "Headlight bulb replacement, wiring repairs, and LED/HID upgrades.",
      },
      {
        name: "Warning Light Investigation",
        description:
          "Dashboard warning light diagnosis to identify the underlying issue and recommended repairs.",
      },
      {
        name: "Electric Window Motor Replacement",
        description:
          "Electric window motor or regulator replacement for windows that won't open or close.",
      },
      {
        name: "Central Locking Repair",
        description:
          "Door lock actuator, key fob and central locking system diagnosis and repair.",
      },
      {
        name: "ABS Fault Diagnostic",
        description:
          "Specialist ABS system diagnosis including sensor testing, pump checks and fault code analysis.",
      },
      {
        name: "Sensor Replacement",
        description:
          "Replacement of O2, MAP, MAF, camshaft or crankshaft position sensors to clear faults and restore performance.",
      },
    ],
  },
  {
    slug: "suspension-steering",
    name: "Suspension & Steering",
    services: [
      {
        name: "Shock Absorber Replacement",
        description:
          "Front or rear shock absorber replacement for a smoother, safer ride. Price per pair.",
      },
      {
        name: "Spring Replacement",
        description:
          "Coil spring replacement for broken or sagging springs. Price per pair.",
      },
      {
        name: "Suspension Bush Replacement",
        description:
          "Worn suspension bush replacement to eliminate knocking and improve handling.",
      },
      {
        name: "Power Steering Repair",
        description:
          "Power steering pump, rack and fluid service for electric and hydraulic systems.",
      },
      {
        name: "Drop Links & Anti-Roll Bar",
        description:
          "Anti-roll bar link and bush replacement to reduce body roll and eliminate clunking noises.",
      },
    ],
  },
  {
    slug: "heating-air-conditioning",
    name: "Heating & Air Conditioning",
    services: [
      {
        name: "A/C Re-gas",
        description:
          "Full air conditioning re-gas using R134a or R1234yf refrigerant with UV dye leak check.",
      },
      {
        name: "A/C Leak Detection & Repair",
        description:
          "Air conditioning leak detection using UV dye and electronic sniffer, followed by repair.",
      },
      {
        name: "Cabin Filter Replacement",
        description:
          "Pollen and cabin filter replacement for cleaner air inside your vehicle.",
      },
      {
        name: "Heater Matrix Repair",
        description:
          "Heater matrix replacement to restore cabin heating and fix coolant leaks inside the dashboard.",
      },
      {
        name: "A/C Compressor Replacement",
        description:
          "Air conditioning compressor replacement to restore cold air output.",
      },
      {
        name: "Blower Motor Replacement",
        description:
          "Heater blower motor replacement for when the fan stops working or makes excessive noise.",
      },
    ],
  },
  {
    slug: "bodywork-cosmetic",
    name: "Bodywork & Cosmetic",
    services: [
      {
        name: "Paintless Dent Removal",
        description:
          "Professional paintless dent removal for minor dents and dings without affecting your paintwork.",
      },
      {
        name: "Scratch Repair",
        description:
          "Paint scratch repair and touch-up to restore your vehicle's appearance.",
      },
      {
        name: "Bumper Repair",
        description:
          "Plastic bumper crack repair, scuff removal and respray to match your vehicle colour.",
      },
      {
        name: "Panel Respray",
        description:
          "Professional panel painting and respray with colour-matched paint for a seamless finish.",
      },
      {
        name: "Windscreen Repair",
        description:
          "Stone chip repair or full windscreen replacement. May be covered by your insurance.",
      },
    ],
  },
  {
    slug: "ev-hybrid",
    name: "EV & Hybrid",
    services: [
      {
        name: "EV Servicing",
        description:
          "Specialist electric vehicle servicing including brake, suspension, cooling and software checks.",
      },
      {
        name: "Hybrid Servicing",
        description:
          "Combined petrol/diesel and electric system servicing for hybrid vehicles.",
      },
      {
        name: "EV Battery Diagnostics",
        description:
          "High-voltage battery health check and state-of-health report for electric vehicles.",
      },
      {
        name: "Charging Port Inspection",
        description:
          "Charging port and cable inspection, cleaning and repair for reliable charging.",
      },
    ],
  },
  {
    slug: "cooling-system",
    name: "Cooling System",
    services: [
      {
        name: "Radiator Repair & Replacement",
        description:
          "Radiator repair or replacement to fix leaks and prevent engine overheating.",
      },
      {
        name: "Thermostat Replacement",
        description:
          "Engine thermostat replacement to restore proper operating temperature and heater function.",
      },
      {
        name: "Cooling Fan Repair",
        description:
          "Radiator fan motor or relay repair to prevent overheating in traffic and at low speeds.",
      },
      {
        name: "Coolant Flush & Replacement",
        description:
          "Full cooling system drain, flush and refill with manufacturer-approved antifreeze/coolant.",
      },
      {
        name: "Radiator Hose Replacement",
        description:
          "Upper or lower radiator hose replacement to fix coolant leaks and prevent overheating.",
      },
    ],
  },
  {
    slug: "fuel-system",
    name: "Fuel System",
    services: [
      {
        name: "Fuel Pump Replacement",
        description:
          "In-tank or external fuel pump replacement to restore reliable fuel delivery.",
      },
      {
        name: "Fuel Injector Cleaning & Replacement",
        description:
          "Professional fuel injector cleaning or replacement to restore fuel efficiency and smooth running.",
      },
      {
        name: "Fuel Filter Replacement",
        description:
          "Petrol or diesel fuel filter replacement to prevent contaminants reaching the engine.",
      },
    ],
  },
];

export const TOTAL_SERVICE_COUNT = SERVICE_CATEGORIES.reduce(
  (sum, category) => sum + category.services.length,
  0,
);
