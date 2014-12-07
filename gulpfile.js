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
var filter = require("gulp-filter");
var hb = require("./gulp/utils/hb"); // SEE TODO IN FILE
var htmltidy = require("gulp-htmltidy");
var nav = require("gulp-nav");
var rename = require("gulp-rename");

// Generate URL friendly links to pages
function prettyUrl(file) {
  file.extname = ".html";
  if (file.basename !== "index") {
    file.dirname = path.join(file.dirname, file.basename);
    file.basename = "index";
  }

  return file;
}

// Extract YAML front matter from files
function frontMatter(file) {
  var extracted = matter(file.contents.toString());
  file.contents = new Buffer(extracted.content);

  return _.extend(file.data || {}, extracted.data);
}

/**
 * Load data for a file from a neighboring JSON file
 *
 * @example path/to/foo.hbs -> path/to/foo.json
 */
function fromJson(file) {
  var dataFileName = path.basename(file.path, path.extname(file.path)) + ".json";
  var dataFilePath = path.join(path.dirname(file.path), dataFileName);
  return _.extend(file.data || {}, optional(dataFilePath));
}

gulp.task("build-styleguide", ["html-clean"], function() {
  return gulp.src("source/views/**/*.hbs")
    // extract data from .json files
    .pipe(data(fromJson))
    // extract data from YAML front matter
    .pipe(data(frontMatter))
    // relocate templates to url friendly locations
    .pipe(rename(prettyUrl))
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
