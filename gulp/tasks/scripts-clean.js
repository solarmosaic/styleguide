/**
 * tasks/scripts-clean.js
 */

var gulp = require("gulp");

gulp.task("scripts-clean", function(cb) {
  var config = require("../config");
  var del = require("del");
  var paths = config.paths;

  del([
    paths.scripts.vendorBuildDir,
    paths.scripts.buildFiles,
    paths.scripts.buildSourceMapFiles
  ], cb);
});