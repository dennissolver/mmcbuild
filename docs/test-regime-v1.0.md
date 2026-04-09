# MMC Build — Internal Test Regime v1.0

**Prepared by:** Dennis McMahon
**Date:** 10 April 2026
**Status:** Draft — pending Karen and Karthik sign-off
**Sprint:** v0.4.0

---

## Purpose

This document defines the minimum test cases required for MMC Build platform
sign-off before beta launch. Each module has structured test cases with clear
pass/fail criteria. Karen Burns and Karthik Rao are required to review, execute,
and sign off on all test cases before public beta access is granted.

---

## Test Case Format

| Field | Description |
|-------|-------------|
| **ID** | Unique identifier (e.g. TC-COMPLY-001) |
| **Description** | What is being tested |
| **Preconditions** | Required state before test execution |
| **Steps** | Numbered execution steps |
| **Expected Result** | What should happen |
| **Pass/Fail** | Test outcome (blank until executed) |
| **Notes** | Observations, bugs found, screenshots |

---

## 1. Onboarding

### TC-ONB-001: New user registration and persona selection

| Field | Value |
|-------|-------|
| **Preconditions** | No existing account |
| **Steps** | 1. Navigate to /login<br>2. Click "Sign up"<br>3. Enter email and password<br>4. Confirm email via magic link<br>5. Observe redirect to /onboarding<br>6. Select a persona (e.g. Builder)<br>7. Click Continue |
| **Expected Result** | User lands on /dashboard with sidebar showing modules appropriate to the selected persona |
| **Pass/Fail** | |
| **Notes** | |

### TC-ONB-002: Persona reset via settings

| Field | Value |
|-------|-------|
| **Preconditions** | User logged in with a persona already set |
| **Steps** | 1. Navigate to /settings<br>2. Click "Your Profile" card<br>3. Verify current role is displayed<br>4. Click "Change role"<br>5. Confirm in the dialog<br>6. Re-select a different persona on the onboarding screen<br>7. Click Continue |
| **Expected Result** | Sidebar updates immediately to show modules for the new persona. No page reload required. |
| **Pass/Fail** | |
| **Notes** | |

### TC-ONB-003: First login redirect to onboarding if persona not set

| Field | Value |
|-------|-------|
| **Preconditions** | User account exists but persona is null |
| **Steps** | 1. Log in with the account<br>2. Attempt to navigate to /dashboard |
| **Expected Result** | User is automatically redirected to /onboarding before reaching the dashboard |
| **Pass/Fail** | |
| **Notes** | |

---

## 2. MMC Comply

### TC-COMPLY-001: Upload valid PDF plan — analysis runs — report generated

| Field | Value |
|-------|-------|
| **Preconditions** | User logged in as Builder, at least one project exists |
| **Steps** | 1. Navigate to /comply<br>2. Select a project<br>3. Upload a valid residential PDF plan<br>4. Answer classification questions<br>5. Click "Run Analysis"<br>6. Wait for completion |
| **Expected Result** | Compliance report generated with NCC clause citations, severity ratings, and recommendations |
| **Pass/Fail** | |
| **Notes** | |

### TC-COMPLY-002: Upload invalid file type — error message shown

| Field | Value |
|-------|-------|
| **Preconditions** | User logged in, project selected |
| **Steps** | 1. Navigate to a project's Comply tab<br>2. Attempt to upload a .txt or .exe file |
| **Expected Result** | Error message displayed: invalid file type. Upload rejected. |
| **Pass/Fail** | |
| **Notes** | |

### TC-COMPLY-003: Run limit enforcement at 10 runs (Trial tier)

| Field | Value |
|-------|-------|
| **Preconditions** | Trial tier user with 10 runs already used this month |
| **Steps** | 1. Navigate to /comply<br>2. Select a project<br>3. Attempt to run an analysis |
| **Expected Result** | User sees upgrade prompt. Analysis does not run. Progress bar in sidebar shows 10/10. |
| **Pass/Fail** | |
| **Notes** | |

### TC-COMPLY-004: NCC citations present in output report

| Field | Value |
|-------|-------|
| **Preconditions** | Completed compliance analysis |
| **Steps** | 1. Open a completed compliance report<br>2. Review the clause-by-clause output |
| **Expected Result** | Each finding references a specific NCC clause (e.g. "NCC Vol 2, Part 3.7.1.2"). Citations are clickable or clearly labelled. |
| **Pass/Fail** | |
| **Notes** | |

### TC-COMPLY-005: Export compliance report as PDF

