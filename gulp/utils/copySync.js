/**
 * utils/copySync.js
 *
 * Synchronously copies files or folders from one path to another.
 *
 * @param items {Array} The items to copy
 * @param items.src {String} The source directory of the item.
 * @param items.dest {String} The destination directory of the item.
 * @param [options] {Object} Optional configuration settings.
 * @param [options.baseDest] {String} The base of the destination directory to use when copying.
 * @param [options.baseSrc] {String} The base of the source directory to use when copying.
 *
 * @example
 *
 * copy([
 *   // Copy "/foo/bar.txt" to "/bar/foo.txt"
 *   { src: "bar.txt", dest: "foo.txt" },
 *   // Copy "/foo/baz" (and its contents) to "/bar/baz"
 *   { src: "baz", dest: "baz" }
 * ],
 * {
 *   baseDest: "/foo",
 *   baseSrc: "/bar"
 * });
 */

var fs = require("fs-extra");
var path = require("path");
var util = require("util");

module.exports = function(items, options) {
  items = (util.isArray(items) ? items : [items]);
  options = options || {};
  items.forEach(function(item) {
    var dest = options.baseDest ?
      (item.dest ? path.join(options.baseDest, item.dest) : options.baseDest) :
      item.dest;

    var src = options.baseSrc ?
      (item.src ? path.join(options.baseSrc, item.src): options.baseSrc) :
      item.src;

    fs.copySync(src, dest);
  });
};