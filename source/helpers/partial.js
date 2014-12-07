var matter = require("gray-matter");
var optional = require("optional");
var path = require("path");

// TODO move to external repo and require here with options
module.exports.register = function(Handlebars) {
  var cache = {};
  var options = {
    base: "source/partials",
    cwd: process.cwd(),
    dataExtension: ".json",
    partialExtension: ".hbs"
  };

  function error(message) {
    throw new Handlebars.Exception("#partial: " + message);
  }

  function getPartial(name) {
    var file;
    var filepath = path.join(options.cwd, options.base, name);
    var partial;

    // Load and parse file contents for front-matter
    try {
      file = matter.read(filepath + options.partialExtension);
    } catch(err) {
      error(err.message);
    }

    // Load optional associated file data
    try {
      Handlebars.Utils.extend(file.data, optional(filepath + options.dataExtension))
    } catch(err) {
      // Complain about errors unrelated to file existance
      // TODO remove when the following is available in npm
      // https://github.com/tony-o/node-optional/issues/2
      if (err.code !== "MODULE_NOT_FOUND") {
        error(err.message);
      }
    }

    // Define partial
    partial = {
      content: file.content,
      context: {
        file: {
          data: file.data
        }
      },
      name: name,
      original: file.original,
      path: filepath,
      template: Handlebars.compile(file.content)
    };

    // Cache it
    cache[name] = partial;

    return partial;
  }

  /**
   * Alternative partial implementation that allows partials to have context.
   *
   * @param {String} name The name of the partial
   * @param {Object} [context] Additional context for rendering the partial
   * @return The HTML of the rendered partial
   *
   * @example {{{partial [foo/bar] baz}}}
   */
  Handlebars.registerHelper("partial", function(name, context) {
    if (name === undefined) {
      error("Name must be defined");
    }

    var data;
    var options = arguments[arguments.length - 1];
    var partial = cache[name] || getPartial(name);

    // Define @data keys
    if (options.data) {
      data = Handlebars.createFrame(options.data);
      data.base = context;
      data.name = partial.name;
      data.path = partial.path;
      options.data = data;
    }

    // Mutate context with partial data
    Handlebars.Utils.extend(context, partial.context);

    // Parse template into HTML
    var html = partial.template(context, options);

    return new Handlebars.SafeString(html);
  });
};
