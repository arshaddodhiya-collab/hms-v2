# Patient Registration Validation Guide

This document explains the validation architecture implemented in the `PatientRegistration` module. It is designed to be robust, recursive, and user-friendly, supporting deep nesting (FormGroups, FormArrays) and auto-scrolling to errors.

## 1. Overview

The validation system consists of three pillars:
1.  **Custom Business Validators**: Reusable logic defined in `patient.validators.ts`.
2.  **Recursive Error Handling**: A centralized method in the component that marks all fields as dirty/touched.
3.  **Visual Feedback & Navigation**: Automatic scrolling to the first invalid field and focusing it.

## 2. Custom Validators (`patient.validators.ts`)

We moved pattern-based logic out of the component into a static utility class. This keeps the component clean and the logic reusable.

| Validator | Purpose | Logic | Error Key |
| :--- | :--- | :--- | :--- |
| `noSpecialChars` | Names | Allows only letters and spaces. | `invalidName` |
| `validPhoneNumber` | Phones | Allows numbers, `+`, `-`, and spaces. | `invalidPhone` |
| `numericOnly` | Postal Codes | Allows only numbers. | `numericOnly` |
| `pastDate` | Date of Birth | Date must be before today. | `futureDate` |
| `futureDate` | Expiration | Date must be after today. | `pastDate` |

**Usage Example:**
```typescript
firstName: ['', [Validators.required, PatientValidators.noSpecialChars]]
```

## 3. Recursive Validation Logic (`markFormGroupDirty`)

The core of the validation on submit is the `markFormGroupDirty` method in `PatientFormComponent`.

### Key Features
-   **Deep Traversal**: It recursively iterates through every control, whether it's a simple `FormControl`, a nested `FormGroup` (like `address`), or a dynamic `FormArray` (like `medicalInfo.allergies`).
-   **State Management**: It marks every control as:
    -   `dirty`: To indicate the value has "changed".
    -   `touched`: To trigger the visual error messages in the HTML (which use `@if (control.touched && control.invalid)`).
-   **Safe Handling**: It accepts `AbstractControl` to safely handle primitive arrays (like a list of strings) without crashing.

### Auto-Scroll Mechanism
The method finds the **first** invalid field and scrolls it into view.

1.  **Selection**: It looks for an HTML element with the attribute `[formcontrolname]="fieldName"`.
2.  **Scroll**: Uses `scrollIntoView({ behavior: 'smooth', block: 'center' })`.
3.  **Focus**: If the element is an input, it calls `.focus()` so the user can type immediately.
4.  **Signal Lock**: Uses an Angular Signal (`inputValidation`) to ensure we only scroll to the *first* error found, ignoring subsequent errors during the recursive pass.

## 4. HTML Requirements

For the auto-scroll to work, **every input field** in the template must have a specific attribute matching its form control name.

**Standard Input:**
```html
<input formControlName="firstName" [attr.formcontrolname]="'firstName'" />
```

**Dynamic Array Input:**
```html
<!-- Inside @for loop with index i -->
<input [formControlName]="i" [attr.formcontrolname]="i" />
```

> **Note**: The `[attr.formcontrolname]` is strictly for the `document.querySelector` lookups in the TS file. The standard `formControlName` directive is for Angular Reactive Forms binding. Both are required.

## 5. Submission Flow

1.  **User clicks Submit**.
2.  **Check Validity**: If `this.patientForm.valid` is true -> Submit Data.
3.  **Handle Invalid**:
    -   Reset the scroll lock signal: `this.inputValidation.set(false)`.
    -   Call `this.markFormGroupDirty(this.patientForm, true)`.
    -   The system reveals all red error messages and smooth-scrolls to the top-most error.
