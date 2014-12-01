/**
 * config/build.js
 *
 * These settings will be exported into the build folder in a JSON file
 * for ingestion by the app.
 */

var path = require("path");
var paths = require("./paths");

module.exports = {
  asset: {
    // This will be filled in inside the build-config task
    manifest: {}
  },
  paths: {
    cdn: paths.base.cdn,
    publicDir: paths.base.publicDir
  },
  token: {
    cdn: "__CDN_URL__"
  }
};