import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta, normalizePath } from "../../seo/routes";

const SITE_URL = (import.meta.env.VITE_SITE_URL || "").trim().replace(/\/+$/, "");

function upsert(selector, create, apply) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  apply(element);
}

function setMeta(attr, key, content) {
  upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const el = document.createElement("meta");
      el.setAttribute(attr, key);
      return el;
    },
    (el) => el.setAttribute("content", content),
  );
}

function setCanonical(href) {
  upsert(
    'link[rel="canonical"]',
    () => {
      const el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      return el;
    },
    (el) => el.setAttribute("href", href),
  );
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const path = normalizePath(pathname);
    const url = SITE_URL ? `${SITE_URL}${path === "/" ? "/" : path}` : "";

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("name", "robots", meta.noindex ? "noindex,follow" : "index,follow");
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);

    if (url && !meta.noindex) {
      setCanonical(url);
      setMeta("property", "og:url", url);
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    }
  }, [pathname]);

  return null;
}
