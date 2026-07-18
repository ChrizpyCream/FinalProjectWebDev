import { VEHICLE_SPECS, MAINTENANCE_INTERVALS } from "../domain/course-data.js";
import { validateMaintenanceLog, calculateMaintenanceStatus } from "../domain/validation.js";
import { getCarMileage, saveCarMileage, getMaintenanceLogs, saveMaintenanceLogs } from "../svc/storage.js";

let currentMileage = getCarMileage();
let maintenanceLogs = getMaintenanceLogs();

export function initDashboard() {
  renderVehicleSpecs();
  renderMileageUI();
  renderStatusCards();
  renderLogsTable();
  populateServiceDropdown();
  setupEventListeners();
}

function renderVehicleSpecs() {
  const specsGrid = document.getElementById("specs-grid");
  if (!specsGrid) return;
  
  specsGrid.innerHTML = `
    <div class="spec-item"><strong>Year/Make/Model:</strong> <span>${VEHICLE_SPECS.year} ${VEHICLE_SPECS.make} ${VEHICLE_SPECS.model} ${VEHICLE_SPECS.trim}</span></div>
    <div class="spec-item"><strong>Engine:</strong> <span>${VEHICLE_SPECS.engine}</span></div>
    <div class="spec-item"><strong>Output:</strong> <span>${VEHICLE_SPECS.power} / ${VEHICLE_SPECS.torque}</span></div>
    <div class="spec-item"><strong>Oil Spec:</strong> <span>${VEHICLE_SPECS.oilCapacity} (${VEHICLE_SPECS.oilType})</span></div>
    <div class="spec-item"><strong>Trans Fluid:</strong> <span>${VEHICLE_SPECS.transFluidType}</span></div>
    <div class="spec-item"><strong>Spark Plugs:</strong> <span>${VEHICLE_SPECS.sparkPlugs}</span></div>
  `;
}

function renderMileageUI() {
  const mileageInput = document.getElementById("current-mileage-input");
  if (mileageInput) {
    mileageInput.value = currentMileage;
    mileageInput.disabled = false;
  }
  const syncBtn = document.getElementById("save-mileage-btn");
  if (syncBtn) {
    syncBtn.disabled = false;
    syncBtn.style.opacity = "1";
    syncBtn.style.cursor = "pointer";
  }
}

function renderStatusCards() {
  const container = document.getElementById("maintenance-status-container");
  if (!container) return;

  const statuses = calculateMaintenanceStatus(maintenanceLogs, currentMileage);
  
  container.innerHTML = statuses.map(item => {
    let statusClass = "status-good";
    let statusLabel = "GOOD";
    
    if (item.status === "overdue") {
      statusClass = "status-overdue";
      statusLabel = "OVERDUE";
    } else if (item.status === "due-soon") {
      statusClass = "status-due-soon";
      statusLabel = "DUE SOON";
    }

    const lastDone = item.lastDoneMileage 
      ? `Last: ${item.lastDoneMileage.toLocaleString()} mi (${new Date(item.lastDoneDate).toLocaleDateString()})` 
      : "No service logs found";

    return `
      <div class="maintenance-status-card ${statusClass}" style="background-color: var(--bg-card); border-left: 4px solid ${item.status === 'overdue' ? 'var(--status-overdue)' : item.status === 'due-soon' ? 'var(--status-due)' : 'var(--status-good)'}; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h4 style="font-size: 1rem; color: #fff;">${item.name}</h4>
          <span style="font-size: 0.75rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: ${item.status === 'overdue' ? 'var(--status-overdue-bg)' : item.status === 'due-soon' ? 'var(--status-due-bg)' : 'var(--status-good-bg)'}; color: ${item.status === 'overdue' ? 'var(--status-overdue)' : item.status === 'due-soon' ? 'var(--status-due)' : 'var(--status-good)'};">${statusLabel}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${item.statusReason}</p>
        <div style="font-size: 0.75rem; color: var(--text-muted);">
          <p>${lastDone}</p>
          <p>Interval: ${item.miles.toLocaleString()} mi / ${item.months} mos</p>
        </div>
      </div>
    `;
  }).join("");
}

