/**
 * tasks/styles-minify.js
 */

var gulp = require("gulp");

gulp.task("styles-minify", ["styles-fingerprint"], function() {
  var config = require("../config");
  var minify = require("gulp-minify-css");
  var paths = config.paths;

  return gulp.src(paths.styles.buildFiles)
    .pipe(minify(config.plugins.minify))
    .pipe(gulp.dest(paths.base.buildDir));
});