/**
 * utils/revision-stream.js
 */

var gulp = require("gulp");

module.exports = function(src, dest, manifest) {
  var rename = require("gulp-rename");
  var rev = require("gulp-rev");

  return gulp.src(src)
    .pipe(rev())
    .pipe(gulp.dest(dest))
    .pipe(rev.manifest())
    .pipe(rename(manifest))
    .pipe(gulp.dest(dest));
};