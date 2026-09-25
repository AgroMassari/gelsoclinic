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
