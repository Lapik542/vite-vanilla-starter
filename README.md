# Vite Vanilla Starter

A multi-page corporate/portfolio website starter built with **Vite** and **Vanilla JS**. No frameworks — just clean HTML, SCSS, and Web Components.

## Stack

- **Vite** — build tool and dev server
- **Vanilla JS** — Web Components for Header and Footer
- **SCSS** — BEM methodology, variables, media query mixins

## Features

- Multi-page architecture with automatic page discovery
- Shared Header and Footer as Web Components
- Active navigation state detection
- SCSS with BEM, CSS custom properties, and `@include mobile/tablet` mixins
- SEO-ready: `<meta>`, Open Graph, canonical URLs, `robots.txt`
- Auto-generated `sitemap.xml` with `<lastmod>` and `<priority>` on build
- Trailing slash redirect middleware

## Project Structure

```
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── header/           # header.html + header.scss + header.js
│   │   └── footer/           # footer.html + footer.scss + footer.js
│   └── styles/
│       ├── _variables.scss   # SCSS vars + CSS custom properties
│       ├── _mixins.scss      # @mixin mobile, tablet, desktop
│       └── global.scss       # reset, base styles, container
├── about/                    # index.html + about.scss + about.js
├── services/
├── portfolio/
├── contact/
├── terms/
├── index.html                # home page
├── main.scss
├── main.js
└── vite.config.js
```

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Generates `dist/` with all pages, assets, `sitemap.xml`, `robots.txt`, and `favicon.svg`.

## Adding a New Page

1. Create a folder `page-name/` with three files:

```
page-name/
  index.html
  page-name.scss
  page-name.js
```

2. *(Optional)* Add a priority entry in `vite.config.js`:

```js
const PRIORITY = { ..., 'page-name': '0.7' }
```

The page scanner and sitemap generator pick it up automatically.

## SCSS Mixins

```scss
@use '../src/styles/mixins' as *;

.hero__title {
  font-size: 3rem;

  @include mobile  { font-size: 2rem; }
  @include tablet  { font-size: 2.5rem; }
}
```

| Mixin | Breakpoint |
|---|---|
| `mobile` | max-width: 768px |
| `tablet` | max-width: 1024px |
| `desktop` | min-width: 1025px |

## Configuration

Set your domain in `vite.config.js` before deploying:

```js
const BASE_URL = 'https://yourdomain.com'
```

This updates all canonical URLs and the sitemap automatically.
