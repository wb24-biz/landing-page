# WB24 Landing Page

Лендінг для платформи **WB24** — хмарного сервісу керування вендинговими автоматами (телеметрія, онлайн-оплата, фіскалізація через ПРРО).

Сайт: [https://wb24.biz](https://wb24.biz)

## Стек

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Static export** (`output: "export"`) — сайт генерується як статичні HTML/JS/CSS і роздається через Nginx
- **Tailwind CSS v4** + **shadcn/ui** (Radix-based, New York style)
- **next-intl** — мультимовність (`ua` за замовчуванням, `en`, `ru`), перемикання на клієнті через `localStorage`
- **React Query** + **Axios** — робота з API
- **React Hook Form** + **Zod** — форми та валідація
- **Sonner** — toast-нотифікації

## Архітектура

Screaming Architecture — фічі організовані за доменом у `src/features/`:

```
src/
  app/            Next.js App Router (layout, page, robots, sitemap)
  features/       Доменні модулі (hero, pricing, telemetry, ...)
    {feature}/
      index.tsx     публічний експорт
      model/        хуки, схеми, бізнес-логіка
      ui/           презентаційні компоненти
  shared/
    api/          React Query клієнт, Axios
    lib/          утиліти (cn, тощо)
    model/        конфіг (CONFIG.API_BASE_URL)
    ui/kit/       shadcn/ui компоненти
  i18n/           next-intl, routing, locale-script
  components/seo/ structured-data (JSON-LD)
messages/         en.json, ua.json, ru.json
```

## Команди

```bash
npm run dev      # dev-сервер з Turbopack (http://localhost:3000)
npm run build    # статична збірка в ./dist
npm run lint     # ESLint
npm run serve    # локально роздати ./dist через npx serve
```

## Змінні оточення

Створи `.env` (або `.env.local`):

```env
NEXT_PUBLIC_API_BASE_URL="https://my.wb24.biz/api/v1"
NEXT_PUBLIC_API_DEV_URL="https://dev.wb24.biz/api/v1"
NEXT_PUBLIC_BASE_URL="https://wb24.biz"
```

`NEXT_PUBLIC_BASE_URL` використовується в `sitemap.xml`, `robots.txt`, canonical-посиланнях, OG-метатегах та JSON-LD.

## i18n

- Локалі: `ua` (default), `en`, `ru`
- Перемикання — клієнтське, локаль зберігається в `localStorage` (ключ `NEXT_LOCALE`)
- Щоб не було flash of wrong language, `src/i18n/locale-script.tsx` встановлює `<html lang>` до гідрації
- При додаванні нових текстів — оновлюй усі три файли в `messages/`

## API

Хуки лежать у `src/features/{feature}/model/` (наприклад, `use-fetch-tariffs.ts`). Запити йдуть через Axios на `CONFIG.API_BASE_URL`. Zod-схеми форм (наприклад, `register-network-schema.ts`) містять локалізовані повідомлення про помилки.

Документація API: [https://dev.wb24.biz/swaggerui/](https://dev.wb24.biz/swaggerui/)

## SEO

- `src/app/sitemap.ts` → `/sitemap.xml`
- `src/app/robots.ts` → `/robots.txt`
- `src/components/seo/structured-data.tsx` — JSON-LD: Organization, Service, SoftwareApplication, FAQPage
- Open Graph + Twitter Card налаштовані в `src/app/layout.tsx`
- Сайт повністю пререндериться при білді — контент доступний краулерам без виконання JS (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot тощо)

## Деплой

Автоматично через GitHub Actions ([.github/workflows](.github/workflows)):

1. Push або PR в `main` → `yarn install` → `yarn build`
2. `rsync ./dist/ → user@host:/opt/landing24/`
3. На сервері Nginx роздає статику з `/opt/landing24/`, SSL через certbot

### Секрети GitHub

- `LANDING_SSH_HOST`, `LANDING_SSH_PORT`, `LANDING_SSH_USER`
- `LANDING_SSH_PRIVATE_KEY`

### Налаштування сервера (один раз)

```bash
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
sudo mkdir -p /opt/landing24 && sudo chown $USER:$USER /opt/landing24
```

Конфіг Nginx (`/etc/nginx/sites-available/wb24.biz`):

```nginx
server {
    listen 80;
    server_name wb24.biz www.wb24.biz;
    root /opt/landing24;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/wb24.biz /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d wb24.biz -d www.wb24.biz
```
