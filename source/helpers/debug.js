module.exports = function(value) {
  console.log("----------------------------------------");
  console.log(arguments.length > 1 ? value : this);
  console.log("----------------------------------------");
};