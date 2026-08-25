import { preview } from "vite";
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Renders the built SPA once in headless Chromium and bakes the resulting
 * DOM into dist/index.html, so crawlers that don't execute JS (GPTBot,
 * PerplexityBot, and Googlebot's slower JS-rendering wave) get real content
 * on the first fetch instead of an empty <div id="root">. React hydrates
 * over this markup on the client exactly as it would over its own render.
 *
 * Vercel's build image is missing shared libs (libnspr4 etc.) that a
 * regular Playwright-downloaded Chromium needs to launch, so on Vercel we
 * launch @sparticuz/chromium's build instead — compiled specifically for
 * minimal serverless/CI containers. Locally, plain Playwright Chromium
 * (installed via `npm run postinstall`) is used.
 *
 * Best-effort either way: if the browser still can't launch for some
 * unforeseen reason, log why and leave dist/index.html as the plain
 * client-rendered shell rather than failing the whole deploy over an
 * enhancement step.
 */
async function launchBrowser() {
  if (process.env.VERCEL) {
    const { default: sparticuzChromium } = await import("@sparticuz/chromium");
    return chromium.launch({
      executablePath: await sparticuzChromium.executablePath(),
      args: sparticuzChromium.args,
      headless: true,
    });
  }
  return chromium.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
}

async function run() {
  const server = await preview({
    preview: { port: 4173, host: "127.0.0.1", strictPort: true },
  });
  const url = server.resolvedUrls.local[0];

  try {
    const browser = await launchBrowser();
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
    }
  } catch (err) {
    console.warn("Prerender skipped — Chromium unavailable in this environment:");
    console.warn(err?.message ?? err);
    console.warn("Shipping the plain client-rendered build instead.");
  } finally {
    await new Promise((resolve) => server.httpServer.close(resolve));
  }
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    // Only reachable if closing the preview server itself throws — still
    // shouldn't block a deploy over a build-time enhancement step.
    console.warn("Prerender step failed unexpectedly:", err);
    process.exit(0);
  });
