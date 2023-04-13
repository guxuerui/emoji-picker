import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess'
// import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: preprocess(),
  // preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      edge: false,
      split: false,
    }),
  },
  vitePlugin: {
    experimental: {
      inspector: true,
    },
  },
};

export default config;
