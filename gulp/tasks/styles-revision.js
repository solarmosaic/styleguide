/**
 * tasks/styles-revision.js
 */

var gulp = require("gulp");

gulp.task("styles-revision", ["styles-minify"], function() {
  var config = require("../config");
  var paths = config.paths;
  var revision = require("../utils/revision-stream");

  return revision(
    paths.styles.buildFiles,
    paths.base.buildDir,
    paths.styles.manifest
  );
});