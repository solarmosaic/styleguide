/**
 * String concatenator
 *
 * @param {...String} Any number of strings to concatenate
 */
module.exports = function() {
  return Array.prototype.slice.call(arguments, 0, arguments.length - 1).join("");
};
