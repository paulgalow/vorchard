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
        "default-src": ["none"],
        "script-src": ["strict-dynamic"],
        "img-src": ["self", "data:"],
        "style-src": ["self", "unsafe-inline"], // "unsafe-inline" workaround for https://github.com/sveltejs/kit/issues/5215
        "font-src": ["self"],
        "connect-src": ["self"],
        "prefetch-src": ["self"],
        "form-action": ["self"],
        "manifest-src": ["self"],
        "base-uri": ["none"],
        "frame-ancestors": ["none"],
        "media-src": ["none"],
        "object-src": ["none"],
        "worker-src": ["none"],
        "require-trusted-types-for": ["'script'"],
      },
    },
  },
};

export default config;
