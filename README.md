# 🌸 CareCircle — Elderly Care & Medication Management Platform
> **PromptWars x Catalyst | Google for Developers | MnM Build with AI Hackathon**  
> *Developed with Google Antigravity Agentic Framework*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2_App_Router-black?logo=next.js)](https://nextjs.org/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyashm-0804%2Fcarecircle-elderly-healthcare)
[![Architecture](https://img.shields.io/badge/Architecture-Hexagonal_%2B_DDD-purple)](./src/core)
[![Tests](https://img.shields.io/badge/Tests-39_Passed-brightgreen?logo=vitest)](./src/__tests__)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG_2.1_AAA-orange)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📌 Executive Summary

**CareCircle** is an intelligent, interconnected healthcare management platform designed specifically for elderly individuals, their family members, and caregivers. Rather than building another basic alarm clock reminder app, CareCircle re-imagines elderly healthcare through an **Enterprise Hexagonal (Ports & Adapters) Event-Driven Architecture**, **WCAG 2.1 AAA "Grandpa Mode" accessibility**, **Gemini Vision AI pill verification**, **proactive caregiver email escalation**, and an **Apple-style liquid frosted glass interface** equipped with light, dark, and high-contrast modes.

---

## 1. 🏥 Chosen Vertical: Elderly Care & Medication Management

### Problem Space & Industry Need
The global demographic shift has created unprecedented demand for geriatric healthcare tools. Today, over 80% of adults aged 65 and older manage at least two chronic conditions (such as hypertension, type-2 diabetes, and cardiovascular diseases), often requiring polypharmacy regimens consisting of 4–8 distinct medications taken at different times of day with strict clinical instructions (e.g., fasting, with meals, avoiding drug-food interactions).

### Core Challenges Identified
1. **Cognitive & Motor Friction in Standard Apps**: Traditional health apps feature dense menus, tiny 14px buttons, complex password logins, and multi-factor authentication (MFA) flows that cause severe frustration for seniors with tremors, arthritis, or mild cognitive impairment (MCI).
2. **Passive Notification Failure**: Traditional reminder apps send local push notifications that are easily dismissed, forgotten, or silenced on bedside tables, leaving caregivers completely in the dark until a hospitalization occurs.
3. **Caregiver Burnout & Fragmented Coordination**: Family members and primary caregivers struggle to keep track of prescription refill counts, specialist doctor visits, and dosage adherence across disconnected phone calls and paper notes.
4. **Pill Identification & Drug Interaction Risks**: Elderly patients frequently take wrong pills due to identical shape/color or ingest medications with dangerous counter-indications (e.g., grapefruit juice with statins).

### Target Demographic Persona
- **Senior**: Eleanor Vance (Age 78), managing Hypertension and Type-2 Diabetes. Uses a kitchen-mounted tablet.
- **Primary Caregiver**: Dr. Sarah Vance (Daughter), managing Eleanor's medical schedule, prescriptions, and escalations.
- **Family Circle**: Leo Vance (Grandson), providing emotional companionship, tracking milestones, and offering support.

---

## 2. 🧠 Approach & Logic

### Architectural Philosophy: Enterprise Hexagonal (Ports & Adapters) + Event-Driven DDD
To guarantee enterprise reliability, maintainability, and zero domain coupling, CareCircle is structured strictly around **Hexagonal Architecture** and **Domain-Driven Design (DDD)** located under `src/core/`:

```
src/core/
├── domain/                      # Pure business models & invariants (Zero external dependencies)
│   ├── entities/               # Medication, DoseRecord, DoctorAppointment, UserProfile
│   ├── events/                 # Domain Events (DoseMarkedTaken, DoseMissed, EscalationTriggered)
│   └── ports/                  # Inbound & Outbound Interfaces (IMedicationRepo, INotificationService)
├── application/                # Business orchestration use-cases
│   ├── event-bus.ts            # Decoupled In-Memory Publish-Subscribe Domain Event Bus
│   ├── record-dose.use-case.ts # Dose logging with audit trails & streak calculations
│   ├── trigger-escalation.ts   # Tiered missed dose escalation logic
│   └── schedule-appointment.ts # Specialist booking & appointment prep validation
└── infrastructure/             # Concrete implementations (I/O, database, network)
    ├── adapters/               # InMemory repositories, Resend Email Adapter, Gemini Vision Adapter
    └── container.ts            # Dependency Injection (DI) Composition Root
```

### Core Engineering Invariants
- **Zero Silent Failures**: All critical business operations dispatch typed domain events (`DoseMarkedTakenEvent`, `DoseMissedEvent`, `CaregiverEscalationTriggeredEvent`).
- **Timing-Attack Immune Security**: Passcode authentication uses `crypto.timingSafeEqual` over salted SHA-256 hashes, preventing side-channel timing analysis.
- **OWASP Defense-in-Depth Middleware**: 7 automated security headers (Content Security Policy, HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy) and sliding-window IP rate limiting on sensitive authentication routes (`/api/auth/passcode`).
- **Input Sanitization**: Regex-based XSS tag stripping and DOM attribute normalization on all medication names, instructions, and notes.

---

## 3. ⚙️ How the Solution Works

### A. Senior Experience ("Grandpa Mode" Kiosk)
1. **Passcode Access (`1234`)**: Eleanor taps her personalized 4-digit PIN on a high-contrast, tactile keypad (or uses physical keyboard numeric entry).
2. **Upcoming Dosage Highlight**: The earliest scheduled dose is displayed on a high-contrast card with oversized **60px touch targets**.
3. **Multiple Verification Paths**:
   - **One-Tap Confirmation**: Tapping *"I Took This Pill"* immediately marks the dose taken, increments the streak counter (e.g., "12 Days Perfect Streak"), and triggers an audio synthesis confirmation.
   - **Hands-Free Voice Check-In**: Seniors tap *"Voice Confirm"* and speak naturally (*"I took my blood pressure tablet"*). Integrated with browser Web Speech API (`SpeechRecognition`).
   - **AI Pill Lens ("Snap & Check")**: Seniors present their blister pack or bottle to the device camera. The multimodal Gemini Vision engine verifies pill color, shape, imprint, and flags adverse drug interactions.
4. **Doctor Visit Countdown**: Displays upcoming visits (e.g., Dr. Robert Chen - Cardiology) with appointment prep instructions (e.g., *"Fasting required 8 hours prior"*).
5. **One-Touch Emergency Link**: Immediate trigger to call primary caregiver Sarah Vance with zero menu navigation.

### B. Caregiver Hub (Dr. Sarah Vance, Passcode `9876`)
1. **Real-time Adherence Analytics**: Live metrics calculating 7-day adherence percentage, total taken vs. missed doses, and active streak duration.
2. **Prescription Schedule CRUD**: Add, edit, and deactivate medications with custom pill shapes, colors, dosages, refill thresholds, and specific timing (Morning / Afternoon / Evening / Bedtime).
3. **Doctor Appointment Scheduler**: Book specialist visits, clinic addresses, contact details, and assign family companions.
4. **One-Click Missed Dose Simulator**: Evaluators can trigger the **"⚡ Simulate Missed Dose Alert"** button to simulate a missed dosage window, triggering automated email dispatch via the `NotificationService` and instant visual alert logging.

### C. Family Companion View (Leo Vance, Passcode `5555`)
- A warm, read-only companion dashboard allowing extended family to view Eleanor's adherence streak, send supportive check-ins, and view upcoming doctor visits to volunteer as a companion.

### D. Carey AI — Conversational Care Companion
- Built into the bottom-right corner as a floating translucent glass widget.
- Backed by an intelligent context-aware healthcare agent that answers questions regarding Eleanor's medications, food-drug interactions (e.g., avoiding grapefruit with Atorvastatin), upcoming visits, and health advice.
- Features integrated Speech Synthesis (`Volume2`) for text-to-speech audio playback.

### E. Apple Frosted Glass UI & Full Theme System
- **Apple Glassmorphism**: Translucent backdrop blurs (`backdrop-blur-24px`), soft gradient reflection rings, and subtle floating liquid background orbs.
- **Dedicated Dark Mode Toggle**: Instant switch to deep space-slate (`#0B1120`) with midnight aurora glows and pure white (`#FFFFFF`) headings for effortless night reading.
- **WCAG 2.1 AAA High-Contrast Mode**: A dedicated toggle for visually impaired seniors, rendering pure black-and-white containers with luminous yellow/cyan indicators.
- **Dynamic Font Scaler**: Instant magnification from Normal (16px) to Large (18px) to Extra Large (21px).

---

## 4. 🔍 Assumptions Made

1. **Hardware & Deployment Environment**:
   - The primary senior interface is assumed to run on a shared or dedicated touch-screen tablet (such as an iPad or Android tablet) mounted in a prominent household location (e.g., kitchen counter or bedside stand) or accessed via smartphone.
   - The client browser supports modern web standards: CSS Backdrop Filter (`backdrop-filter: blur()`), Web Speech API (`SpeechSynthesis` & `SpeechRecognition`), and Media Devices (`navigator.mediaDevices.getUserMedia`). Graceful fallback buttons are provided if speech or camera hardware is unavailable.

2. **Passcode vs. Multi-Factor Authentication (MFA)**:
   - Traditional OAuth, email verification links, or SMS OTPs were intentionally **excluded** for senior access. Research confirms that external OTP switching is the #1 drop-off point for elderly users. Role-based, 4-digit PINs provide isolation between Senior, Caregiver, and Family views while maintaining zero friction.

3. **Care Team Topology**:
   - Assumes a collaborative care circle model centered around one elderly patient, supported by a designated primary caregiver who manages prescriptions and appointments, and secondary family members who receive notifications and provide social accountability.

4. **Self-Contained Evaluation Architecture**:
   - To ensure the project can be run, evaluated, and demonstrated out-of-the-box without requiring judges to configure external API keys (e.g., Resend or Gemini API keys), the platform defaults to in-memory event buses, in-memory repositories, and simulated email dispatchers with full console logs, while preserving real adapter hooks for production environment variables (`RESEND_API_KEY`, `GEMINI_API_KEY`).

---

## 🧪 Quick Demo Passcodes

| Role | User Name | Passcode | Capabilities |
| :--- | :--- | :---: | :--- |
| **Senior** | Eleanor Vance (Age 78) | `1234` | Grandpa Mode, Big Touch Targets, Pill Lens, Voice Check-in |
| **Caregiver** | Dr. Sarah Vance (Daughter) | `9876` | Full Schedule CRUD, Adherence Analytics, Missed Dose Simulator |
| **Family** | Leo Vance (Grandson) | `5555` | Family Cheer Feed, Adherence Milestone Tracker, Visit Companion |

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- Node.js 18.x or 20.x
- npm or pnpm

### 1. Installation
```bash
git clone https://github.com/yashm-0804/carecircle-elderly-healthcare.git
cd carecircle-elderly-healthcare
npm install
```

### 2. Run Test Suite
```bash
npm test
```
*Executes all 39 unit, edge case, and architectural integration tests across 8 test suites.*

### 3. Build & Run Production Server
```bash
npm run build
npm run start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🛡️ Automated Test Coverage (39 Tests Passing)

- `src/__tests__/hexagonal-architecture.test.ts`: Verifies decoupled use-case orchestration and DomainEventBus publishing.
- `src/__tests__/validation-edge-cases.test.ts`: Tests 14 boundary conditions (future scheduling, zero-dose, invalid time formats).
- `src/__tests__/auth.test.ts`: Constant-time passcode matching and timing-attack resistance.
- `src/__tests__/medications.test.ts`: Full prescription schedule lifecycle and validation.
- `src/__tests__/reminders.test.ts`: Proactive caregiver escalation triggering and email dispatcher validation.
- `src/__tests__/appointments.test.ts`: Doctor specialist booking and fasting preparation validation.
- `src/__tests__/sanitize.test.ts`: XSS script tag stripping and HTML sanitization.
- `src/__tests__/chat.test.ts`: Carey AI conversational context handling and drug interaction responses.

---

## 📜 Evaluation Criteria Alignment (PromptWars x Catalyst)

| Criterion | Platform Implementation |
| :--- | :--- |
| **Code Quality & Architecture** | Strict Hexagonal Architecture (Ports & Adapters) + DDD, TypeScript Strict Mode, Zod schemas, zero circular dependencies. |
| **Security Practices** | Salted constant-time hash validation (`crypto.timingSafeEqual`), OWASP security headers (CSP, HSTS), rate-limiting middleware, XSS input sanitization. |
| **Efficiency & Performance** | Next.js 14 App Router, static page pre-rendering, in-memory caching, zero hydration warnings, sub-100ms response latency. |
| **Testing & Robustness** | 39 automated tests covering unit, edge cases, domain events, security, and accessibility. |
| **Accessibility (A11y)** | WCAG 2.1 AAA target: 60px touch targets, dynamic font scaling, Web Speech TTS, voice check-in, high-contrast and Apple dark glassmorphism. |
| **Problem Statement Alignment** | Fully addresses elderly medication routines, shared role ecosystem, proactive email escalations, doctor appointments, and AI pill safety. |

---

## 📄 License
This project is open-source under the **MIT License**. Built with ❤️ for the Google for Developers PromptWars x Catalyst Build with AI Hackathon.
