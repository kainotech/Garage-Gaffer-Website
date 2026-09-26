import type { VehicleType } from "./pricingConfig";

/**
 * One combined, alphabetically-sorted make list spanning all five vehicle
 * categories. Some makes span more than one category (e.g. Ford makes both
 * cars and vans, Honda makes both cars and motorcycles) - the model the
 * customer picks is what disambiguates the category, via
 * VEHICLE_TYPE_BY_MAKE_MODEL below. This mirrors how the original car-only
 * MODELS_BY_MAKE list already mixed body styles under one make (Ford's list
 * had "Focus" alongside "Transit" and "Ranger").
 */
export const MAKES = [
  "Alexander Dennis",
  "Audi",
  "BMW",
  "Citroën",
  "DAF",
  "Ducati",
  "Ford",
  "Harley-Davidson",
  "Honda",
  "Hyundai",
  "Iveco",
  "Kawasaki",
  "Kia",
  "KTM",
  "MAN",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Peugeot",
  "Plaxton",
  "Renault",
  "Renault Trucks",
  "Royal Enfield",
  "Scania",
  "Seat",
  "Skoda",
  "Suzuki",
  "Toyota",
  "Triumph",
  "Van Hool",
  "Vauxhall",
  "Volkswagen",
  "Volvo",
  "Volvo Trucks",
  "Wrightbus",
  "Yamaha",
];

