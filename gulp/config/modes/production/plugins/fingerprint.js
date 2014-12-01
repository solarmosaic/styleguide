/**
 * modes/production/plugins/fingerprint.js
 */

var build = require("../../../build");
var paths = require("../../../paths");

module.exports = {
  prefix: build.token.cdn + paths.base.publicDir + "/"
};