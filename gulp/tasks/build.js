/**
 * tasks/build.js
 */

var gulp = require("gulp");
var runSequence = require("run-sequence");

gulp.task("build", function(cb) {
  runSequence("build-clean", [
    "build-images",
    "build-scripts",
    "build-styles",
    "build-manifest",
    "build-config",
    "build-html",
    "build-styleguide"
  ], cb);
});
