/**
 * tasks/watch.js
 */

var gulp = require("gulp");

gulp.task("watch", ["build"], function() {
  var config = require("../config");
  var path = require("path");
  var paths = config.paths;

  // Tasks to run when images change
  gulp.watch(paths.images.sourceFiles, [
    "images-copy"
  ]);

  // Tasks to run when scripts change
  gulp.watch(paths.scripts.sourceFiles, [
    "scripts-compile"
  ]);

  // Tasks to run when styles change
  gulp.watch(paths.styles.sourceFiles, [
    "styles-compile"
  ]);
});