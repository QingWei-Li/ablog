var ip = require("ip");

module.exports = ({ mode }) => ({
  sourceMap: false,
  presets: ["typescript"],
  extendWebpack(config) {
    config.resolve.alias
      .set("react", "preact-compat")
      .set("react-dom", "preact-compat");
  },
  env: mode === "development"
    ? {
        API_URI: `//${ip.address()}:5000`
      }
    : {
        API_URI: "//ablog.now.sh"
      }
});
