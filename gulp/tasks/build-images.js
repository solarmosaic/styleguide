/**
 * tasks/build-images.js
 */

var env = require("../utils/environment");
var gulp = require("gulp");

gulp.task("build-images", [
  env.isMode("production") ? "images-revision" : "images-copy"
]);