function renderLogsTable(filterType = "all") {
  const logsBody = document.getElementById("logs-table-body");
  if (!logsBody) return;

  const filteredLogs = maintenanceLogs.filter(log => {
    if (filterType === "all") return true;
    const type = log.serviceType;
    if (filterType === "engine" && (type === "engine-oil" || type === "engine-filter" || type === "coolant")) return true;
    if (filterType === "trans" && type === "trans-fluid") return true;
    if (filterType === "brakes" && type === "brake-fluid") return true;
    if (filterType === "cabin" && type === "cabin-filter") return true;
    return false;
  });

  if (filteredLogs.length === 0) {
    logsBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 1.5rem; color: var(--text-muted);">No logs match selected filter.</td></tr>`;
    return;
  }

  const sortedLogs = [...filteredLogs].sort((a, b) => new Date(b.date) - new Date(a.date));

  logsBody.innerHTML = sortedLogs.map(log => {
    const serviceName = MAINTENANCE_INTERVALS.find(i => i.id === log.serviceType)?.name || log.serviceType;
    return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${new Date(log.date).toLocaleDateString()}</td>
        <td style="padding: 10px; border-bottom: 1px solid var(--border-color);"><strong>${serviceName}</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${Number(log.mileage).toLocaleString()} mi</td>
        <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">$${Number(log.cost).toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${log.mechanic}</td>
        <td style="padding: 10px; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${log.notes || '-'}</td>
      </tr>
    `;
  }).join("");
}

function populateServiceDropdown() {
  const select = document.getElementById("log-service-type");
  if (!select) return;
  
  select.innerHTML = `
    <option value="" disabled selected>-- Select Service Type --</option>
    ${MAINTENANCE_INTERVALS.map(interval => `
      <option value="${interval.id}">${interval.name}</option>
    `).join("")}
  `;
}

function setupEventListeners() {
  const saveMileageBtn = document.getElementById("save-mileage-btn");
  const mileageInput = document.getElementById("current-mileage-input");
  
  if (saveMileageBtn && mileageInput) {
    saveMileageBtn.addEventListener("click", () => {
      const val = Number(mileageInput.value);
      if (isNaN(val) || val <= 0) {
        alert("Please enter a valid mileage.");
        return;
      }
      currentMileage = val;
      saveCarMileage(currentMileage);
      renderStatusCards();
      renderLogsTable();
      alert("Mileage updated.");
    });
  }

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      filterBtns.forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      renderLogsTable(e.currentTarget.dataset.filter);
    });
  });

  const logForm = document.getElementById("maintenance-log-form");
  if (logForm) {
    // Enable form fields
    logForm.querySelectorAll("input, select, textarea, button").forEach(el => el.disabled = false);

    logForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const newLog = {
        id: "log-" + Date.now(),
        serviceType: document.getElementById("log-service-type").value,
        mileage: Number(document.getElementById("log-mileage").value),
        date: document.getElementById("log-date").value,
        cost: Number(document.getElementById("log-cost").value),
        notes: document.getElementById("log-notes").value,
        mechanic: document.getElementById("log-mechanic").value
      };

      const validation = validateMaintenanceLog(newLog);
      
      document.querySelectorAll(".form-error-msg").forEach(el => el.textContent = "");

      if (!validation.isValid) {
        for (const [key, msg] of Object.entries(validation.errors)) {
          const errorField = document.getElementById(`err-${key}`);
          if (errorField) errorField.textContent = msg;
        }
        return;
      }

      maintenanceLogs.push(newLog);
      saveMaintenanceLogs(maintenanceLogs);

      if (newLog.mileage > currentMileage) {
        currentMileage = newLog.mileage;
        saveCarMileage(currentMileage);
        renderMileageUI();
      }

      renderStatusCards();
      const currentFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
      renderLogsTable(currentFilter);
      
      logForm.reset();
      populateServiceDropdown();
      alert("Service logged successfully.");
    });
  }
}
