/**
 * tasks/build-styles.js
 */

var env = require("../utils/environment");
var gulp = require("gulp");

gulp.task("build-styles", [
  env.isMode("production") ? "styles-revision" : "styles-compile"
]);