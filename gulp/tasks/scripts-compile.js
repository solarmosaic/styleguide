/**
 * tasks/scripts-compile.js
 */

var gulp = require("gulp");
var gutil = require("gulp-util");

gulp.task("scripts-compile", ["scripts-copy"], function(cb) {
  var config = require("../config");
  var env = require("../utils/environment");
  var webpack = require("webpack");

  webpack(config.plugins.webpack, function(err, stats) {
    if (err) {
      throw new gutil.PluginError("scripts-compile", err);
    }

    if (env.verbose) {
      gutil.log("scripts-compile", stats.toString({
        colors: true
      }));
    }

    cb();
  });
});