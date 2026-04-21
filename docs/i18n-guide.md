# i18n guide (English default)

This project uses `next-intl` with App Router and locale-based routing.

- Default locale: `en`
- Secondary locale: `es`
- URL strategy: `localePrefix: 'always'`
  - English pages: `/en`
  - Spanish pages: `/es`

## 1) Where translations live

- [messages/en.json](/c:/Users/wilfr/Desktop/agrotrust/messages/en.json)
- [messages/es.json](/c:/Users/wilfr/Desktop/agrotrust/messages/es.json)

Keep both files with the same keys/structure.

## 2) Add a new section with ES + EN

Example section name: `Testimonials`

Add the namespace to both files:

```json
{
  "Testimonials": {
    "title": "What clients say",
    "description": "Results from real agribusiness teams."
  }
}
```

```json
{
  "Testimonials": {
    "title": "Lo que dicen los clientes",
    "description": "Resultados de equipos agroindustriales reales."
  }
}
```

Then use it in a page/component:

```tsx
import {getTranslations} from 'next-intl/server';

const t = await getTranslations({locale, namespace: 'Testimonials'});

return (
  <section>
    <h2>{t('title')}</h2>
    <p>{t('description')}</p>
  </section>
);
```

## 3) Rules to keep it scalable

- Always create keys in `en.json` and `es.json` in the same commit.
- Use namespaces per section/page (`Hero`, `Features`, `Testimonials`, etc.).
- Prefer semantic keys (`title`, `description`, `ctaPrimary`) over sentence-as-key.
- Avoid hardcoded UI text in components.
- Validate that both locales still build:
  - `pnpm --store-dir="C:\Users\wilfr\AppData\Local\pnpm\store\v10" build`
