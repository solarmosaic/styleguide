module.exports.register = function(Handlebars) {
  /**
   * Compiles a Vinyl File.
   *
   * @param name Chunk name
   * @return Contents of compiled file or chunk of file.
   */
  return function(name) {
    var contents = this.contents.toString();
    var template = Handlebars.compile(contents);
    var compiled = template(this.data);
    var chunk = this.data.chunk && this.data.chunk[name];

    return typeof chunk === "undefined" ? compiled : chunk;
  };
};