import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: true,
  }),
  kit: {
    adapter: adapter({
      edge: false,
      external: [],
      split: false,
    }),
    csp: {
      directives: {
        "default-src": ["self"],
        "script-src": ["self"],
        "style-src": ["self"],
        "img-src": ["self", "data:"],
        "font-src": ["self"],
        "connect-src": ["self"],
        "media-src": ["none"],
        "object-src": ["none"],
        "prefetch-src": ["self"],
        "frame-ancestors": ["none"],
      },
    },
  },
};

export default config;
