/**
 * tasks/scripts-copy.js
 */

var gulp = require("gulp");

gulp.task("scripts-copy", ["scripts-clean"], function() {
  var config = require("../config");
  var copySync = require("../utils/copySync");
  var paths = config.paths;

  // Copy vendor files to the build folder
  copySync(
    [
      {
        src: "/zeroclipboard/dist/ZeroClipboard.swf",
        dest: "/zeroclipboard/zeroclipboard.swf"
      }
    ],
    {
      baseSrc: paths.base.bowerDir,
      baseDest: paths.scripts.vendorBuildDir
    }
  );
});