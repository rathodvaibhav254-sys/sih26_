<div align="center">

# 🚆 RailMind AI

**AI-Assisted Railway Operations Decision-Support Dashboard**

Prototype built for **Smart India Hackathon 2026 — Problem Statement SIH26028**

[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2016-black?logo=next.js)](#)
[![Backend](https://img.shields.io/badge/Backend-Node.js%2020-339933?logo=node.js)](#)
[![Language](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript)](#)
[![UI](https://img.shields.io/badge/UI-React%2019%20%2B%20Tailwind-06B6D4?logo=tailwindcss)](#)
[![Status](https://img.shields.io/badge/Status-Prototype-yellow)](#)
[![License](https://img.shields.io/badge/License-Unlicensed-lightgrey)](#)

**🔗 Live Deployment:** [Frontend (Vercel)](https://sih26-eskwuvmhr-rathodvaibhav254-sys-projects.vercel.app/) · [Backend (Render)](https://sih26-23mf.onrender.com)

</div>

---

## ⚠️ Project Status & Disclaimer

> **RailMind AI is a research and hackathon prototype.** It operates on a **synthetic, simulated dataset** and is designed purely as a decision-support and visualization concept.
>
> It does **not** connect to, control, or influence any real railway signalling system, track infrastructure, train hardware, or live Indian Railways data feed. All train positions, delays, risk scores, and recommendations shown in the dashboard are generated from a static/simulated CSV dataset for demonstration purposes only.

---

## 📖 Overview

RailMind AI is a two-service web application that demonstrates how an AI-assisted operations dashboard could help railway controllers monitor network health, anticipate conflicts, and prioritize interventions. It pairs a rich, real-time-style **Next.js dashboard** with a lightweight **Node.js data API**, and layers an **LLM-powered operations assistant** on top for natural-language querying of the network state.

The project is intentionally simple at the infrastructure level (no database, no trained ML model) so that the UI/UX and decision-support workflow — the actual subject of the hackathon submission — can be evaluated on its own merits.

---

## ✨ Features

| Module | Description |
|---|---|
| **Overview** | High-level KPIs: active trains, network load, priority alerts |
| **Live Network** | Visual network/track diagram with junction and section status |
| **Train Operations** | Searchable, filterable live train list with speed, delay, and location |
| **Track & Junction Status** | Section-level occupancy and junction health indicators |
| **Conflict Detection** | Surfaces potential scheduling/track conflicts between trains |
| **ETA Forecast** | Delay-adjusted arrival estimates per train |
| **Scenario Simulator** | Interactive "what-if" exploration of network state |
| **Recommendations** | Rule-based suggested actions (e.g., hold, reroute, monitor) |
| **Analytics** | Network, train performance, and delay-cause breakdowns |
| **Railway Operations Assistant** | Conversational AI assistant (Groq/Llama 3) for querying network state |
| **System Logs & Settings** | Operational audit trail and configuration surface |

---

## 🏗️ Architecture

```
┌──────────────────────────┐        HTTPS         ┌───────────────────────────┐
│   Frontend (Vercel)      │  ───────────────────▶ │   Backend (Render)        │
│   Next.js 16 / React 19  │   GET /api/trains      │   Node.js HTTP server      │
│   TypeScript + Tailwind  │ ◀───────────────────── │   Serves synthetic CSV     │
│                           │        JSON            │   GET /health              │
│  /api/trains  (fallback) │                        └───────────────────────────┘
│  /api/chat    (Groq LLM) │
└──────────────────────────┘
```

- **Frontend** — Next.js App Router application deployed on **Vercel**. Renders the full operations dashboard and calls two internal API routes:
  - `GET /api/trains` — proxies the Render backend when `NEXT_PUBLIC_API_URL` is set, and transparently falls back to a bundled local CSV otherwise (so `npm run dev` works standalone).
  - `POST /api/chat` — forwards operator questions to the Groq Chat Completions API (Llama 3) with a system prompt that frames the model as the RailMind assistant.
- **Backend** — A dependency-free Node.js `http` server deployed on **Render**. Exposes `GET /api/trains` (parses and normalizes the synthetic dataset) and `GET /health` for uptime monitoring.
- **Data** — A synthetic CSV dataset (`trains.csv`) is duplicated in both `frontend/data/` and `backend/data/` so each service can run independently.

There is **no database, no persistent storage, and no trained ML model** in this checkout — delay/ETA/risk values are derived deterministically from the CSV via lightweight normalization logic.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI Library | React 19 |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 4, `tailwind-merge`, `tw-animate-css` |
| Component Kit | shadcn/ui (`base-nova` style), Radix-based `@base-ui/react` |
| Icons | lucide-react |
| AI Assistant | Groq API — `llama3-8b-8192` |
| Backend Runtime | Node.js ≥ 20 (native `http`, `fs/promises`) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render (Web Service / Blueprint) |
| Analytics | @vercel/analytics |

---

## 📁 Project Structure

```
railmind-ai/
├── frontend/                  # Next.js application (deployed to Vercel)
│   ├── app/
│   │   ├── api/trains/route.ts   # Backend proxy + local CSV fallback
│   │   ├── api/chat/route.ts     # Groq LLM assistant endpoint
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── railmind-dashboard.tsx  # Main dashboard shell (all views)
│   │   └── ui/                     # shadcn/ui primitives
│   ├── data/trains.csv          # Synthetic dataset (frontend copy)
│   ├── public/                  # Icons / static assets
│   ├── .env.example
│   ├── vercel.json
│   └── package.json
├── backend/                    # Node.js API (deployed to Render)
│   ├── server.js                # HTTP server: /api/trains, /health
│   ├── data/trains.csv          # Synthetic dataset (backend copy)
│   └── package.json
├── render.yaml                  # Render Blueprint configuration
├── DEPLOYMENT.md                 # Step-by-step deployment guide
├── package.json                  # Workspace-level convenience scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** and npm
- A [Groq API key](https://console.groq.com/) (free tier available) if you want the AI Assistant tab to work
- Git

### 1. Clone and install

```bash
git clone <repository-url>
cd railmind-ai

npm --prefix frontend install
npm --prefix backend install
```

### 2. Configure environment variables

Copy the example env file and fill in your own values — **never commit real keys**:

```bash
cp frontend/.env.example frontend/.env.local
```

`frontend/.env.local`:

```ini
# Leave empty to use the built-in Next.js /api/trains fallback locally
NEXT_PUBLIC_API_URL=

# Required for the AI Assistant tab — get a free key at console.groq.com
GROQ_API_KEY=your_groq_api_key_here
```

`backend` (set as real environment variables, not a file, when deploying):

```ini
PORT=10000
CORS_ORIGIN=http://localhost:3000
```

### 3. Run in development

In two terminals:

```bash
# Terminal 1 — frontend (http://localhost:3000)
npm --prefix frontend run dev

# Terminal 2 — backend (http://localhost:10000)
npm --prefix backend start
```

Or, from the repo root:

```bash
npm run dev        # frontend dev server
npm run backend     # backend server
```

With `NEXT_PUBLIC_API_URL` unset, the frontend automatically serves data from its own bundled CSV — no backend required for a quick UI-only run.

### 4. Production build

```bash
npm --prefix frontend run build
npm --prefix frontend run start
```

---

## 🌐 Deployment

RailMind AI is designed as **two independently deployable services**. Full step-by-step instructions are in [`DEPLOYMENT.md`](./DEPLOYMENT.md); summary below.

### Backend → Render

1. Create a new **Web Service** from this repository (or deploy `render.yaml` as a Blueprint).
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. **Health Check Path:** `/health`
6. Set the `CORS_ORIGIN` environment variable to your Vercel domain (comma-separate multiple origins for preview deployments).
7. Verify: `https://<your-render-service>.onrender.com/health` → `{ "status": "ok" }`
   Live instance: [https://sih26-23mf.onrender.com/health](https://sih26-23mf.onrender.com/health)

### Frontend → Vercel

1. Import the repository into Vercel.
2. **Root Directory:** `frontend` (auto-detected via `vercel.json`).
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://<your-render-service>.onrender.com` (no trailing slash)
   - `GROQ_API_KEY=<your key>`
4. Deploy, then update the Render `CORS_ORIGIN` with the final Vercel URL and redeploy the backend.
   Live instance: [https://sih26-eskwuvmhr-rathodvaibhav254-sys-projects.vercel.app/](https://sih26-eskwuvmhr-rathodvaibhav254-sys-projects.vercel.app/)
   *(Note: this is a per-deployment preview URL — Vercel generates a new one on each deploy unless you assign a stable production domain in project settings.)*

> **Note:** Render free-tier web services spin down after inactivity; the first request after idle may take several seconds while the instance cold-starts.

---

## 📡 API Reference

### Backend service (`backend/server.js`)

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Liveness probe — `{ "status": "ok", "service": "railmind-backend" }` |
| `GET` | `/api/trains` | Returns `{ "trains": [...] }` parsed from the synthetic CSV |
| `OPTIONS` | `*` | CORS preflight |

### Frontend routes (`frontend/app/api/*`)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/trains` | Proxies the Render backend when `NEXT_PUBLIC_API_URL` is set; falls back to the local bundled CSV otherwise |
| `POST` | `/api/chat` | Body: `{ "messages": [...], "context": { "trains": number, "alerts": number } }`. Forwards to the Groq Chat Completions API and returns `{ "reply": string }` |

### Train record schema

Each train object returned by `/api/trains` contains:

```
record_id, train_number, train_name, origin_station_code, origin_station,
destination_station_code, destination_station, journey_date, scheduled_departure,
delay_minutes, train_status, delay_cause, passenger_count, occupancy_percent,
platform_number, weather_condition, temperature_c, visibility_m, risk_score,
risk_level, maintenance_flag, crowd_alert, anomaly_detected, eta_delay_minutes,
recommended_action
```

---

## 🔒 Security Notes

- **Do not commit real API keys.** `frontend/.env.local` is git-ignored by default (`.gitignore`) — always configure secrets through your hosting provider's environment variable settings (Vercel/Render dashboards), never in source files.
- The current codebase contains a **hardcoded Groq API key fallback** inside `frontend/app/api/chat/route.ts` (used only if `GROQ_API_KEY` is unset). This should be removed before any public release, and the exposed key should be **rotated immediately** in the Groq console, since it is visible to anyone with read access to the repository.
- CORS on the backend currently returns `Access-Control-Allow-Origin: *` regardless of the configured `CORS_ORIGIN` value — tighten `getAllowedOrigin()` in `server.js` to echo back only origins present in the allow-list before production use.
- Treat the dashboard as **display-only tooling**: it has no authentication layer and should not be exposed on a public URL without adding access control if it will ever handle non-synthetic data.

---

## 🧪 Known Limitations

- Train, delay, and risk data is **synthetic** and duplicated across `frontend/data/` and `backend/data/` — the two copies can drift if only one is updated.
- No persistent database, message queue, or trained ML model is used; "predictions" are deterministic transformations of the CSV.
- No authentication/authorization on either service.
- No automated test suite is currently included.
- Render's free tier may introduce cold-start latency after idle periods.

---

## 🗺️ Roadmap Ideas

- [ ] Replace CSV storage with a proper database (PostgreSQL/SQLite) and a single source of truth for train data
- [ ] Introduce an authenticated operator login and role-based access
- [ ] Replace the rule-based recommendation logic with a trained model
- [ ] Add automated tests (unit + integration) and CI
- [ ] WebSocket/streaming updates for true real-time train positions
- [ ] Remove hardcoded credentials and add secret-scanning to CI

---

## 🤝 Contributing

1. Fork the repository and create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and test locally with both services running
3. Commit using clear, conventional messages
4. Open a pull request describing the change and testing performed

---

## 📄 License

No license file is currently included in this repository. Add a `LICENSE` file to clarify usage terms before distributing or open-sourcing this project.

---

## 👥 Team / Acknowledgements

Built for **Smart India Hackathon 2026**, Problem Statement **SIH26028** (railway operations decision support).

<div align="center">

**RailMind AI** — a prototype exploring AI-assisted railway operations intelligence.

</div>
