/**
 * tasks/build-scripts.js
 */

var gulp = require("gulp");
var env = require("../utils/environment");

gulp.task("build-scripts", [
  env.isMode("production") ? "scripts-revision" : "scripts-compile"
]);