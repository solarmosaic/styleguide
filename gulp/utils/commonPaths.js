/**
 * utils/commonPaths.js
 */

var path = require("path");

module.exports = function(base, item) {
  var paths = {};

  // Optional base parameter defaults to config/paths/base
  if (arguments.length === 1) {
    item = base;
    base = require("../config/paths/base");
  }

  // Directories
  if (item.dir) {
    paths.buildDir = path.join(base.buildDir, item.dir);
    paths.publicDir = path.join(base.publicDir, item.dir);
    paths.sourceDir = path.join(base.sourceDir, item.dir);
  }

  var buildDir = paths.buildDir || base.buildDir;
  var sourceDir = paths.sourceDir || base.sourceDir;

  // Files
  if (item.files) {
    paths.buildFiles = path.join(buildDir, item.files);
    paths.sourceFiles = path.join(sourceDir, item.files);
  }

  // Manifest
  if (item.manifest) {
    paths.buildManifest = path.join(buildDir, item.manifest);
  }

  // Source maps
  if (item.sourceMapFiles) {
    paths.buildSourceMapFiles = path.join(buildDir, item.sourceMapFiles);
  }

  // Vendor
  if (item.vendor) {
    paths.vendorBuildDir = path.join(buildDir, item.vendor);
    paths.vendorSourceDir = path.join(sourceDir, item.vendor);

    if (item.files) {
      paths.vendorBuildFiles = path.join(paths.vendorBuildDir, item.files);
      paths.vendorSourceFiles = path.join(paths.vendorSourceDir, item.files);
    }
  }

  return paths;
};