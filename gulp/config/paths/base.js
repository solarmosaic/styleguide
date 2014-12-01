/**
 * config/paths/base.js
 */

var _ = require("lodash");
var env = require("../../utils/environment");
var path = require("path");

var base = {
  // Location of bower components
  bowerDir: "bower_components",
  // The build directory
  buildDir: "public",
  // Environment-specific CDN URLs
  cdn: {},
  // The build config
  config: "build.json",
  // Local asset path, absolute to web root (ie: localhost)
  publicDir: "/public",
  // The build manifest file
  manifest: "build-manifest.json",
  // Location of node modules
  nodeDir: "node_modules",
  // The source file directory
  sourceDir: "source"
};

// Mixin mode-specific options
_.merge(base, env.getConfig(__filename));

// Mixin common paths
base.buildConfig = path.join(base.buildDir, base.config);
base.buildManifest = path.join(base.buildDir, base.manifest);

module.exports = base;