| Field | Value |
|-------|-------|
| **Preconditions** | Completed compliance analysis |
| **Steps** | 1. Open a completed compliance report<br>2. Click "Export as PDF" |
| **Expected Result** | PDF downloaded with formatted report content, MMC Build branding, and all findings |
| **Pass/Fail** | |
| **Notes** | |

---

## 3. MMC Build

### TC-BUILD-001: Upload plan — material suggestions generated

| Field | Value |
|-------|-------|
| **Preconditions** | User logged in, project exists |
| **Steps** | 1. Navigate to /build<br>2. Select a project<br>3. Upload a plan or use existing uploaded plan<br>4. Run design analysis |
| **Expected Result** | System generates MMC material/system suggestions (SIPs, CLT, steel frame, etc.) with rationale |
| **Pass/Fail** | |
| **Notes** | |

### TC-BUILD-002: Material selection persists to project record

| Field | Value |
|-------|-------|
| **Preconditions** | Design analysis complete with suggestions |
| **Steps** | 1. Select one or more construction systems from suggestions<br>2. Save selection<br>3. Navigate away and return to the project |
| **Expected Result** | Selected systems are saved in project.selected_systems and persist across page navigation |
| **Pass/Fail** | |
| **Notes** | |

### TC-BUILD-003: No project exists — redirected to project creation

| Field | Value |
|-------|-------|
| **Preconditions** | User logged in, zero projects in their org |
| **Steps** | 1. Navigate directly to /build |
| **Expected Result** | User is redirected to /projects with the Create Project dialog open |
| **Pass/Fail** | |
| **Notes** | |

### TC-BUILD-004: Cross-module plan sharing

| Field | Value |
|-------|-------|
| **Preconditions** | Plan uploaded in Build module for a project |
| **Steps** | 1. Upload a plan in /build for a project<br>2. Navigate to /comply for the same project<br>3. Navigate to /quote for the same project |
| **Expected Result** | The uploaded plan is available in Comply and Quote without re-uploading |
| **Pass/Fail** | |
| **Notes** | |

---

## 4. MMC Quote

### TC-QUOTE-001: Quote generated from selected materials

| Field | Value |
|-------|-------|
| **Preconditions** | Project exists with selected construction systems |
| **Steps** | 1. Navigate to /quote<br>2. Select a project<br>3. Run cost estimation |
| **Expected Result** | Quote generated with line items, base cost, MMC alternative cost, and savings percentage |
| **Pass/Fail** | |
| **Notes** | |

### TC-QUOTE-002: Quote export as PDF

| Field | Value |
|-------|-------|
| **Preconditions** | Completed cost estimate |
| **Steps** | 1. Open a completed quote<br>2. Click "Export as PDF" |
| **Expected Result** | PDF downloaded with formatted quote, line items, and MMC Build branding |
| **Pass/Fail** | |
| **Notes** | |

### TC-QUOTE-003: Quote export as Word document

| Field | Value |
|-------|-------|
| **Preconditions** | Completed cost estimate |
| **Steps** | 1. Open a completed quote<br>2. Click "Export as Word" (if available) |
| **Expected Result** | .docx file downloaded with formatted quote content |
| **Pass/Fail** | |
| **Notes** | Word export may not be implemented yet — mark as N/A if missing |

### TC-QUOTE-004: Manufacturer pricing reflected in output

| Field | Value |
|-------|-------|
| **Preconditions** | Cost rates configured in /settings/cost-rates |
| **Steps** | 1. Set a custom rate for a material in cost rate management<br>2. Run a new quote that includes that material |
| **Expected Result** | Quote uses the configured rate, not a default |
| **Pass/Fail** | |
| **Notes** | |

---

## 5. MMC Direct

### TC-DIRECT-001: Directory search by state and category returns results

| Field | Value |
|-------|-------|
| **Preconditions** | Published directory listings exist |
| **Steps** | 1. Navigate to /direct<br>2. Filter by state (e.g. NSW)<br>3. Filter by category (e.g. Structural) |
| **Expected Result** | Matching listings displayed with company name, category, and location |
| **Pass/Fail** | |
| **Notes** | |

### TC-DIRECT-002: Filter by certification status works correctly

| Field | Value |
|-------|-------|
| **Preconditions** | Published listings with varied certification status |
| **Steps** | 1. Navigate to /direct<br>2. Apply certification filter |
| **Expected Result** | Only listings matching the filter criteria are shown |
| **Pass/Fail** | |
| **Notes** | |

### TC-DIRECT-003: Company profile displays all required fields

