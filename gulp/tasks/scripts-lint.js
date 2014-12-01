/**
 * tasks/scripts-lint.js
 */

var gulp = require("gulp");

gulp.task("scripts-lint", function() {
  var config = require("../config");
  var jshint = require("gulp-jshint");
  var path = require("path");
  var stylish = require("jshint-stylish");

  // For now, linting is opt-in. Add paths here to lint files.
  // Path should be relative to app/assets
  var filesToLint = [
    "scripts/module/no-js.js",
    "scripts/module/util/dom.js",
    "scripts/module/util/format.js",
    "scripts/module/util/func.js",
    "scripts/module/util/num.js",
    "scripts/main/invest/cart.entry.js"
  ].map(function(pathEnd) {
    return path.join(config.paths.base.sourceDir, pathEnd)
  });

  // TODO use config.paths.scripts.sourceFiles when all files are conforming
  return gulp.src(filesToLint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});