import { preview } from "vite";
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Renders the built SPA once in headless Chromium and bakes the resulting
 * DOM into dist/index.html, so crawlers that don't execute JS (GPTBot,
 * PerplexityBot, and Googlebot's slower JS-rendering wave) get real content
 * on the first fetch instead of an empty <div id="root">. React hydrates
 * over this markup on the client exactly as it would over its own render.
 */
async function run() {
  const server = await preview({
    preview: { port: 4173, host: "127.0.0.1", strictPort: true },
  });
  const url = server.resolvedUrls.local[0];

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const rootHtml = await page.$eval("#root", (el) => el.innerHTML);

    const distIndex = path.join(process.cwd(), "dist", "index.html");
    const html = readFileSync(distIndex, "utf-8");
    const prerendered = html.replace(
      '<div id="root"></div>',
      `<div id="root">${rootHtml}</div>`,
    );
    writeFileSync(distIndex, prerendered);
    console.log(
      `Prerendered ${rootHtml.length.toLocaleString()} chars of static HTML into dist/index.html`,
    );
  } finally {
    await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Prerender failed:", err);
    process.exit(1);
  });
