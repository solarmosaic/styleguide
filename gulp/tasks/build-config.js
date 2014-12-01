/**
 * tasks/build-config.js
 *
 * Writes out our common build settings to a JSON file for ingestion
 * by the application.
 */

var gulp = require("gulp");
var gutil = require("gulp-util");

gulp.task("build-config", ["build-manifest"], function(cb) {
  var config = require("../config");
  var env = require("../utils/environment");
  var jf = require("jsonfile");
  var path = require("path");
  var paths = config.paths;

  try {
    config.build.asset.manifest = require(path.resolve(paths.base.buildManifest));
  } catch(error) {
    if (env.isMode("production")) {
      gutil.log(error.message);
    }
  }

  jf.writeFile(paths.base.buildConfig, config.build, cb);
});