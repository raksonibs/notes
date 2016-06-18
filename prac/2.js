//  facvor object composition over class inheritance

// type of bar, surprise is null is also an object in js. check if bar is null as well
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));
//  part of enclosping scope with var, expecte to be undefined.
// var a = b = 3 is actually b = 3, var a = b. so if you are not using strict mode, b is actually defined. b is defined outside function and ends up being a global variable
// in strict mode b is not defined

var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo); //defined
        console.log("outer func:  self.foo = " + self.foo); //defined
        (function() {
            console.log("inner func:  this.foo = " + this.foo); //undefined
            console.log("inner func:  self.foo = " + self.foo); // defined
        }());
    }
myObject.func();

// wrapping entire in function block: creates a closure around entire file, creates a private namespace and helps prevent potential name clashes. allow easily referencable alias for global variable.

// use strict enforece stric parsing and error handling, prevents accidental globals, elminates this coercion, makes debugggin easier,disslows duplicate property names

function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}
// foo2 returns undefined, as a result return statement is encountered and a semiconolon accidentally given it.

// nan = "abc"/4. Nan is actually a number though Nan === "number" os true, while NaN === NaN is fals. use Number.isNan() 

console.log(0.1 + 0.2); ?? 0.30000004
console.log(0.1 + 0.2 == 0.3);// false from floating point precision


// es6 Number.isInteger()
function isInteger(x) {
  return (x^0) === x //

  Math.round(x) === x
}