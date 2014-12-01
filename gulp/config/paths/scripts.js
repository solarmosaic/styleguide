/**
 * config/paths/scripts.js
 */

var _ = require("lodash");
var commonPaths = require("../../utils/commonPaths");
var env = require("../../utils/environment");
var path = require("path");

var scripts = {
  entryPointFiles: "**/*.entry.js",
  files: "**/*.js",
  manifest: "scripts-manifest.json",
  sourceMapFiles: "**/*.map",
  vendor: "/scripts/vendor"
};

// Mixin mode-specific options
_.merge(scripts, env.getConfig(__filename));

// Mixin common paths
_.merge(scripts, commonPaths(scripts));

module.exports = scripts;