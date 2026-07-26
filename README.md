# WasteUI website

Marketing site for [wasteui.co.uk](https://wasteui.co.uk) — advertises the WasteUI waste management platform.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Static output is written to `dist/` and can be hosted on Cloudflare Pages, Netlify, S3, nginx, etc.

## Notes

- Demo CTA currently opens `mailto:hello@wasteui.co.uk` — change this in `src/App.tsx` if you use a different inbox or form.
- Brand assets were copied from the WasteUI product repo (`waste-ui-logo.png`, companion app logos, favicon).
