# RailMind AI

RailMind AI is a railway operations decision-support prototype for SIH26028. The current checkout is a two-service JavaScript application: a Next.js operations dashboard and a small Node.js HTTP API serving a synthetic train dataset.

> This is a research prototype using synthetic/simulated railway data. It does not directly control railway signalling, tracks, trains, or locomotive operations.

## Features

- Operations dashboard with network, train, track, junction, conflict, ETA, analytics, recommendations, settings, and assistant views
- Synthetic train dataset loaded through the Next.js fallback API or the Node backend
- Client-side dashboard simulation and scenario interactions
- Health endpoint for deployment monitoring

## Technology

- Next.js 16 and React 19
- Node.js 20 or newer
- TypeScript
- Plain Node.js HTTP backend
- CSV-based synthetic data

There is no Python, Streamlit, SQLite, or trained ML artifact in this checkout. Delay and ETA values are normalized from the synthetic CSV data; this is not a production ML model or a live Indian Railways integration.

## Project structure

```text
frontend/              Next.js application deployed to Vercel
  app/                 App Router pages and fallback API route
  components/          RailMind dashboard UI
  data/trains.csv      Synthetic train dataset
backend/               Node.js API deployed to Render
  server.js            HTTP server and health/API endpoints
  data/trains.csv      Backend copy of the synthetic dataset
render.yaml            Render Blueprint configuration
DEPLOYMENT.md          Vercel and Render deployment instructions
```

## Local development

Install dependencies and start the services separately:

```powershell
npm --prefix frontend install
npm --prefix backend install
npm --prefix frontend run dev
npm --prefix backend start
```

The frontend uses its local `/api/trains` fallback when `NEXT_PUBLIC_API_URL` is empty. Copy [frontend/.env.example](frontend/.env.example) to a local environment file when connecting the dashboard to the backend.

Production frontend build:

```powershell
npm --prefix frontend run build
npm --prefix frontend run start
```

## Deployment

### Vercel

Import the repository, set the project root to `frontend`, and configure:

```text
NEXT_PUBLIC_API_URL=https://YOUR-RENDER-SERVICE.onrender.com
```

### Render

Deploy the backend as a Web Service using [render.yaml](render.yaml), or configure:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
Health Check Path: /health
```

Set `CORS_ORIGIN` to the Vercel URL. Multiple origins may be comma-separated for preview deployments. See [DEPLOYMENT.md](DEPLOYMENT.md) for the complete sequence.

## Limitations

- Data is synthetic and duplicated for the two services.
- The dashboard simulation is a prototype and does not represent a live railway control system.
- There is no persistent database, trained ML model, or real-time railway integration.
- Render free-tier services may sleep and have limited resources.
- SQLite, PostgreSQL, and external AI credentials are not used by this checkout.
