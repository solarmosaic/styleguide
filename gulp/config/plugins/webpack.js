/**
 * config/plugins/webpack.js
 *
 * Base configuration settings for Webpack.
 * These settings may be overridden by environment-specific configs.
 *
 * @see http://webpack.github.io/docs/configuration.html
 */

var _ = require("lodash");
var env = require("../../utils/environment");
var glob = require("glob");
var path = require("path");
var paths = require("../paths");
var webpack = require("webpack");

var entryPoints = {};
var nonCommonEntryPoints = [];
var rExtension = /\.js$/;

// Gather up all the entry points found in the assets folder
var entryPointPaths = glob.sync(paths.scripts.entryPointFiles, {
  cwd: paths.base.sourceDir
});

// Convert the entry points into a format that Webpack understands
entryPointPaths.forEach(function(entryFilePath) {
  var chunkName = entryFilePath.replace(rExtension, "");
  entryPoints[chunkName] = "./" + chunkName;

  // Filter out the common entry points for use in optimization later
  if (chunkName.indexOf("common") < 0) {
    nonCommonEntryPoints.push(chunkName);
  }
});

var webpackConfig = {
  context: path.resolve(paths.base.sourceDir),
  debug: env.verbose,
  devtool: "source-map",
  entry: entryPoints,
  externals: {
    handlebars: "Handlebars",
    jquery: "jQuery",
    mosaic: "mosaic",
    window: "window"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(paths.base.buildDir),
    publicPath: paths.base.publicDir
  },
  // http://webpack.github.io/docs/list-of-plugins.html
  plugins: [
    // Automatically split commonly used assets into the "common/body" bundle.
    // Assets are considered common if they appear in more than two bundles.
    new webpack.optimize.CommonsChunkPlugin("scripts/common/body.entry", "[name].js", nonCommonEntryPoints, 2),
    // Make sure dependencies that are loaded in "common/head" bundle
    // and depended on in "common/body" bundle don't get duplicated.
    new webpack.optimize.CommonsChunkPlugin("scripts/common/head.entry", "[name].js", ["scripts/common/body.entry"], Infinity),
    // Prevent Moment.js from loading all its language files.
    // @see https://github.com/webpack/webpack/issues/198
    new webpack.ContextReplacementPlugin(/moment\/lang/, /$^/)
  ],
  resolve: {
    alias: {
      "bootstrap/scripts": "bootstrap-sass-official/assets/javascripts/bootstrap"
    },
    modulesDirectories: [paths.base.nodeDir, paths.base.bowerDir],
    root: [paths.base.sourceDir]
  }
};

// Mixin mode-specific options
_.merge(webpackConfig, env.getConfig(__filename));

module.exports = webpackConfig;