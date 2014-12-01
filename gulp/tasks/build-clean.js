/**
 * tasks/build-clean.js
 *
 * Removes the build directory in preparation of a new build.
 */

var gulp = require("gulp");

gulp.task("build-clean", function(cb) {
  var config = require("../config");
  var del = require("del");

  del(config.paths.base.buildDir, cb);
});