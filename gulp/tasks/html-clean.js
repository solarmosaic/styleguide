/**
 * tasks/html-clean.js
 */

var gulp = require("gulp");

gulp.task("html-clean", function(cb) {
  var config = require("../config");
  var del = require("del");
  var paths = config.paths;

  del(paths.html.buildFiles, cb);
});