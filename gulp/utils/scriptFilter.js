/**
 * utils/scriptFilter.js
 *
 * Can be used in conjunction with Array.filter to filter
 * out non-JavaScript files.
 */

var path = require("path");

module.exports = function(name) {
  return /(\.js$)/i.test(path.extname(name));
};