| Field | Value |
|-------|-------|
| **Preconditions** | At least one published listing |
| **Steps** | 1. Navigate to /direct<br>2. Click on a company listing |
| **Expected Result** | Profile shows: company name, ABN, licence, contact details, MMC experience, service area, categories |
| **Pass/Fail** | |
| **Notes** | |

---

## 6. MMC Train

### TC-TRAIN-001: Training module loads and progress is tracked

| Field | Value |
|-------|-------|
| **Preconditions** | User logged in, training modules available |
| **Steps** | 1. Navigate to /train<br>2. Select a training module<br>3. Complete at least one section<br>4. Navigate away and return |
| **Expected Result** | Progress is saved and displayed (e.g. "60% complete") |
| **Pass/Fail** | |
| **Notes** | |

### TC-TRAIN-002: Quiz completion triggers certificate generation

| Field | Value |
|-------|-------|
| **Preconditions** | Training module with quiz completed |
| **Steps** | 1. Complete all sections of a training module<br>2. Pass the quiz |
| **Expected Result** | Certificate generated and available for download |
| **Pass/Fail** | |
| **Notes** | |

### TC-TRAIN-003: Dashboard shows completion percentage per module

| Field | Value |
|-------|-------|
| **Preconditions** | Partial completion of training modules |
| **Steps** | 1. Navigate to /train |
| **Expected Result** | Each module card shows completion percentage and progress indicator |
| **Pass/Fail** | |
| **Notes** | |

---

## 7. Billing

### TC-BILL-001: Trial user sees run limit progress bar

| Field | Value |
|-------|-------|
| **Preconditions** | Trial tier user |
| **Steps** | 1. Log in as trial user<br>2. Observe sidebar |
| **Expected Result** | Progress bar visible at bottom of sidebar showing "Analyses used: X / 10" |
| **Pass/Fail** | |
| **Notes** | |

### TC-BILL-002: Upgrade prompt shown when run limit reached

| Field | Value |
|-------|-------|
| **Preconditions** | Trial user at run limit (10/10) |
| **Steps** | 1. Attempt to run any analysis (Comply, Build, or Quote) |
| **Expected Result** | Upgrade prompt displayed with link to billing page. Analysis blocked. |
| **Pass/Fail** | |
| **Notes** | |

### TC-BILL-003: Stripe test mode payment completes successfully

| Field | Value |
|-------|-------|
| **Preconditions** | Trial user on billing page |
| **Steps** | 1. Navigate to /billing<br>2. Select Pro plan<br>3. Enter Stripe test card: 4242 4242 4242 4242<br>4. Complete payment |
| **Expected Result** | Subscription activated. Run limit removed. Sidebar updates to reflect Pro tier. |
| **Pass/Fail** | |
| **Notes** | Use Stripe test mode only |

---

## 8. Access Control

### TC-ACCESS-001: Builder persona sees correct modules in sidebar

| Field | Value |
|-------|-------|
| **Preconditions** | User with Builder persona |
| **Steps** | 1. Log in<br>2. Observe sidebar |
| **Expected Result** | Sidebar shows: Comply, Build, Quote, Direct, Train (5 modules) |
| **Pass/Fail** | |
| **Notes** | |

### TC-ACCESS-002: Consultant persona sees Comply only

| Field | Value |
|-------|-------|
| **Preconditions** | User with Consultant persona |
| **Steps** | 1. Log in<br>2. Observe sidebar |
| **Expected Result** | Sidebar shows: Comply only (1 module). Other modules not visible. |
| **Pass/Fail** | |
| **Notes** | |

### TC-ACCESS-003: Admin user has access to all modules

| Field | Value |
|-------|-------|
| **Preconditions** | User with Admin persona |
| **Steps** | 1. Log in<br>2. Observe sidebar |
| **Expected Result** | All 5 modules visible plus admin-specific options |
| **Pass/Fail** | |
| **Notes** | |

### TC-ACCESS-004: Trade persona sees Coming Soon state

| Field | Value |
|-------|-------|
| **Preconditions** | User with Trade persona |
| **Steps** | 1. Log in<br>2. Observe sidebar |
| **Expected Result** | All modules show as locked with "Coming Soon" label and lock icon |
| **Pass/Fail** | |
| **Notes** | |

---

## Sign-off

| Reviewer | Date | Status |
|----------|------|--------|
| Dennis McMahon | | |
| Karen Burns | | |
| Karthik Rao | | |

---

*Document version: 1.0*
*Last updated: 10 April 2026*
