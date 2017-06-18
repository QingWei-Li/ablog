module.exports = function({ mode }) {
  return {
    sourceMap: false,
    presets: ["typescript"],
    extendWebpack(config) {
      config.resolve.alias
        .set("react", "preact-compat")
        .set("react-dom", "preact-compat");
    },
    env: mode === "development"
      ? {
          API_URI: "//localhost:5000"
        }
      : {
          API_URI: "//ablog.now.sh"
        }
  };
};
