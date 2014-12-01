/**
 * tasks/scripts-revision.js
 */

var gulp = require("gulp");

gulp.task("scripts-revision", ["scripts-minify"], function() {
  var config = require("../config");
  var paths = config.paths;
  var revision = require("../utils/revision-stream");

  return revision(
    paths.scripts.buildFiles,
    paths.base.buildDir,
    paths.scripts.manifest
  );
});