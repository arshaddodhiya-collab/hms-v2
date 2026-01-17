# Patient Discharge Summary Viewer

A comprehensive Angular application for managing hospital patient discharge summaries. This project demonstrates a clean, modular architecture using Angular (NgModule-based), PrimeNG for UI components, and PrimeFlex for layout.

## 🚀 Tech Stack
-   **Framework**: Angular v17 (NgModule architecture)
-   **UI Dictionary**: PrimeNG v17
-   **CSS Utilities**: PrimeFlex v4
-   **PDF Generation**: `jspdf` + `html2canvas`
-   **Rich Text Editor**: `quill` (via `p-editor`)

## ✨ Features
1.  **Dashboard/List View**: view all discharge summaries with sorting, pagination, and advanced filtering (Doctor & Date).
2.  **Detailed View**: Professional, medical-record style view of a specific summary.
3.  **PDF Export**: Generate high-quality, printable A4 PDF discharge reports.
4.  **Medical Scribe Mode**: Create new summaries or edit existing ones using a rich text editor.

---

## 📂 Project Structure & File Walkthrough

Here is a detailed breakdown of the key files in the project to help you understand how everything connects.

### 1. Root Configuration
**`src/app/`**
-   **`app.module.ts`**: The root module of the application. It imports the `BrowserModule`, `BrowserAnimationsModule` (required for PrimeNG), and the `AppRoutingModule`. It bootstraps the main `AppComponent`.
-   **`app-routing.module.ts`**: Defines the main routes. critically, it implements **Lazy Loading** for the discharge summary feature (`loadChildren`), ensuring the feature code is only downloaded when needed.
-   **`app.component.html`**: Contains the `<router-outlet>`, which is the placeholder where the active route's component is displayed.

### 2. Feature Module: Discharge Summary
**`src/app/features/discharge-summary/`**

#### Module & Routing
-   **`discharge-summary.module.ts`**: The separate bucket for this feature. It imports all necessary PrimeNG modules (`TableModule`, `ButtonModule`, `EditorModule`, etc.) and declares the feature's components. This keeps the root `AppModule` clean.
-   **`discharge-summary-routing.module.ts`**: Defines the routes specific to this feature:
    -   `''` (Empty path): Shows the **List** component.
    -   `'new'`: Shows the **Form** component in "Create" mode.
    -   `':id/edit'`: Shows the **Form** component in "Edit" mode.
    -   `':id'`: Shows the **Detail** component.

#### Data Model & Service
-   **`models/discharge-summary.model.ts`**: A TypeScript interface defining the shape of a `DischargeSummary` object (e.g., has `patientName`, `diagnosis`, `treatmentGiven`, etc.). This ensures type safety across the app.
-   **`services/discharge-summary.service.ts`**: The logic layer.
    -   It holds the `mockData` (simulating a database).
    -   `getDischargeSummaries()`: Returns the list of patients.
    -   `getDischargeSummaryById(id)`: Finds a specific patient.
    -   `create...` / `update...`: Handles adding and modifying records.

### 3. Components

#### List View (The Dashboard)
**`components/discharge-summary-list/`**
-   **`discharge-summary-list.component.html`**: The template using `p-table`. It defines columns, header filters (Doctor Multi-Select, Date Range), and the "Action" column with buttons.
-   **`discharge-summary-list.component.ts`**:
    -   Fetches data from the service on init.
    -   Generates the unique list of doctors for the filter dropdown.
    -   Handles navigation to the "Detail" or "New" pages.

#### Detail View (The Report)
**`components/discharge-summary-detail/`**
-   **`discharge-summary-detail.component.html`**:
    -   Displays the summary in a nice `p-card`.
    -   **Crucial Part**: Contains a hidden `<div id="pdf-report">`. This is a simplified, printer-friendly HTML structure used *only* for generating the PDF, ensuring the downloaded file looks like a real document and not just a screenshot of the app.
-   **`discharge-summary-detail.component.ts`**:
    -   Fetches the record based on the ID in the URL.
    -   **`downloadPDF()`**: The magic function. It grabs the hidden `#pdf-report` element, uses `html2canvas` to turn it into an image, and puts that image into a PDF using `jspdf`.

#### Form View (Create/Edit)
**`components/discharge-summary-form/`**
-   **`discharge-summary-form.component.html`**: The input form.
    -   Uses `p-calendar` for dates.
    -   Uses `p-dropdown` for status.
    -   Uses `p-editor` (Quill) for "Treatment" and "Follow-up" to allow doctors to bold text, make lists, etc.
-   **`discharge-summary-form.component.ts`**:
    -   Uses **Reactive Forms** (`FormGroup`, `FormControl`) for robust validation (required fields).
    -   Checks if we are in "Edit" mode (is there an ID in the URL?) or "New" mode.
    -   If "Edit", it pre-fills the form with existing data.
    -   On Submit, it calls the appropriate Service method (`create` or `update`).

---

## 🛠️ How to Data Flow

1.  **User opens app**: Router loads `DischargeSummaryList`.
2.  **User clicks "New"**: Router loads `DischargeSummaryForm`. User fills it -> Service saves to `mockData`.
3.  **User clicks "View"**: Router loads `DischargeSummaryDetail` (fetches data by ID).
4.  **User clicks "Download PDF"**:  `html2canvas` takes a picture of the hidden report -> `jspdf` bundles it -> User gets file.
