# AccordQuest: The Ultimate 7th Gen Honda Accord Companion & Upgrade Planner

## Project Proposal

### What is AccordQuest?
**AccordQuest** is a web application designed specifically for owners of the 7th Generation Honda Accord (specifically targeting the 2005 Honda Accord EX 4-cylinder 2.4L VTEC(my car)). The app functions as a premium personal dashboard that blends real-time maintenance tracking, upgrade planning, and diagnostic troubleshooting into a single, cohesive interface. It allows car enthusiasts to log services (like engine oil, transmission fluid, brakes, and AC refrigerant), map out future upgrades (such as new rims, speakers/amplifiers, and LED headlights), and resolve technical issues with aftermarket parts—specifically the popular XTRONS 10.1-inch Android 14 head unit.

### Why Build This Project?
For many car owners including me, keeping track of maintenance intervals and planning aesthetic or performance upgrades involves scattered spreadsheets, paper receipts, and endless forum-browsing for diagnostic help. For the 7th Gen Accord, wiring custom sound systems and fixing issues with modern Android 14 head units (like wireless Android Auto dropping connections or DSP delays( which is an issue im having current)) requires specific, hard-to-find instructions. AccordQuest solves this by creating a dedicated companion tool. By integrating interactive visual elements, structured forms, and a drag-and-drop planning board, this application will transform the way users manage their vehicle's lifecycle. It is a highly customized, visually engaging, and practical tool designed to keep this legendary VTEC engine running forever while modernizing the cabin.

### Core Architecture and Integrations
AccordQuest is designed following a strict three-tier architecture (UI, Domain, and Service layers) to maintain code clarity and separation of concerns. The frontend is built using clean HTML5, premium vanilla CSS with variable-driven design systems, and responsive JavaScript modules. Key interactive modules include a drag-and-drop scheduler for upgrades, a dynamic diagnostic questionnaire wizard for fixing head-unit wireless disconnects, and a parts browser filtering OEM schematics from Honda's DreamShop. The system integrates with an external NHTSA Recalls API to dynamically scan for safety notices and syncs user inputs, mileage history, and budget updates with a custom-built C# ASP.NET Core API backend.

---

## Technical & Functional Requirements Mapping

Below is a detailed breakdown of where each specific requirement for the Web Dev Final Project is represented within AccordQuest:

### HTML Mastery
*   **`<form>` & Inputs**: Used in the Maintenance Logger and the XTRONS Diagnostic Troubleshooter.
*   **`<img>` & `<figure>`**: Displays mechanical schematics, component diagrams, and wheel/upgrade visual mocks.
*   **`<table>`**: Lists part numbers, quantities, pricing, and specs retrieved from the parts database.
*   **`<a>`**: Navigates to external references like direct Honda DreamShop product pages.
*   **Lists**: Displays step-by-step diagnostic procedures, fluid specifications, and filter checklists.
*   **Semantic Structure**: Structural layout for main views, sidebars for vehicle specs, and primary header nav tabs.

### CSS Mastery
*   **Appropriate Selectors & `:nth-child`**: Used to style parts tables, filter lists, and alternate card rows.
*   **Transitions & `:hover`**: Provides premium animations for card lift, button focus, and interactive wiring nodes.
*   **Layout**: Employs CSS Grid for the parts browser and Flexbox for the drag-and-drop kanban board and header layouts.
*   **Color Palette**: Centralizes variables for premium dark-mode colors: sporty Honda Red (`#CC0000`), Charcoal Dark (`#1E1E1E`), Clean Slate (`#2A2A2A`), and accent highlights.
*   **Sizing & Spacing**: Strict adherence to margin, padding, border-radius, and shadow guidelines for an elegant, professional look.

### JavaScript Mastery
*   **Array Functions**: Dynamically filters parts by category and maps database records to UI cards.
*   **DOM Manipulation**: Creates, updates, and deletes card elements dynamically as they are dragged, added, or resolved.
*   **Event Listeners**: Handles drag events, form submissions, filter selection toggles, and page routing.
*   **Layered Architecture**: Organized strictly into `/src/ui` (DOM/Events), `/src/domain` (Validation/Logic), and `/src/svc` (APIs/Storage).
*   **Async/Await & Promises**: Performs asynchronous network fetches to backend databases and external APIs.
*   **Query String & Local Storage**: Reads URL search parameters and persists local modifications.

### Functional Requirements
*   **Multiple Pages & Shared Layout**: Features a persistent layout with a shared header, nav, and footer across multiple views.
*   **Filter Bar**: Filters parts and maintenance logs by system.
*   **Drag & Drop**: Drag wishlist parts onto project boards.
*   **External API Calls**: Fetches NHTSA Recall data via HTTP requests.
*   **C# Web API**: Back-end system accepting and sending JSON payloads to manage service records.

---

## Weekly Implementation Plan

Use the checklists below to track project progression by milestones:

# Week 1: Foundations, Layout, & Data Logging

## Milestone 1: Foundations & Layout
- [ ] Initialize the project repository with directories for `/src/ui`, `/src/domain`, and `/src/svc`.
- [ ] Build the shared page layout including the `<header>`, `<footer>`, `<nav>`, and structural `<section>` containers.
- [ ] Implement a vanilla JavaScript routing system to swap between Dashboard, Upgrades Board, and Audio Troubleshooter views.
- [ ] Write `style.css` with a central variable theme, incorporating dark-mode rules, reset guidelines, and typography fonts.
- [ ] Set up basic placeholders for parts figures and navigation.

## Milestone 2: Domain Catalog, Maintenance Logger, & Local Storage
- [ ] Create `course-data.js` containing the 2005 Accord EX 2.4L specification data.
- [ ] Implement the Maintenance Log `<form>` incorporating text, number, select dropdowns, and reset/submit buttons.
- [ ] Write Domain layer validator logic to check if a service is overdue based on entered mileage and time.
- [ ] Set up Service layer endpoints to save and load service logs to/from browser `localStorage`.
- [ ] Render log cards in the dashboard using JavaScript `map` and `filter`.

# Week 2: Interactive Planning & Diagnostic Wizard

## Milestone 3: Upgrade Planner
- [ ] Create the Upgrades Planner layout using CSS Flexbox columns.
- [ ] Enable HTML5 drag-and-drop handlers on upgrade cards to move them between columns.
- [ ] Connect drag-and-drop state changes back to the Domain layer, updating budget totals dynamically on drop.

## Milestone 4: XTRONS Diagnostics
- [ ] Design the XTRONS Troubleshooter page with a step-by-step diagnostic questionnaire wizard.
- [ ] Implement conditional rendering in JS to display tailored troubleshooting guidelines.

# Week 3: C# API Backend, Query Parameters, & Final Polish

## Milestone 5: C# API Backend, Query Parameters, & Final Polish
- [ ] Set up a C# ASP.NET Core Web API project to manage data storage.
- [ ] Implement C# Controller endpoints to handle JSON requests for vehicle records.
- [ ] Update the frontend Service layer using async/await and fetch to sync data with the local C# server instead of only LocalStorage.
- [ ] Integrate an external fetch request to the NHTSA Recall API to retrieve safety alerts for the 2005 Honda Accord EX.
- [ ] Display the active recall alerts in a structured table with direct links to instructions.
- [ ] Implement query string parsing to allow deep-linking directly to specific views.
- [ ] Add transitions, hover lift animations, and nth-child styling to improve dashboard aesthetics.
- [ ] Conduct complete end-to-end testing of data persistence, drag-and-drop operations, and error-handling.
- [ ] Update final weekly checklists in this `README.md` and submit the GitHub repository link.