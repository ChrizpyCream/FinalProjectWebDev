const KEYS = {
  MILEAGE: "accord_quest_mileage",
  LOGS: "accord_quest_logs"
};

const DEFAULT_MILEAGE = 130154;

const DEFAULT_LOGS = [
  {
    id: "log-oil",
    serviceType: "engine-oil",
    mileage: 127612,
    date: "2026-05-15",
    cost: 45.00,
    notes: "Oil changed (2,542 miles ago). 5W-30 Full Synthetic & filter.",
    mechanic: "DIY"
  },
  {
    id: "log-stickers",
    serviceType: "cabin-filter",
    mileage: 129000,
    date: "2026-06-15",
    cost: 120.00,
    notes: "Renewed license plate registration stickers for the year.",
    mechanic: "DIY"
  }
];

export function getCarMileage() {
  const mileage = localStorage.getItem(KEYS.MILEAGE);
  return mileage ? Number(mileage) : DEFAULT_MILEAGE;
}

export function saveCarMileage(mileage) {
  localStorage.setItem(KEYS.MILEAGE, mileage.toString());
}

export function getMaintenanceLogs() {
  const logs = localStorage.getItem(KEYS.LOGS);
  if (!logs) {
    localStorage.setItem(KEYS.LOGS, JSON.stringify(DEFAULT_LOGS));
    return DEFAULT_LOGS;
  }
  return JSON.parse(logs);
}

export function saveMaintenanceLogs(logs) {
  localStorage.setItem(KEYS.LOGS, JSON.stringify(logs));
}