export const MODELS_BY_MAKE: Record<string, string[]> = {
  // Car makes (unchanged from the original car-only list)
  "Audi": ["A1", "A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "TT"],
  "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "X1", "X3", "X5", "R1250GS"],
  "Citroën": ["C1", "C3", "C3 Aircross", "C4", "C5 Aircross", "Berlingo", "Dispatch", "Relay"],
  "Ford": ["Fiesta", "Focus", "Kuga", "Mondeo", "Puma", "Ranger", "Transit", "Transit Custom", "Transit Connect"],
  "Honda": ["Civic", "CR-V", "HR-V", "Jazz", "CBR500R", "CB500F", "Africa Twin", "PCX125"],
  "Hyundai": ["i10", "i20", "i30", "Ioniq", "Kona", "Tucson"],
  "Kia": ["Ceed", "Niro", "Picanto", "Rio", "Sportage", "Stonic"],
  "Mazda": ["CX-3", "CX-5", "CX-30", "Mazda2", "Mazda3"],
  "Nissan": ["Juke", "Leaf", "Micra", "Qashqai", "X-Trail", "NV200", "NV300", "NV400"],
  "Peugeot": ["108", "208", "2008", "308", "3008", "508", "Partner", "Expert", "Boxer"],
  "Renault": ["Captur", "Clio", "Megane", "Zoe", "Trafic", "Master", "Kangoo"],
  "Seat": ["Arona", "Ateca", "Ibiza", "Leon", "Tarraco"],
  "Skoda": ["Fabia", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Superb"],
  "Toyota": ["Aygo", "Corolla", "GR Yaris", "RAV4", "Yaris", "Proace"],
  "Vauxhall": ["Astra", "Corsa", "Crossland", "Grandland", "Insignia", "Mokka", "Vivaro", "Combo", "Movano"],
  "Volkswagen": ["Golf", "Passat", "Polo", "T-Cross", "T-Roc", "Tiguan", "Up", "Transporter", "Caddy", "Crafter"],
  "Volvo": ["S60", "S90", "V40", "V60", "V90", "XC40", "XC60", "XC90", "B5LH", "B8RLE", "B11R"],
  "Mercedes-Benz": ["A-Class", "B-Class", "C-Class", "CLA", "E-Class", "GLA", "GLC", "Sprinter", "Vito", "Citan", "Actros", "Atego", "Citaro", "Tourismo"],

  // Motorcycle-only makes
  "Yamaha": ["MT-07", "MT-09", "Tenere 700", "R125"],
  "Suzuki": ["GSX-R750", "SV650", "V-Strom 650", "Burgman 125"],
  "Kawasaki": ["Ninja 400", "Z650", "Versys 650", "Vulcan S"],
  "Triumph": ["Street Triple", "Tiger 900", "Bonneville T120"],
  "Ducati": ["Monster", "Panigale V2", "Multistrada"],
  "KTM": ["Duke 390", "1290 Super Adventure", "690 Enduro"],
  "Royal Enfield": ["Classic 350", "Interceptor 650", "Himalayan"],
  "Harley-Davidson": ["Iron 883", "Street Bob", "Road King"],

  // HGV-only makes
  "DAF": ["LF", "CF", "XF"],
  "Scania": ["P-series", "R-series", "S-series", "Interlink", "Touring"],
  "MAN": ["TGL", "TGM", "TGX", "Lion's City", "Lion's Coach"],
  "Iveco": ["Daily", "Eurocargo", "Stralis"],
  "Volvo Trucks": ["FL", "FM", "FH"],
  "Renault Trucks": ["D", "T"],

  // Bus and coach-only makes
  "Alexander Dennis": ["Enviro200", "Enviro400"],
  "Wrightbus": ["StreetDeck", "GB Kite"],
  "Plaxton": ["Elite", "Panther"],
  "Van Hool": ["TX", "EX"],
};

/**
 * Silently resolves the vehicle category the moment both make and model are
 * known - the customer is never asked to pick a category directly. Keyed by
 * `${make}::${model}`. Unmapped make/model pairs default to "car" (the
 * overwhelmingly common case) wherever this table is looked up.
 */
export const VEHICLE_TYPE_BY_MAKE_MODEL: Record<string, VehicleType> = {
  // Audi - all car
  "Audi::A1": "car", "Audi::A3": "car", "Audi::A4": "car", "Audi::A5": "car",
  "Audi::A6": "car", "Audi::Q3": "car", "Audi::Q5": "car", "Audi::Q7": "car", "Audi::TT": "car",

  // BMW - cars + one motorcycle
  "BMW::1 Series": "car", "BMW::2 Series": "car", "BMW::3 Series": "car", "BMW::4 Series": "car",
  "BMW::5 Series": "car", "BMW::X1": "car", "BMW::X3": "car", "BMW::X5": "car",
  "BMW::R1250GS": "motorcycle",

  // Citroën - cars + vans
  "Citroën::C1": "car", "Citroën::C3": "car", "Citroën::C3 Aircross": "car",
  "Citroën::C4": "car", "Citroën::C5 Aircross": "car",
  "Citroën::Berlingo": "lgv", "Citroën::Dispatch": "lgv", "Citroën::Relay": "lgv",

  // Ford - cars + vans
  "Ford::Fiesta": "car", "Ford::Focus": "car", "Ford::Kuga": "car", "Ford::Mondeo": "car", "Ford::Puma": "car",
  "Ford::Ranger": "lgv", "Ford::Transit": "lgv", "Ford::Transit Custom": "lgv", "Ford::Transit Connect": "lgv",

  // Honda - cars + motorcycles
  "Honda::Civic": "car", "Honda::CR-V": "car", "Honda::HR-V": "car", "Honda::Jazz": "car",
  "Honda::CBR500R": "motorcycle", "Honda::CB500F": "motorcycle",
  "Honda::Africa Twin": "motorcycle", "Honda::PCX125": "motorcycle",

  // Hyundai, Kia, Mazda - all car
  "Hyundai::i10": "car", "Hyundai::i20": "car", "Hyundai::i30": "car",
  "Hyundai::Ioniq": "car", "Hyundai::Kona": "car", "Hyundai::Tucson": "car",
  "Kia::Ceed": "car", "Kia::Niro": "car", "Kia::Picanto": "car",
  "Kia::Rio": "car", "Kia::Sportage": "car", "Kia::Stonic": "car",
  "Mazda::CX-3": "car", "Mazda::CX-5": "car", "Mazda::CX-30": "car", "Mazda::Mazda2": "car", "Mazda::Mazda3": "car",

  // Nissan - cars + vans
  "Nissan::Juke": "car", "Nissan::Leaf": "car", "Nissan::Micra": "car", "Nissan::Qashqai": "car", "Nissan::X-Trail": "car",
  "Nissan::NV200": "lgv", "Nissan::NV300": "lgv", "Nissan::NV400": "lgv",

  // Peugeot - cars + vans
  "Peugeot::108": "car", "Peugeot::208": "car", "Peugeot::2008": "car",
  "Peugeot::308": "car", "Peugeot::3008": "car", "Peugeot::508": "car",
  "Peugeot::Partner": "lgv", "Peugeot::Expert": "lgv", "Peugeot::Boxer": "lgv",

  // Renault - cars + vans
  "Renault::Captur": "car", "Renault::Clio": "car", "Renault::Megane": "car", "Renault::Zoe": "car",
  "Renault::Trafic": "lgv", "Renault::Master": "lgv", "Renault::Kangoo": "lgv",

  // Seat, Skoda - all car
  "Seat::Arona": "car", "Seat::Ateca": "car", "Seat::Ibiza": "car", "Seat::Leon": "car", "Seat::Tarraco": "car",
  "Skoda::Fabia": "car", "Skoda::Kamiq": "car", "Skoda::Karoq": "car",
  "Skoda::Kodiaq": "car", "Skoda::Octavia": "car", "Skoda::Superb": "car",

  // Toyota - cars + van
  "Toyota::Aygo": "car", "Toyota::Corolla": "car", "Toyota::GR Yaris": "car",
  "Toyota::RAV4": "car", "Toyota::Yaris": "car",
  "Toyota::Proace": "lgv",

  // Vauxhall - cars + vans
  "Vauxhall::Astra": "car", "Vauxhall::Corsa": "car", "Vauxhall::Crossland": "car",
  "Vauxhall::Grandland": "car", "Vauxhall::Insignia": "car", "Vauxhall::Mokka": "car",
  "Vauxhall::Vivaro": "lgv", "Vauxhall::Combo": "lgv", "Vauxhall::Movano": "lgv",

  // Volkswagen - cars + vans
  "Volkswagen::Golf": "car", "Volkswagen::Passat": "car", "Volkswagen::Polo": "car",
  "Volkswagen::T-Cross": "car", "Volkswagen::T-Roc": "car", "Volkswagen::Tiguan": "car", "Volkswagen::Up": "car",
  "Volkswagen::Transporter": "lgv", "Volkswagen::Caddy": "lgv", "Volkswagen::Crafter": "lgv",

  // Volvo (cars + buses) vs Volvo Trucks (HGV only)
  "Volvo::S60": "car", "Volvo::S90": "car", "Volvo::V40": "car", "Volvo::V60": "car",
  "Volvo::V90": "car", "Volvo::XC40": "car", "Volvo::XC60": "car", "Volvo::XC90": "car",
  "Volvo::B5LH": "bus", "Volvo::B8RLE": "bus", "Volvo::B11R": "bus",
  "Volvo Trucks::FL": "hgv", "Volvo Trucks::FM": "hgv", "Volvo Trucks::FH": "hgv",

  // Mercedes-Benz - cars, vans, HGVs and buses all under one make
  "Mercedes-Benz::A-Class": "car", "Mercedes-Benz::B-Class": "car", "Mercedes-Benz::C-Class": "car",
  "Mercedes-Benz::CLA": "car", "Mercedes-Benz::E-Class": "car", "Mercedes-Benz::GLA": "car", "Mercedes-Benz::GLC": "car",
  "Mercedes-Benz::Sprinter": "lgv", "Mercedes-Benz::Vito": "lgv", "Mercedes-Benz::Citan": "lgv",
  "Mercedes-Benz::Actros": "hgv", "Mercedes-Benz::Atego": "hgv",
  "Mercedes-Benz::Citaro": "bus", "Mercedes-Benz::Tourismo": "bus",

  // Motorcycle-only makes
  "Yamaha::MT-07": "motorcycle", "Yamaha::MT-09": "motorcycle",
  "Yamaha::Tenere 700": "motorcycle", "Yamaha::R125": "motorcycle",
  "Suzuki::GSX-R750": "motorcycle", "Suzuki::SV650": "motorcycle",
  "Suzuki::V-Strom 650": "motorcycle", "Suzuki::Burgman 125": "motorcycle",
  "Kawasaki::Ninja 400": "motorcycle", "Kawasaki::Z650": "motorcycle",
  "Kawasaki::Versys 650": "motorcycle", "Kawasaki::Vulcan S": "motorcycle",
  "Triumph::Street Triple": "motorcycle", "Triumph::Tiger 900": "motorcycle", "Triumph::Bonneville T120": "motorcycle",
  "Ducati::Monster": "motorcycle", "Ducati::Panigale V2": "motorcycle", "Ducati::Multistrada": "motorcycle",
  "KTM::Duke 390": "motorcycle", "KTM::1290 Super Adventure": "motorcycle", "KTM::690 Enduro": "motorcycle",
  "Royal Enfield::Classic 350": "motorcycle", "Royal Enfield::Interceptor 650": "motorcycle", "Royal Enfield::Himalayan": "motorcycle",
  "Harley-Davidson::Iron 883": "motorcycle", "Harley-Davidson::Street Bob": "motorcycle", "Harley-Davidson::Road King": "motorcycle",

  // HGV-only makes
  "DAF::LF": "hgv", "DAF::CF": "hgv", "DAF::XF": "hgv",
  "Iveco::Daily": "lgv", "Iveco::Eurocargo": "hgv", "Iveco::Stralis": "hgv",
  "Renault Trucks::D": "hgv", "Renault Trucks::T": "hgv",

  // Scania and MAN - HGV + bus/coach
  "Scania::P-series": "hgv", "Scania::R-series": "hgv", "Scania::S-series": "hgv",
  "Scania::Interlink": "bus", "Scania::Touring": "bus",
  "MAN::TGL": "hgv", "MAN::TGM": "hgv", "MAN::TGX": "hgv",
  "MAN::Lion's City": "bus", "MAN::Lion's Coach": "bus",

  // Bus and coach-only makes
  "Alexander Dennis::Enviro200": "bus", "Alexander Dennis::Enviro400": "bus",
  "Wrightbus::StreetDeck": "bus", "Wrightbus::GB Kite": "bus",
  "Plaxton::Elite": "bus", "Plaxton::Panther": "bus",
  "Van Hool::TX": "bus", "Van Hool::EX": "bus",
};

export const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Plug-in Hybrid", "Electric", "LPG"];
export const YEARS = Array.from({ length: 26 }, (_, i) => String(2025 - i));

/**
 * Engine size options branch on the vehicle category once make+model resolve
 * it (litres for car/LGV, cc for motorcycle, larger litres for HGV/bus).
 */
export const ENGINE_SIZES_BY_VEHICLE_TYPE: Record<VehicleType, string[]> = {
  car: ["1.0L", "1.2L", "1.4L", "1.5L", "1.6L", "1.8L", "2.0L", "2.5L", "3.0L", "Other"],
  lgv: ["1.5L", "1.6L", "1.8L", "2.0L", "2.2L", "2.5L", "3.0L", "Other"],
  motorcycle: ["125cc", "300cc", "500cc", "650cc", "750cc", "900cc", "1000cc+", "Other"],
  hgv: ["6L", "7L", "9L", "11L", "13L", "16L+", "Other"],
  bus: ["7L", "9L", "11L", "13L", "16L+", "Other"],
};
