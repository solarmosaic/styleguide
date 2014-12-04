module.exports.register = function(Handlebars) {
  /**
   * {{partial}}
   * Alternative to {{> partial }}
   *
   * @param {String} name The name of the partial to use
   * @param {Object} [context] The context to pass to the partial
   * @return {String} Returns compiled HTML
   *
   * @xample: {{partial 'foo' bar}}
   */
  Handlebars.registerHelper("partial", function(name, context) {
    var template = Handlebars.partials[name];
    if (!template) {
      throw new Handlebars.Exception("Partial not found: " + name);
    }

    // Compile template if not already compiled
    if (typeof template !== "function") {
      template = Handlebars.compile(template);
    }

    var output = template(context);
    return new Handlebars.SafeString(output);
  });
};
