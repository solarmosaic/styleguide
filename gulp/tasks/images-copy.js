/**
 * tasks/images-copy.js
 */

var gulp = require("gulp");

gulp.task("images-copy", ["images-clean"], function() {
  var config = require("../config");
  var copySync = require("../utils/copySync");
  var paths = config.paths;

  // Copy vendor files
  copySync({
    src: paths.base.bowerDir + "/jquery-ui/themes/smoothness/images",
    dest: paths.base.buildDir + "/images/jquery-ui/smoothness"
  });

  // Copy source files
  return gulp.src(paths.images.sourceFiles)
    .pipe(gulp.dest(paths.base.buildDir));
});