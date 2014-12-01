var gutil = require("gulp-util");
var path = require("path");
var through = require("through2");

var name = "gulp-rev-manifest-combine";

/**
 * Creates a master manifest file from several manifests.
 *
 * @param filename The filename to write to.
 * @param options Plugin options
 * @param options.base Base path to prefix to asset paths.
 *
 * @returns A readable/writable stream
 */
module.exports = function(filename, options) {
  if (!filename) {
    throw new gutil.PluginError(name, "missing filename");
  }

  options = options || {};
  options.base = options.base || "";

  var firstFile = null;
  var manifest = {};

  function stream(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);

    } else if (file.isStream()) {
      this.emit("error", new gutil.PluginError(name, "streaming is not supported"));

    } else {
      if (!firstFile) {
        firstFile = file;
      }

      var content;
      try {
        content = JSON.parse(file.contents.toString("utf8"));
      } catch(error) {
        content = {};
        gutil.log("Skipped due to errors: " + file.path);
      }

      // Prefix manifest entries with the proper base paths
      var base = path.join(options.base, path.dirname(file.relative));
      for (var prop in content) {
        manifest[path.join(base, prop)] = path.join(base, content[prop]);
      }
    }

    cb();
  }

  function end(cb) {
    if (firstFile) {
      this.push(new gutil.File({
        cwd: firstFile.cwd,
        base: firstFile.base,
        path: path.join(firstFile.base, filename),
        contents: new Buffer(JSON.stringify(manifest, null, options.space))
      }));
    }

    cb();
  }

  return through.obj(stream, end);
};