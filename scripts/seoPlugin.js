import fs from "node:fs";
import path from "node:path";
import {
  routeMeta,
  SITE_NAME,
  SITE_ALTERNATE_NAME,
  SOCIAL_LINKS,
} from "../src/seo/routes.js";

const START = "<!--seo:start-->";
const END = "<!--seo:end-->";
const OG_IMAGE_PATH = "/og-image.png";

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function routeUrl(siteUrl, route) {
  if (!siteUrl) return "";
  return route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
}

function renderJsonLd(siteUrl) {
  const person = {
    "@type": "Person",
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    sameAs: Object.values(SOCIAL_LINKS),
  };
  const graph = [person];
  if (siteUrl) {
    person.url = `${siteUrl}/`;
    graph.push({
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAME,
      url: `${siteUrl}/`,
      inLanguage: "en",
    });
  }
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );
  return `<script type="application/ld+json">${json}</script>`;
}

function renderHead(route, siteUrl, withJsonLd) {
  const meta = routeMeta[route];
  const url = routeUrl(siteUrl, route);
  const image = siteUrl ? `${siteUrl}${OG_IMAGE_PATH}` : "";
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="index,follow" />`,
    url && `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    url && `<meta property="og:url" content="${esc(url)}" />`,
    image && `<meta property="og:image" content="${esc(image)}" />`,
    image && `<meta property="og:image:width" content="1200" />`,
    image && `<meta property="og:image:height" content="630" />`,
    image &&
      `<meta property="og:image:alt" content="${esc(SITE_NAME)} (${esc(SITE_ALTERNATE_NAME)}) developer portfolio" />`,
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    image && `<meta name="twitter:image" content="${esc(image)}" />`,
    withJsonLd && renderJsonLd(siteUrl),
  ];
  return lines.filter(Boolean).join("\n    ");
}

export default function seoPlugin(siteUrl) {
  let resolved;
  return {
    name: "portfolio-seo",
    configResolved(config) {
      resolved = config;
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const block = `${START}\n    ${renderHead("/", siteUrl, true)}\n    ${END}`;
        return html.replace("<!--seo-->", () => block);
      },
    },
    closeBundle() {
      if (resolved.command !== "build") return;
      const outDir = path.resolve(resolved.root, resolved.build.outDir);
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;

      const html = fs.readFileSync(indexPath, "utf8");
      const pattern = new RegExp(`${START}[\\s\\S]*?${END}`);
      if (!pattern.test(html)) {
        throw new Error("portfolio-seo: penanda SEO tidak ditemukan di dist/index.html");
      }

      for (const route of Object.keys(routeMeta)) {
        if (route === "/") continue;
        const block = `${START}\n    ${renderHead(route, siteUrl, false)}\n    ${END}`;
        const dir = path.join(outDir, route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(
          path.join(dir, "index.html"),
          html.replace(pattern, () => block),
        );
      }

      const robots = ["User-agent: *", "Allow: /"];
      if (siteUrl) robots.push("", `Sitemap: ${siteUrl}/sitemap.xml`);
      fs.writeFileSync(path.join(outDir, "robots.txt"), `${robots.join("\n")}\n`);

      if (siteUrl) {
        const urls = Object.keys(routeMeta)
          .map((route) => `  <url><loc>${esc(routeUrl(siteUrl, route))}</loc></url>`)
          .join("\n");
        fs.writeFileSync(
          path.join(outDir, "sitemap.xml"),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        );
      } else {
        console.warn(
          "\n[portfolio-seo] VITE_SITE_URL belum diatur: sitemap.xml, canonical, og:url, og:image, dan WebSite JSON-LD dilewati.\n",
        );
      }
    },
  };
}
