/**
 * config/plugin/sass.js
 */

var _ = require("lodash");
var env = require("../../utils/environment");
var optional = require("optional");
var pkg = require("../../../package");

var sass = {
  container: pkg.name,
  precision: 10,
  quiet: !env.verbose,
  trace: env.verbose
};

// Mixin mode-specific options
_.merge(sass, env.getConfig(__filename));

module.exports = sass;