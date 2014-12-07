/**
 * String concatenator
 *
 * @param {...String} Any number of strings to concatenate
 * @param {Object} [options.hash.separator] The separator to use
 *
 * @example {{concat "foo" "bar"}} => "foobar"
 */
module.exports = function() {
  var options = arguments[arguments.length - 1];
  var separator = (options.hash && options.hash.separator) || "";
  return Array.prototype.slice.call(arguments, 0, arguments.length - 1).join(separator);
};
