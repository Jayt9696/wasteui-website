/**
 * Capture WasteUI marketing screenshots with real data visible.
 */
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(
  path.resolve("c:/Users/Jason/Documents/WasteUI/WasteUI/package.json"),
);
const Database = require("better-sqlite3");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../public/screenshots");
const base = process.env.WASTEUI_URL || "http://127.0.0.1:5000";
const username = process.env.WASTEUI_USER || "testuser";
const password = process.env.WASTEUI_PASS || "TestUser@123";
const dbPath = "c:/Users/Jason/Documents/WasteUI/WasteUI/dev.db";

function setRole(role) {
  const db = new Database(dbPath);
  db.prepare("UPDATE login_users SET role = ? WHERE username = ?").run(
    role,
    username,
  );
  db.close();
}

async function dismissOverlays(page) {
  for (const sel of [
    '[aria-label="Close"]',
    'button:has-text("Got it")',
    'button:has-text("Dismiss")',
    'button:has-text("Not now")',
  ]) {
    const el = page.locator(sel).first();
    if (await el.isVisible().catch(() => false)) {
      await el.click().catch(() => {});
      await page.waitForTimeout(300);
    }
  }
}

async function login(page) {
  await page.goto(`${base}/login`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(600);
  await page
    .locator('input[placeholder="Username"], input[name="username"], input[type="text"]')
    .first()
    .fill(username);
  await page
    .locator('input[placeholder="Password"], input[name="password"], input[type="password"]')
    .first()
    .fill(password);
  await page.getByRole("button", { name: /log in/i }).click();
  await page.waitForURL((url) => !url.pathname.includes("/login"), {
    timeout: 20000,
  });
  await page.waitForTimeout(1200);
}

async function shot(page, file) {
  await dismissOverlays(page);
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outDir, file),
    type: "jpeg",
    quality: 85,
    fullPage: false,
  });
  console.log(`  saved ${file}`);
}

async function captureDispatch(page) {
  console.log("Capturing dispatch…");
  await page.goto(`${base}/driver-rounds`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2000);

  // Open Vehicle Type and pick first option
  const vt = page.getByRole("button", { name: /vehicle type/i }).first();
  if (await vt.isVisible().catch(() => false)) {
    await vt.click();
    await page.waitForTimeout(500);
    const option = page.locator('[role="option"], [role="menuitem"]').first();
    if (await option.isVisible().catch(() => false)) {
      await option.click();
    } else {
      // Fallback: click first visible dropdown item text
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");
    }
    await page.waitForTimeout(2500);
  }

  // Prefer Route Map view if available
  const mapBtn = page.getByRole("button", { name: /route map|map/i }).first();
  if (await mapBtn.isVisible().catch(() => false)) {
    await mapBtn.click().catch(() => {});
    await page.waitForTimeout(2000);
  }

  await shot(page, "dispatch.jpg");
}

async function captureCustomers(page) {
  console.log("Capturing customers…");
  await page.goto(`${base}/customers/1`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(4000);
  await shot(page, "customers.jpg");
}

async function captureWeighbridge(page) {
  console.log("Capturing weighbridge…");
  await page.goto(`${base}/weighbridge`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2500);
  await shot(page, "weighbridge.jpg");
}

async function capturePlanning(page) {
  console.log("Capturing planning…");
  await page.goto(`${base}/planning`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2000);

  // Click first "View all" / inbound-style control if present
  const viewAll = page.getByRole("button", { name: /view all|inbound|outbound/i }).first();
  if (await viewAll.isVisible().catch(() => false)) {
    await viewAll.click();
    await page.waitForTimeout(500);
    const opt = page.locator('[role="option"], [role="menuitem"]').first();
    if (await opt.isVisible().catch(() => false)) {
      await opt.click();
      await page.waitForTimeout(2000);
    }
  }
  await shot(page, "planning.jpg");
}

async function captureCompliance(page) {
  console.log("Capturing compliance…");
  await page.goto(`${base}/compliance`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(1500);

  const wtn = page.getByRole("tab", { name: /waste transfer notes/i }).or(
    page.getByRole("button", { name: /waste transfer notes/i }),
  ).first();
  if (await wtn.isVisible().catch(() => false)) {
    await wtn.click();
    await page.waitForTimeout(2500);
  } else {
    // Tab may be plain text/button in custom UI
    const alt = page.locator("text=Waste Transfer Notes").first();
    if (await alt.isVisible().catch(() => false)) {
      await alt.click();
      await page.waitForTimeout(2500);
    }
  }
  await shot(page, "compliance.jpg");
}

async function main() {
  setRole("admin");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  try {
    console.log(`Logging in as ${username}…`);
    await login(page);
    console.log(`Logged in → ${page.url()}`);

    await captureDispatch(page);
    await captureCustomers(page);
    await captureWeighbridge(page);
    await capturePlanning(page);
    await captureCompliance(page);
    console.log("Done.");
  } finally {
    await browser.close();
    setRole("user");
  }
}

main().catch((err) => {
  try {
    setRole("user");
  } catch {
    // ignore
  }
  console.error(err);
  process.exit(1);
});
