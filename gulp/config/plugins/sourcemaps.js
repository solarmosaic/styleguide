/**
 * config/plugins/sourcemaps.js
 */

var _ = require("lodash");
var env = require("../../utils/environment");
var optional = require("optional");
var paths = require("../paths");

var sourcemaps = {
  init: {
    loadMaps: true
  }
};

// Mixin mode-specific options
_.merge(sourcemaps, env.getConfig(__filename));

module.exports = sourcemaps;