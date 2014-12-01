/**
 * tasks/build-manifest.js
 */

var gulp = require("gulp");

gulp.task("build-manifest", ["build-images", "build-scripts", "build-styles"], function() {
  var config = require("../config");
  var manifest = require("../utils/gulp-rev-manifest-combine");
  var paths = config.paths;

  return gulp.src(paths.manifests.buildFiles)
    .pipe(manifest(paths.base.manifest, config.plugins.manifest))
    .pipe(gulp.dest(paths.base.buildDir));
});