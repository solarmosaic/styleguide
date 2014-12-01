/**
 * tasks/build-html.js
 *
 * TODO update asset paths inside html files to the revisioned versions
 * when in production mode
 */

var gulp = require("gulp");

gulp.task("build-html", ["html-copy"]);