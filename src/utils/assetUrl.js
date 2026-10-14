const REMOTE_BASE = (import.meta.env.VITE_DATA_BASE_URL || "").replace(/\/+$/, "");
const LOCAL_BASE = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export default function assetUrl(path) {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${REMOTE_BASE || LOCAL_BASE}${clean}`;
}
