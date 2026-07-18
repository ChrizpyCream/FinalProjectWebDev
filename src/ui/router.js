/**
  Routing System 
 */

const VIEWS = {
  dashboard: "dashboard-view",
  upgrades: "upgrades-view",
  troubleshooter: "troubleshooter-view"
};

/**
  hash fragments
 */
export function initRouter() {
  window.addEventListener("hashchange", handleRouting);
  
  
  handleRouting();
}

/**
 
 */
function handleRouting() {
  let view = "dashboard"; 
  
  const hash = window.location.hash.substring(1);
  if (VIEWS[hash]) {
    view = hash;
  } else {
    
    window.location.hash = "#dashboard";
    return;
  }

  
  Object.keys(VIEWS).forEach(key => {
    const sectionId = VIEWS[key];
    const element = document.getElementById(sectionId);
    
    if (element) {
      if (key === view) {
        element.style.display = "block";
        element.classList.add("view-active");
      } else {
        element.style.display = "none";
        element.classList.remove("view-active");
      }
    }
    
    
    const navLink = document.getElementById(`nav-${key}`);
    if (navLink) {
      if (key === view) {
        navLink.classList.add("nav-active");
      } else {
        navLink.classList.remove("nav-active");
      }
    }
  });
}
