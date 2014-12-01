/**
 * tasks/html-copy.js
 */

var gulp = require("gulp");

gulp.task("html-copy", ["html-clean"], function() {
  var config = require("../config");
  var copySync = require("../utils/copySync");
  var paths = config.paths;

  // Copy source files
  return gulp.src(paths.html.sourceFiles)
    .pipe(gulp.dest(paths.base.buildDir));
});