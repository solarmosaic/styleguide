/**
 * tasks/styles-clean.js
 */

var gulp = require("gulp");

gulp.task("styles-clean", function(cb) {
  var config = require("../config");
  var del = require("del");
  var paths = config.paths;

  del([
    paths.styles.vendorSourceDir,
    paths.styles.buildFiles
  ], cb);
});