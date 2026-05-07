# Mister FAPC — B2B cleaning website

Production-ready сайт клининговой компании Mister FAPC для юридических лиц.

## Стек

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Anime.js
- React Hook Form + Zod
- lucide-react

Изначальный план указывал Next.js 14, но npm audit помечает ветку Next 14 уязвимой. Проект обновлен до Next.js 16.2.4, сборка работает в webpack-режиме.

## Команды

```bash
npm run dev
npm run build
npm run lint
```

## Реализовано

- Главная B2B-first страница.
- Хабы `/uslugi/` и `/goroda/`.
- 5 основных страниц услуг.
- 8 городских страниц.
- 15 P1 combo-страниц: Екатеринбург, Пермь, Челябинск × 5 услуг.
- `/prices/`, `/sla/`, `/cases/`, `/reviews/`, `/faq/`, `/about/`, `/contacts/`.
- `/privacy/`, `/terms/`, `not-found`, `robots.txt`, `sitemap.xml`.
- Light/Dark/System theme с `localStorage`.
- Premium animation layer на Anime.js: hero timeline, scroll reveal, staggered cards, hover micro-motion, floating hero accent, animated counters, `prefers-reduced-motion`.
- Lead form и quiz-ready компонент.
- API route `/api/contact`.
- JSON-LD: Organization, LocalBusiness, Service, FAQPage, BreadcrumbList.
- Редиректы старых URL в `next.config.mjs`.

## Интеграции

Перед публикацией добавить переменные окружения:

```bash
BITRIX24_WEBHOOK_URL=
NEXT_PUBLIC_YANDEX_METRIKA_ID=
```

TODO: подтвердить актуальный адрес Екатеринбурга: `Чайковского 56` или `Чайковского 11 офис 505`.
