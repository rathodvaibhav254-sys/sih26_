# RailMind deployment

The repository uses two deployable services:

- **Frontend:** the Next.js app in `frontend/`, deployed to Vercel.
- **Backend:** `backend/`, a Node HTTP service, deployed to Render.

## Render backend

1. Create a new Render **Web Service** from this repository, or use the included `render.yaml` as a Blueprint.
2. Set **Root Directory** to `backend`.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `npm start`.
5. Add `CORS_ORIGIN` with the public Vercel URL. Multiple origins can be supplied as a comma-separated list if preview deployments also need API access.
6. Deploy and confirm `https://YOUR-RENDER-URL/health` returns `{ "status": "ok" }`.

`render.yaml` contains the same service configuration for Render Blueprint deployments.

## Vercel frontend

1. Import the same repository into Vercel.
2. Set **Root Directory** to `frontend`. The included `frontend/vercel.json` pins the project to the Next.js framework.
3. Keep the default Next.js install and build commands.
4. Add `NEXT_PUBLIC_API_URL` with the public Render URL, without a trailing slash.
5. Redeploy after setting the variable, then update Render's `CORS_ORIGIN` with the final Vercel URL.

The frontend falls back to the local Next.js `/api/trains` route when `NEXT_PUBLIC_API_URL` is empty, so local development still works with `npm run dev`.
