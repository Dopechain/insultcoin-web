/* eslint-disable no-undef */
// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  optimize: {
    bundle: false,
    minify: true,
    target: "es2018",
  },
  mount: {
    // Same behavior as the "src" example above:
    src: "/dist",
    // Mount "public" to the root URL path ("/*") and serve files with zero transformations:
    public: "/",
  },
  plugins: ["@snowpack/plugin-postcss", "@snowpack/plugin-react-refresh"],
  packageOptions: {
    polyfillNode: true,
  },
  devOptions: {
    /* ... */
    tailwindConfig: "./tailwind.config.js",
  },
  buildOptions: {
    out: "build",
    htmlFragments: true,
  },
}
