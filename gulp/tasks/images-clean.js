/**
 * tasks/images-clean.js
 */

var gulp = require("gulp");

gulp.task("images-clean", function(cb) {
  var config = require("../config");
  var del = require("del");
  var paths = config.paths;

  del(paths.images.buildFiles, cb);
});