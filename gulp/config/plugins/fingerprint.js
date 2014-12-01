/**
 * config/plugins/fingerprint.js
 */

var _ = require("lodash");
var env = require("../../utils/environment");
var paths = require("../paths");

var fingerprint = {
  base: paths.base.publicDir + "/",
  prefix: paths.base.publicDir + "/",
  verbose: env.verbose
};

// Mixin mode-specific options
_.merge(fingerprint, env.getConfig(__filename));

module.exports = fingerprint;