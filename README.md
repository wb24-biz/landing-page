# WB24 Landing

Multilingual landing page for [WB24](https://wb24.biz) — a cloud platform for vending machine management with telemetry, online payments and fiscalization (PRRO).

Built as a fully static Next.js site exported to plain HTML/JS — no SSR or ISR at runtime.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui** (New York, Radix-based) + **CVA** for variants
- **next-intl** for i18n (Ukrainian default, English, Russian)
- **React Query** + **Axios** for API state
- **React Hook Form** + **Zod** for forms
- **Sonner** for toasts

## Requirements

- Node.js 20+
- npm (local) / yarn (CI)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in API endpoints
npm run dev                  # http://localhost:3000
```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Static export to `./dist` |
| `npm run lint` | ESLint |
| `npm run serve` | Serve `./dist` locally via `npx serve` |

There is no test suite — `npm test` just runs `next build`.

## Project structure

Screaming Architecture — features are organized by domain:

```
src/
├── app/                  # Next.js App Router entry (layout, page)
├── features/             # Domain features
│   ├── header/
│   ├── hero/
│   ├── pricing/
│   ├── footer/
│   └── ...
│       ├── index.tsx     # public export
│       ├── model/        # hooks, schemas, business logic
│       └── ui/           # presentational components
├── shared/
│   ├── ui/kit/           # shadcn/ui components
│   ├── api/              # React Query client config
│   ├── lib/utils.ts      # cn() and helpers
│   └── model/config.ts   # CONFIG.API_BASE_URL from env
├── i18n/                 # next-intl setup, locale persistence
└── components/seo/       # SEO / structured data

messages/                 # Translation JSON (en, ua, ru)
public/                   # Static assets (logos, icons, integrations)
```

## i18n

Default locale is `ua`. Locale is persisted in `localStorage` and injected pre-hydration via `src/i18n/locale-script.tsx` to prevent a flash of wrong language. Locales: `ua`, `en`, `ru`.

When adding translatable text, update **all three** message files in `messages/`. In components, use `useTranslations("Namespace")`.

## API

API hooks live in feature `model/` directories (e.g. `use-fetch-tariffs.ts`, `use-connect-registration.ts`) and use Axios against `CONFIG.API_BASE_URL`. Form schemas are co-located (e.g. `register-network-schema.ts`) with localized error messages.

## Environment variables

```
NEXT_PUBLIC_API_BASE_URL    # production API endpoint
NEXT_PUBLIC_API_DEV_URL     # dev API endpoint
NEXT_PUBLIC_BASE_URL        # site base URL (used in SEO and sitemap)
```

## Static export

`next.config.ts` sets `output: "export"` and `distDir: "dist"`. The homepage (`src/app/page.tsx`) loads feature sections via `next/dynamic` with `{ ssr: false }`, so all interactive content is client-rendered.

## Deployment

GitHub Actions CI on push or PR to `main`:

1. `yarn install && yarn build`
2. `rsync` the resulting `./dist` to the production VPS at `/opt/landing24/`

Nginx on the server reverse-proxies the static site with SSL provisioned via certbot.
