// - similiar to classbased model. But in JS no classes, so everything is an object. inheritance is based on prottypal inheritance wher objects inherit directly form others
// - an object contains reference to iancertor in inhertiance hierarchy, the prototype
// - es6 introduces class keyword, but no new model of object orientated. just syntatic sugar for expressing prototype properties and consturctor functions
// - few language features allowing inheritance in js: accessing a nonexistaent property from a JS object causes runtime to look for  a match in object's prototype.propTypes = {
//   - example. car to string result the toString method on car object's inerhetiance if car doesn't have. serches recursively until found
//   - calling new car reates new object with prottype set to value of Car.protptype. allows for setting up prottype chain for new objects. 
//   - calling a function prorty, this found to containg object.
//   -

function Rectangle(x, y) {
    this.x = x;
    this.y = y;
}

Rectangle.prototype.perimeter = function() {
    return 2 * (this.x + this.y);
}

var rect = new Rectangle(1, 2);
console.log(rect.perimeter()); // outputs '6'
}

// protype of object not same as the protype propert of object.t he fomer is used when looking up nonexistent propertines in protype chain, latter used for object creted using new, it will be proprtype of the newly created object. 
// Rectangle.prototype will be the the prototype value used for objects created with new Rectangle() and the prototype of Rectangle itself is actually JavaScript's internal Function.prototype.
// The value holding the prototype of an object is sometimes called the internal prototype link. It's also been historically called __proto__, a name that has some controversy. To be politically correct, it can be called the value that's returned from Object.getPrototypeOf(...)

