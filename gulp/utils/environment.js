/**
 * utils/environment.js
 *
 * Configures the environment gulp will operate in.
 * This information is gathered from the command line or
 * from system environment variables.
 *
 * The following are available environment flags:
 *
 * --mode [STRING]
 *  The mode to run commands in. Defaults to "development"
 *
 * --verbose
 *  Enables verbose logging of scripts to the console. Enabled
 *  by default in "development" mode.
 *
 * @example Using multiple flags
 *
 * $ gulp --mode development --verbose
 */

var gutil = require("gulp-util");
var mode = gutil.env.mode || "development";
var optional = require("optional");
var path = require("path");

function isMode(m) {
  return m === mode;
}

function getConfig(filename) {
  return optional(path.resolve(filename).replace("config", "config/modes/" + mode));
}

module.exports = {
  isMode: isMode,
  getConfig: getConfig,
  mode: mode,
  // --silent will override the verbosity setting
  // --verbose is enabled by default in development
  verbose: gutil.env.silent ? false : gutil.env.verbose || isMode("development")
};