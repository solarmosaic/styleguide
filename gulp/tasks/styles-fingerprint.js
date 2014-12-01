/**
 * tasks/styles-fingerprint.js
 *
 * Update asset paths to their revisioned versions.
 */

var gulp = require("gulp");
var gutil = require("gulp-util");

gulp.task("styles-fingerprint", ["images-revision", "styles-compile"], function() {
  var config = require("../config");
  var fingerprint = require("gulp-fingerprint");
  var path = require("path");
  var paths = config.paths;

  // The image manifest must exist in order to fingerprint the stylesheets
  try {
    var imageManifest = require(path.resolve(paths.images.buildManifest));
  } catch(error) {
    gutil.log(error.message);
  }

  return gulp.src(paths.styles.buildFiles)
    .pipe(fingerprint(imageManifest, config.plugins.fingerprint))
    .pipe(gulp.dest(paths.base.buildDir));
});