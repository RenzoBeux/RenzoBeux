// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://renzobeux.dev",
  integrations: [react(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["lucide-react"],
    },
  },

  markdown: {
    shikiConfig: {
      themes: {
        dark: "github-dark-dimmed",
        light: "github-dark-dimmed",
      },
      wrap: true,
    },
  },

  adapter: cloudflare(),
});