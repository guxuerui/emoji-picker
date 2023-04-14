import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess'
// import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: preprocess(),
  // preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
  vitePlugin: {
    experimental: {
      inspector: true,
    },
  },
};

export default config;
