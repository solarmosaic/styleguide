/**
 * config/paths/manifests.js
 */

var _ = require("lodash");
var commonPaths = require("../../utils/commonPaths");
var env = require("../../utils/environment");

var manifests = {
  files: "**/*\\-manifest.json"
};

// Mixin mode-specific options
_.merge(manifests, env.getConfig(__filename));

// Mixin common paths
_.merge(manifests, commonPaths(manifests));

module.exports = manifests;