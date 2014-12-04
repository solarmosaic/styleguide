module.exports = function(value) {
  console.log("----------------------------------------");
  if (arguments.length > 1) {
    Array.prototype.slice.call(arguments, 0, arguments.length - 1).forEach(function(arg) {
      console.log(arg);
    });
  } else {
    console.log(this);
  }
  console.log("----------------------------------------");
};
