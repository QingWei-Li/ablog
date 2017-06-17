module.exports = function({ mode }) {
  return {
    sourceMap: false,
    presets: ["typescript"],
    env: mode === "development"
      ? {
          API_URI: "//localhost:5000"
        }
      : {
          API_URI: "//ablog.now.sh"
        }
  };
};
