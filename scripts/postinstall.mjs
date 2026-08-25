import { execSync } from "node:child_process";

// On Vercel, prerender.mjs launches @sparticuz/chromium instead (a Chromium
// build made for minimal serverless/CI containers — Vercel's build image is
// missing shared libs like libnspr4 that the regular Playwright browser
// needs). Downloading Playwright's own ~180MB Chromium there would be pure
// waste. Locally, dev/build still uses Playwright's normal browser.
if (process.env.VERCEL) {
  console.log(
    "Skipping Playwright's Chromium download on Vercel — prerender.mjs uses @sparticuz/chromium there instead.",
  );
} else {
  execSync("playwright install chromium", { stdio: "inherit" });
}
