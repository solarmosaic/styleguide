/**
 * gulpfile.js
 * TODO move common tasks to separate repo
 *
 * Bootstraps gulp configuration.
 * @see /gulp/index.js for more information.
 */

require("./gulp");

////////////////////
// CLEAN UP BELOW
////////////////////

var _ = require("lodash");
var matter = require("gray-matter");
var ghpages = require("gh-pages");
var gulp = require("gulp");
var layouts = require("handlebars-layouts");
var optional = require("optional");
var path = require("path");

var browserSync = require("browser-sync");
var data = require("gulp-data");
var dataJson = require("gulp-data-json");
var dataMatter = require("gulp-data-matter");
var filter = require("gulp-filter");
var hb = require("./gulp/utils/hb"); // SEE TODO IN FILE
var htmltidy = require("gulp-htmltidy");
var nav = require("gulp-nav");
var prettyUrl = require("gulp-pretty-url");

gulp.task("build-styleguide", ["html-clean"], function() {
  return gulp.src("source/views/**/*.hbs")
    // extract data from .json files
    .pipe(dataJson())
    // extract data from front matter
    .pipe(dataMatter())
    // relocate templates to url friendly locations
    .pipe(prettyUrl())
    // generate site navigation data
    .pipe(nav())
    // compile the templates
    .pipe(hb({
      helpers: "source/helpers/**/*.js",
      partials: "source/partials/**/*.hbs"
    }))
    // so pretty
    .pipe(htmltidy({
      indent: true,
      wrap: 120
    }))
    // store in public folder
    .pipe(gulp.dest("public"));
});

// Start a server for the styleguide and allow automatic page reload on change
gulp.task("styleguide-browser-sync", function() {
	browserSync({
		server: {
			baseDir: "public"
		},
		notify: false
	});
});

gulp.task("styleguide-watch", ["styleguide-browser-sync", "watch"], function() {
  gulp.watch([
    "source/**/*",
    "!source/assets/**/*"
  ], [
    "build-styleguide",
    browserSync.reload
  ]);
});

gulp.task("styleguide", ["styleguide-watch"]);

// deploy the public folder to gh-pages
gulp.task("deploy", ["build"], function(cb) {
  ghpages.publish(path.join(process.cwd(), "public"), cb);
});
