# Gelso Clinic — Sitio web

Sitio de **Dra. María Pía Gelso** (medicina estética integral). Código fuente en `artifacts/dra-gelso-clinic`.

## Desarrollo local

```bash
pnpm install
cd artifacts/dra-gelso-clinic
$env:PORT="5173"
$env:BASE_PATH="/"
pnpm run dev
```

## Build

```bash
cd artifacts/dra-gelso-clinic
$env:PORT="4173"
$env:BASE_PATH="/"
pnpm run build
```

## Publicación

Al hacer push a `main`, GitHub Actions construye el sitio y lo publica en **GitHub Pages** (dominio configurado: `gelsoclinic.com`).

En el repositorio: **Settings → Pages → Build and deployment → GitHub Actions**.

### Vercel

El repo incluye `vercel.json` para el monorepo (pnpm + app en `artifacts/dra-gelso-clinic`). Al conectar el repositorio en Vercel:

1. Dejá **Root Directory** vacío (raíz del repo).
2. Verificá que detecte **pnpm** y use el `buildCommand` del `vercel.json`.
3. En **Settings → Environment Variables**, opcionalmente podés fijar `PORT=4173` y `BASE_PATH=/` (ya están en el build).
4. Para `gelsoclinic.com`: **Settings → Domains** → agregar dominio y configurar DNS según Vercel.
