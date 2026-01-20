# Authentication & RBAC Implementation Documentation

**Date:** 2026-01-20
**Module:** Authentication, Navigation, and Role-Based Access Control (RBAC)

## 1. Overview
This document details the implementation of a secure, role-based authentication system for the Patient Discharge Summary application. The system uses a **Mock Backend** approach where JWTs (JSON Web Tokens) are generated client-side to simulate a real-world authentication flow.

**Key Features:**
- **JWT Authentication**: Secure token-based session management.
- **RBAC (Role-Based Access Control)**: Distinct access levels for Doctors, Admins, and Patients.
- **Persistent Sidebar Navigation**: A layout wrapper that provides role-specific navigation links.
- **Route Protection**: Guards to prevent unauthorized access to specific modules.

---

## 2. Authentication System

### AuthService (`core/services/auth.service.ts`)
The `AuthService` is the backbone of the security layer.
- **Mock Credentials**: It contains a hardcoded list of users for testing.
- **BehaviorSubject**: Manages the current user state reactively (`currentUser$`).
- **JWT Generation**: When a user logs in, the service generates a base64-encoded mock JWT containing:
  - `sub`: Username
  - `role`: User Role (DOCTOR, ADMIN, PATIENT)
  - `exp`: Expiration time (1 hour)
- **Token Storage**: The token is stored in `localStorage` key `access_token` to persist sessions across page reloads.

### JwtInterceptor (`core/interceptors/jwt.interceptor.ts`)
An HTTP Interceptor is registered to automatically attach the `Authorization` header to all outgoing HTTP requests.
```typescript
Authorization: Bearer <valid_mock_token>
```
*Note: Since we are mocking the backend, this is primarily to demonstrate architecture compliance.*

---

## 3. Role-Based Access Control (RBAC)

We have defined three distinct roles, each with its own dashboard and permissions.

| Role | Username | Password | Dashboard Route | Sidebar Links |
| :--- | :--- | :--- | :--- | :--- |
| **DOCTOR** | `doctor` | `test` | `/discharge-summary` | Discharge Summary, Patient Reg |
| **ADMIN** | `admin` | `admin` | `/admin-dashboard` | Admin Dashboard |
| **PATIENT** | `patient` | `patient` | `/patient-dashboard` | My Dashboard |

### AuthGuard (`core/guards/auth.guard.ts`)
The guard protects routes using `CanActivate`.
1.  **Authentication Check**: Verifies if a valid token exists.
2.  **Role Check**: Checks `route.data['role']`. If the user's role does not match:
    - It redirects them to their **correct** dashboard (using `AuthService.getRedirectUrl()`).
3.  **Unauthorized**: If not logged in, redirects to `/login`.

---

## 4. Architecture & Navigation

### MainLayoutComponent (`core/components/main-layout`)
This component acts as the "Shell" for authenticated users.
- **Structure**: It wraps the `<router-outlet>` and displays the Sidebar.
- **Dynamic Sidebar**: The `menuItems` are generated dynamically based on the logged-in user's role.
- **Responsiveness**: The sidebar is collapsible on mobile devices.

### AppRoutingModule
We use a nested routing strategy to apply the layout and guards efficiently.

```typescript
{
  path: '',
  component: MainLayoutComponent, // Parent Shell
  canActivate: [AuthGuard],       // Protects all children
  children: [
    // ... Lazy Loaded Modules ...
    { path: 'discharge-summary', loadChildren: ... },
    { path: 'admin-dashboard', loadChildren: ... },
    // ...
  ]
}
```

---

## 5. How to Test / Usage

1.  **Start Application**: Run `ng serve` and open `http://localhost:4200`.
2.  **Initial State**: You should be redirected to `/login`.
3.  **Login as Doctor**:
    - Credentials: `doctor` / `test`
    - Verify you land on "Discharge Summary".
    - Verify Sidebar shows Doctor-specific links.
4.  **Login as Admin**:
    - Logout and sign in as `admin` / `admin`.
    - Verify you land on "Admin Dashboard".
5.  **Persistence**: Refresh the page. You should stay logged in.
6.  **Logout**: Click "Logout" in the sidebar. You should be redirected to login and the token cleared.
