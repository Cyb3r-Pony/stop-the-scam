<div align="center">
<img width="1200" height="475" alt="StopTheScam Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🛡️ Stop The Scam (Спри Измамата)
### Authoritative Investment Fraud Prevention & Crypto Scam Awareness Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📖 Overview

**Stop The Scam** is a public-interest web application designed to protect citizens from the rising tide of investment fraud and cryptocurrency scams. It serves as a central hub for authoritative guidance, providing real-time access to blacklisted domains and educational resources.

## 🎨 Design System

The platform runs on **two surface families**, so the interface always tells you what kind of
information you are looking at:

- **Light institutional surfaces** — guidance, education, registers and training. Generous
  whitespace, hairline borders, no decoration competing with the content.
- **Dark operational surfaces** — live threat data, examined specimens and the emergency
  protocol. Monospace typography, terminal-style panel headers, live status indicators.

**Colour carries meaning and is never decorative:**

| Colour | Meaning | Used for |
|--------|---------|----------|
| 🔴 Red | Danger | Losses, blacklisted domains, malicious verdicts, emergency response |
| 🟠 Orange | Alarm | Scam mechanics, warning signs, suspicious verdicts |
| 🟡 Amber | Exposure | Fraud categories and real-world examples |
| 🟢 Emerald | Defence | Protection measures, verified and safe verdicts |
| 🔵 Blue | Knowledge | Brand, navigation, the Lab, official registers |
| 🟦 Cyan | Live signal | Automated phishing detection feed |

## ✨ Key Features

- **🔍 Live Domain Blacklist**: Searchable database of fraudulent domains (sourced from GDCOC-MoI data).
- **📡 Phishing Detector**: Automated real-time feed of phishing domains targeting Bulgarian users.
- **🧪 Scam Detection Lab**: Realistic specimens — emails, SMS, fake platforms — to classify as safe, suspicious, or malicious, each with a full breakdown.
- **🧠 Social Engineering**: The psychological levers and attack techniques behind every scam.
- **📊 Security Quiz**: Risk assessment tailored to three profiles, with a personalised action plan.
- **📑 Official Registers**: Direct access to local (FSC, BNB) and international (ESMA, FINRA, FCA) regulatory databases.
- **🚨 Victim Emergency Guide**: Clear, step-by-step instructions for victims to take immediate action.
- **🌐 Trilingual**: Fully localized in **Bulgarian**, **English**, and **German**.

## 🚀 Tech Stack

- **Frontend**: React 19 (ESM)
- **Styling**: Tailwind CSS — shared design-system primitives in `components/ui.tsx`
- **Animations**: Native HTML5 Canvas, scoped to the operational zone (24 FPS, respects `prefers-reduced-motion`)
- **Typography**: Inter (Institutional) & IBM Plex Mono (Technical/Data)

## 🛠️ Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS)

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/stop-the-scam.git
   cd stop-the-scam
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env.local` file and add your Gemini API key:
   ```env
   process.env.API_KEY=your_actual_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## ⚖️ Disclaimer

This platform is for **educational and preventive purposes only**. The data provided is synchronized with the official records of the **Cybercrime Directorate (GDCOC-MoI)**. Users are encouraged to always verify licenses directly with official regulators before making financial decisions.

---

<div align="center">
  <sub>Built for public safety and financial integrity.</sub>
</div>