import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import seoPlugin from "./scripts/seoPlugin.js";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  const siteUrl = (env.VITE_SITE_URL || "").trim().replace(/\/+$/, "");

  return {
    plugins: [react(), tailwindcss(), seoPlugin(siteUrl)],
  };
});
