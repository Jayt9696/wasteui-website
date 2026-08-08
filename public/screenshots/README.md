# Product screenshots

Real captures from the WasteUI app live in this folder and power the marketing site strip.

Regenerate (requires WasteUI running locally on port 5000):

```bash
# Terminal 1 — WasteUI repo
npm run dev

# Terminal 2 — wasteui-website repo
npm install -D playwright
npx playwright install chromium
node scripts/capture-product-screens.mjs
```

| File | Screen |
|---|---|
| `dispatch.jpg` | Driver rounds |
| `customers.jpg` | Customer account |
| `weighbridge.jpg` | Weighbridge |
| `planning.jpg` | Weekly tonnage planning |
| `compliance.jpg` | Waste transfer notes |

Avoid including real personal customer data when publishing.
