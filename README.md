# CareCircle - Elderly Care & Medication Management Platform
> **PromptWars x Catalyst | Google for Developers | MnM Build with AI**

CareCircle is a smart, interconnected healthcare management platform designed specifically for elderly individuals, their family members, and caregivers. It transforms routine medication schedules and doctor visits into an accessible, dignified, and collaborative ecosystem.

---

## 🌟 Why CareCircle Goes Beyond a Basic Reminder App

1. **"Grandpa Mode" Senior Kiosk (WCAG 2.1 AAA Target)**
   - Oversized **60px tactile touch targets** designed for tremors and reduced motor dexterity.
   - High-contrast toggle (exceeding 7.0:1 ratio) and scalable typography (up to 150%).
   - One-tap *"I Took This Pill"* confirmation with cheerful audio chime.
   - Hands-free voice check-in using the **Web Speech API** (*"I took my blood pressure tablet"*).

2. **Multimodal "Snap & Check" Pill Lens (Gemini Vision AI)**
   - Seniors point their device camera at a pill blister pack or prescription bottle.
   - Multimodal AI verifies the drug name, dosage, and inspects for clinical food-drug interactions before ingestion.

3. **Role-Based Passcode Security Model**
   - **Senior Kiosk PIN (`1234`)**: Unlocks Eleanor Vance's clutter-free daily care screen.
   - **Primary Caregiver Passcode (`9876`)**: Unlocks Dr. Sarah Vance's full schedule & analytics suite.
   - **Family Circle Passcode (`5555`)**: Unlocks grandson Leo Vance's view & companion feed.
   - Salted hashes with constant-time cryptographic verification to eliminate timing attacks.

4. **Proactive Tiered Caregiver Escalation & Email Engine**
   - Proactively sends automated email reminders for upcoming doses and doctor visits.
   - If a medication window elapses without senior confirmation, the system triggers a **Critical Missed Dose Escalation** email to the caregiver circle.
   - Built-in **"⚡ Simulate Missed Dose Alert"** button allowing evaluators to verify the live notification loop in seconds.

5. **Integrated Doctor Appointment & Prep Companion**
   - Calendar management for specialist visits (Cardiology, Endocrinology).
   - Pre-appointment fasting notes and family companion assignments.

---

## 🏗️ Architecture & Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS + Shadcn / Radix primitives + Lucide Icons
- **Validation**: Zod schema validation on 100% of API endpoints
- **AI**: Google Gemini 1.5/2.0 Flash Multimodal Vision
- **Testing**: Vitest + JSDOM + React Testing Library (14 automated unit, security, and adherence tests)

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Automated Test Suite
```bash
npm test
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 🧪 Quick Hackathon Demo Passcodes

| Role | Name | Demo Passcode | View Description |
| :--- | :--- | :--- | :--- |
| **Senior** | Eleanor Vance (Age 78) | `1234` | Oversized Kiosk, Voice Check-in, Pill Lens, Today's Schedule |
| **Caregiver** | Dr. Sarah Vance (Daughter) | `9876` | Full CRUD Schedule Builder, Adherence Analytics, Email Escalation |
| **Family** | Leo Vance (Grandson) | `5555` | Family Cheer & Companion Feed |

---

## 📄 License
MIT License. Built with Anti-Gravity for PromptWars x Catalyst 2026.
