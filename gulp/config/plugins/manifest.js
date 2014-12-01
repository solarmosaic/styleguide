/**
 * config/plugins/manifest.js
 */

var _ = require("lodash");
var env = require("../../utils/environment");
var optional = require("optional");
var paths = require("../paths");

var manifest = {
  base: paths.base.publicDir,
  space: "  "
};

// Mixin mode-specific options
_.merge(manifest, env.getConfig(__filename));

module.exports = manifest;