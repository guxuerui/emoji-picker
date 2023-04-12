// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import type { PageLoad } from "./$types";

export const prerender = true;

export const load = (async ({ fetch }) => {
  const response = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");

  const jsonData = await response.json();
  return {
    jsonData
  }
}) satisfies PageLoad;
