/**
 * config/paths/styles.js
 */

var _ = require("lodash");
var commonPaths = require("../../utils/commonPaths");
var env = require("../../utils/environment");

var styles = {
  files: "**/*.+(s|)css",
  manifest: "styles-manifest.json",
  vendor: "/styles/vendor"
};

// Mixin mode-specific options
_.merge(styles, env.getConfig(__filename));

// Mixin common paths
_.merge(styles, commonPaths(styles));

module.exports = styles;