/**
 * utils/requireScripts.js
 *
 * Requires all of the scripts in a directory and stores the result
 * in an object of filename to file content pairs.
 */

var fs = require("fs");
var path = require("path");
var onlyScripts = require("./scriptFilter");

module.exports = function(dir, cb) {
  var files = fs.readdirSync(dir).filter(onlyScripts);
  var obj = {};

  cb = cb || function() {};

  files.forEach(function(file) {
    var module = require(path.join(dir, file));
    var name = path.basename(file, path.extname(file));
    var modified = cb(module, name, file);
    obj[name] = modified !== undefined ? modified : module;
  });

  return obj;
};