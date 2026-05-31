# Cirkev Kopeckého · Church of Kopecky

> *He Descended. He Taught. He Left. He Was Correct. He Will Return.*

A React-powered interactive site documenting the teachings, grudges, and Laws of Chudhood as attributed to Kopecky of Prvá Dolina, Ancient Slovakia.

## Stack

- **React 18** — component logic & interactivity
- **Vite 5** — build tooling
- **Cloudflare Pages** — hosting & edge delivery

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build → ./dist
npm run build

# Preview production build locally
npm run preview
```

## Deployment

### Option A — GitHub Actions (Automatic)

1. Push this repo to GitHub
2. Go to **Settings → Secrets and variables → Actions** and add:
   - `CLOUDFLARE_API_TOKEN` — from [Cloudflare Dashboard → My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) (use the *Edit Cloudflare Workers* template)
   - `CLOUDFLARE_ACCOUNT_ID` — from the right sidebar of your Cloudflare dashboard home
3. Every push to `main` will automatically build and deploy

### Option B — Cloudflare Pages Git Integration (No workflow needed)

1. Push this repo to GitHub
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages → Create a project → Connect to Git**
3. Select your repository
4. Set build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**

Cloudflare will auto-deploy on every push to `main`.

### Option C — Manual (Wrangler CLI)

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name=kopecky-church
```

## Project Structure

```
kopecky-church/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── public/
│   ├── favicon.svg
│   ├── _redirects              # SPA fallback route
│   └── _headers                # Security + cache headers
├── src/
│   ├── KopeckyChurch.jsx       # Main React component
│   └── main.jsx                # React entry point
├── index.html                  # Vite HTML shell
├── vite.config.js
├── wrangler.toml               # Cloudflare Pages config
├── package.json
└── .gitignore
```

## The Satchel

The contents of the satchel are not documented here.  
Do not ask about the satchel.  
He would know.
