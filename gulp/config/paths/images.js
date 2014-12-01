/**
 * config/paths/images.js
 */

var _ = require("lodash");
var commonPaths = require("../../utils/commonPaths");
var env = require("../../utils/environment");

var images = {
  files: "**/*.+(gif|ico|jpg|png)",
  manifest: "images-manifest.json"
};

// Mixin mode-specific options
_.merge(images, env.getConfig(__filename));

// Mixin common paths
_.merge(images, commonPaths(images));

module.exports = images;