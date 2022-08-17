import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

const dev = process.env.NODE_ENV === "development";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: true,
  }),
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html",
      precompress: false,
    }),
    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: false,
    },
    paths: {
      base: "",
      // base: dev ? "" : "/vpn-config-generator",
    },
  },
};

export default config;
