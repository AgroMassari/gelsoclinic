# Dra. Gelso · Medicina Estética

Catálogo web premium de medicina estética integral para la Dra. María Pía Gelso, con tratamientos, ubicación y agenda de turnos.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/dra-gelso-clinic/src/App.tsx` — landing page, navigation, treatment catalog, contact links.
- `artifacts/dra-gelso-clinic/src/index.css` — visual language, typography, responsive behavior, motion.
- `artifacts/dra-gelso-clinic/public/assets/` — supplied Gelso logo, portrait and reference images.

## Architecture decisions

- The first version is a frontend-only presentation site; appointment requests go directly to WhatsApp, phone, and Instagram.
- Treatment content is grouped into expandable categories to keep the landing page readable while preserving the full service catalog.
- The visual system uses an editorial serif/sans pairing, near-black espresso surfaces, champagne gold, and warm cream sections to match the supplied references.

## Product

- Single-page presentation of Dra. Gelso's medical aesthetic practice.
- Responsive treatment catalog with descriptions for every requested service.
- Direct appointment actions for WhatsApp (`3572 665637`), phone, and Instagram (`@Dra.gelso`).

## User preferences

- The user requested a premium black/champagne-gold visual identity based on the supplied Gelso references.
- Public-facing copy is in Spanish and should preserve the supplied treatment names and medical disclaimers.

## Gotchas

- The artifact uses the root preview path `/`; keep internal links hash-based so the single-page navigation remains compatible with the current router.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
