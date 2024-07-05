import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  integrations: [tailwind(), react({
    include: ["**/react/*"],
  }), mdx(), sitemap()],
  output: 'server',
  adapter: vercel(),
  experimental: {
    actions: true
  },
});



