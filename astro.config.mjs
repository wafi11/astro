import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from "@astrojs/vercel/static";


// https://astro.build/config
export default defineConfig({
  site: 'https://fbsite-astro4.vercel.app/',
  integrations: [tailwind(), react({
    include: ["**/react/*"],
  }), mdx(), sitemap()],
});



