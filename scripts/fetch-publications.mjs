// Pulls the latest Substack posts at build time and writes a static JSON
// file the site bundles in. Runs before `dev` and `build` (see package.json)
// so there is never a runtime network call, CORS proxy, or stale hardcoded
// list to maintain by hand.
import { XMLParser } from "fast-xml-parser";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FEED_URL = "https://ameyamhatre.substack.com/feed";
const POST_LIMIT = 3;
const DESCRIPTION_LIMIT = 200;

const OUTPUT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "data",
  "publications.json",
);

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(value) {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, limit) {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit).trimEnd()}…`;
}

function formatDate(pubDate) {
  return new Date(pubDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

async function main() {
  const response = await fetch(FEED_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (portfolio-build-script)" },
  });
  if (!response.ok) {
    throw new Error(`Substack feed request failed: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const parser = new XMLParser({ ignoreAttributes: false });
  const feed = parser.parse(xml);
  const items = feed?.rss?.channel?.item;
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Substack feed returned no items");
  }

  const publications = items.slice(0, POST_LIMIT).map((item) => ({
    title: stripHtml(String(item.title)),
    description: truncate(stripHtml(String(item.description ?? "")), DESCRIPTION_LIMIT),
    publishDate: formatDate(item.pubDate),
    url: String(item.link),
  }));

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(publications, null, 2)}\n`);
  console.log(`Wrote ${publications.length} publications to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("fetch-publications failed:", error.message);
  process.exit(1);
});
