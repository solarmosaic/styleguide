/**
 * tasks/styles-compile.js
 */

var gulp = require("gulp");
var gutil = require("gulp-util");

gulp.task("styles-compile", ["styles-copy"], function() {
  var config = require("../config");
  var path = require("path");
  var paths = config.paths;

  // TODO: consider switching to node-sass when it becomes more stable (it's much faster)
  var sass = require("gulp-ruby-sass");

  return gulp
    .src([
      paths.styles.sourceFiles,
      // Ignore vendor files
      "!" + paths.styles.vendorSourceFiles
    ])
    .pipe(sass(config.plugins.sass)).on("error", function(error) {
      gutil.log(error.message);
    })
    .pipe(gulp.dest(paths.base.buildDir));
});