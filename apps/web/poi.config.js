const ip = require("ip");

module.exports = ({ mode }) => ({
  sourceMap: false,
  extendWebpack(config) {
    config.resolve.alias
      .set("react", "preact-compat")
      .set("react-dom", "preact-compat");

    config.resolve.extensions.add(".ts").add(".tsx");

    config.module
      .rule("typescript")
      .test(/\.tsx?$/)
      .use("cache-loader")
      .loader("cache-loader")
      .end()
      .use("ts-loader")
      .loader("ts-loader");
  },
  env: mode === "development"
    ? {
        API_URI: `//${ip.address()}:5000`
      }
    : {
        API_URI: "//ablog.now.sh"
      }
});
