/**
 * tasks/scripts-minify.js
 */

var gulp = require("gulp");

gulp.task("scripts-minify", ["scripts-compile"], function() {
  var config = require("../config");
  var path = require("path");
  var paths = config.paths;
  var sourcemaps = require("gulp-sourcemaps");
  var uglify = require("gulp-uglify");

  return gulp.src(paths.scripts.buildFiles)
    .pipe(sourcemaps.init(config.plugins.sourcemaps.init))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.base.buildDir));
});