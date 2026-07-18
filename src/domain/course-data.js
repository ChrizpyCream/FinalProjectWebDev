export const VEHICLE_SPECS = {
  year: 2005,
  make: "Honda",
  model: "Accord",
  trim: "EX",
  engine: "2.4L 4-Cylinder VTEC (K24A4)",
  power: "160 hp @ 5,500 RPM",
  torque: "161 lb-ft @ 4,500 RPM",
  oilCapacity: "4.4 US quarts (4.2L) with filter",
  oilType: "5W-30 Full Synthetic",
  transFluidType: "Honda ATF-Z1 or ATF DW-1",
  sparkPlugs: "NGK IZFR6K11 (Laser Iridium)",
  tireSize: "205/60R16",
  wheelTorque: "80 lb-ft",
  coolantCapacity: "1.43 US gal"
};

export const MAINTENANCE_INTERVALS = [
  {
    id: "engine-oil",
    name: "Engine Oil & Filter",
    miles: 5000,
    months: 6,
    fluid: "5W-30 Synthetic",
    capacity: "4.4 Qts"
  },
  {
    id: "trans-fluid",
    name: "Transmission Fluid",
    miles: 30000,
    months: 36,
    fluid: "Honda ATF DW-1",
    capacity: "2.6 Qts (Drain & Fill)"
  },
  {
    id: "cabin-filter",
    name: "Cabin Air Filter",
    miles: 15000,
    months: 12,
    fluid: "N/A",
    capacity: "1 filter"
  },
  {
    id: "engine-filter",
    name: "Engine Air Filter",
    miles: 15000,
    months: 12,
    fluid: "N/A",
    capacity: "1 filter"
  },
  {
    id: "brake-fluid",
    name: "Brake Fluid Flush",
    miles: 30000,
    months: 36,
    fluid: "DOT 3 Brake Fluid",
    capacity: "Flush"
  }
];
