/**
 * tasks/styles-copy.js
 */

var gulp = require("gulp");

gulp.task("styles-copy", ["styles-clean"], function() {
  var config = require("../config");
  var copySync = require("../utils/copySync");
  var path = require("path");
  var paths = config.paths;

  // Copy vendor files to the source directory for compilation
  copySync(
    [
      {
        src: "/bootstrap-sass-official/assets/stylesheets/bootstrap",
        dest: "/bootstrap"
      },
      {
        src: "/bourbon/dist",
        dest: "/bourbon"
      }
    ],
    {
      baseSrc: paths.base.bowerDir,
      baseDest: paths.styles.vendorSourceDir
    }
  );
});