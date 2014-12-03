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
var fm = require("front-matter");
var gulp = require("gulp");
var layouts = require("handlebars-layouts");
var path = require("path");

var data = require("gulp-data");
var deploy = require("gulp-gh-pages");
var filter = require("gulp-filter");
var handlebars = require("gulp-hbs");
var htmlPrettify = require("gulp-html-prettify");
var nav = require("gulp-nav");
var rename = require("gulp-rename");
var ssg = require("gulp-ssg");

// Extract YAML front matter from files
function frontMatter(file) {
  var content = fm(file.contents.toString());
  file.contents = new Buffer(content.body);

  return _.extend(file.data || {}, content.attributes);
}

/**
 * Load data for a file from a neighboring JSON file
 *
 * @example path/to/foo.hbs -> path/to/foo.json
 */
function fromJson(file) {
  var dataFileName = path.basename(file.path, path.extname(file.path)) + ".json";
  var dataFilePath = path.join(path.dirname(file.path), dataFileName);

  var data;
  try {
    data = require(dataFilePath);
  } catch(err) {
    // Complain about errors that are unrelated to missing JSON data
    if (err.code !== "MODULE_NOT_FOUND") {
      throw err;
    }

    data = {};
  }

  return _.extend(file.data || {}, data);
}

gulp.task("handlebars-helpers", function() {
  return gulp.src("source/helpers/**/*.js")
    .pipe(handlebars.registerHelpers({
      helpers: layouts
    }));
});

gulp.task("handlebars-partials", function() {
  return gulp.src("source/partials/**/*.hbs")
    .pipe(handlebars.registerPartials());
});

gulp.task("build-styleguide", ["html-clean", "handlebars-helpers", "handlebars-partials"], function() {
  return gulp.src("source/views/**/*.hbs")
    // extract data from .json files
    .pipe(data(fromJson))
    // extract data from YAML front matter
    .pipe(data(frontMatter))
    // relocate templates to url friendly locations and generate site structure data
    .pipe(ssg())
    // compile the templates
    .pipe(handlebars.compile())
    // make the html output prettier
    .pipe(htmlPrettify())
    // store in public folder
    .pipe(gulp.dest("public"));
});

// deploy the public folder to gh-pages
gulp.task("deploy", ["build"], function() {
  return gulp.src("public/**/*")
    .pipe(deploy());
});