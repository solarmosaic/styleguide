module.exports.register = function(Handlebars) {
  /**
   * Define `@data` properties inside of a block.
   *
   * @param {Object} options.hash A hash of properties to set.
   *
   * @example {{#defining foo="bar"}}@foo{{/defining}}
   */
  Handlebars.registerHelper("defining", function(options) {
    var data;

    if (options.data && options.hash) {
      data = Handlebars.createFrame(options.data);
      Object.keys(options.hash).forEach(function(key) {
        data[key] = options.hash[key];
      });
      options.data = data;
    }

    return options.fn(this, options);
  });
};
