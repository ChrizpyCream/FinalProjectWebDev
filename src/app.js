import { initRouter } from "./ui/router.js";
import { initDashboard } from "./ui/dashboard.js";

document.addEventListener("DOMContentLoaded", () => {
  initDashboard();
  initRouter();
});
