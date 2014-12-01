/**
 * tasks/images-revision.js
 */

var gulp = require("gulp");

gulp.task("images-revision", ["images-copy"], function() {
  var config = require("../config");
  var paths = config.paths;
  var revision = require("../utils/revision-stream");

  return revision(
    paths.images.buildFiles,
    paths.base.buildDir,
    paths.images.manifest
  );
});