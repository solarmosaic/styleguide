/**
 * config/paths/html.js
 */

var _ = require("lodash");
var commonPaths = require("../../utils/commonPaths");
var env = require("../../utils/environment");

var html = {
  files: "**/*.+(htm|html)"
};

// Mixin mode-specific options
_.merge(html, env.getConfig(__filename));

// Mixin common paths
_.merge(html, commonPaths(html));

module.exports = html;