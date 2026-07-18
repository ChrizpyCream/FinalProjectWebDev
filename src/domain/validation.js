import { MAINTENANCE_INTERVALS } from "./course-data.js";

export function validateMaintenanceLog(log) {
  const errors = {};
  
  if (!log.serviceType) {
    errors.serviceType = "Service type is required.";
  }

  const mileage = Number(log.mileage);
  if (isNaN(mileage) || mileage < 0) {
    errors.mileage = "Mileage must be a positive number.";
  }

  const cost = Number(log.cost);
  if (isNaN(cost) || cost < 0) {
    errors.cost = "Cost must be a positive number.";
  }

  if (!log.date) {
    errors.date = "Service date is required.";
  } else {
    const selectedDate = new Date(log.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (selectedDate > today) {
      errors.date = "Service date cannot be in the future.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function calculateMaintenanceStatus(logs, currentMileage) {
  const today = new Date();
  
  return MAINTENANCE_INTERVALS.map(interval => {
    const matchingLogs = logs
      .filter(log => log.serviceType === interval.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const lastLog = matchingLogs[0];

    if (!lastLog) {
      return {
        ...interval,
        status: "overdue",
        lastDoneMileage: null,
        lastDoneDate: null,
        milesRemaining: 0,
        daysRemaining: 0,
        statusReason: "No logs found. Inspection required."
      };
    }

    const lastMileage = Number(lastLog.mileage);
    const lastDate = new Date(lastLog.date);

    const milesSince = currentMileage - lastMileage;
    const milesRemaining = interval.miles - milesSince;

    const msSince = today.getTime() - lastDate.getTime();
    const daysSince = Math.floor(msSince / (1000 * 60 * 60 * 24));
    const targetDays = interval.months * 30.4;
    const daysRemaining = Math.floor(targetDays - daysSince);

    let status = "good";
    let statusReason = "Up to date.";

    if (milesRemaining <= 0 || daysRemaining <= 0) {
      status = "overdue";
      statusReason = milesRemaining <= 0 
        ? `Overdue by ${Math.abs(milesRemaining).toLocaleString()} mi.` 
        : `Overdue by ${Math.abs(daysRemaining)} days.`;
    } else if (milesRemaining <= 1000 || daysRemaining <= 30) {
      status = "due-soon";
      statusReason = milesRemaining <= 1000 
        ? `Due soon: ${milesRemaining.toLocaleString()} mi remaining.` 
        : `Due soon: ${daysRemaining} days remaining.`;
    }

    return {
      ...interval,
      status,
      lastDoneMileage: lastMileage,
      lastDoneDate: lastLog.date,
      milesRemaining,
      daysRemaining,
      statusReason
    };
  });
}
