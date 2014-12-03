/**
 * Stores chunks of compiled templates in context.
 * TODO investigate using the "content" or "block" helpers as a wrapper instead
 *
 * @param name Chunk name
 * @param options Handlebars options object
 * @return The compiled template block
 */
module.exports = function(name, options) {
  var contents = options.fn(this);
  var data = options.data && options.data.root || this;

  data.chunk = data.chunk || {};
  data.chunk[name] = contents;

  return contents;
};