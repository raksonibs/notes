## Prototypal Object-Oriented Programming using JavaScript
### Mehdi Maujood
- prototypal OOP, which is conceptually different from the class-based systems,
- To make this prototype-based system look like a class-based system, JavaScript’s designers came up with the keyword new and a novel way to use constructor functions. The existence of this pattern and the ability to write “pseudo class-based” code has led to a lot of confusion among developers.
- Conceptually, in class-based OOP, we first create a class to serve as a “blueprint” for objects, and then create objects based on this blueprint. To build more specific types of objects, we create “child” classes; i.e., we make some changes to the blueprint and use the resulting new blueprint to construct the more specific objects.
- Now take this example into the world of prototypes: you don’t create blueprints or classes here, you just create the object

var genericAnimal = Object.create(null);
genericAnimal.name = 'Animal';
genericAnimal.gender = 'female';
genericAnimal.description = function() {
  return 'Gender: ' + this.gender + '; Name: ' + this.name;
};

var cat = Object.create(genericAnimal);
cat.purr = function() {
  return 'Purrrr!';
};

var colonel = Object.create(cat);
colonel.name = 'Colonel Meow';

var puff = Object.create(cat);
puff.name = 'Puffy';

function Person(name) {
  this.name = name;
  this.sayName = function() {
    return "Hi, I'm " + this.name;
  };
}
var adam = new Person('Adam');

function Ninja(name, weapon) {
  Person.call(this, name);
  this.weapon = weapon;
}
Ninja.prototype = Object.create(Person.prototype);
Ninja.prototype.constructor = Ninja;

- it’s important to understand what a call to a constructor does. It first creates an empty object, then sets the prototype of this object to the prototype property of the constructor, then calls the constructor function with this pointing to the newly-created object, and finally returns the object. It’s an indirect way of doing prototype-based OOP
- Every object in JavaScript holds a reference to its parent (prototype) object. When an object is created through Object.create, the passed object—meant to be the prototype for the new object—is set as the new object’s prototype. 

var genericAnimal = Object.create(null); 
<!-- creates proto as null -->
The code below then creates a new empty object with __proto__ set to the genericAnimal object, i.e. rodent.__proto__ points to genericAnimal.
var rodent = Object.create(genericAnimal);
 rodent.size = 'S';

- As we can see, every object holds a reference to its prototype. Looking at Object.create without knowing what exactly it does, it might look like the function actually “clones” from the parent object, and that properties of the parent are copied over to the child, but this is not true. When capybara is created from rodent, capybara is an empty object with only a reference to rodent.
- implementing inheritance: delegation. When we call capybara.size, JavaScript first looks for that property in the capybara object. If not found, it looks for the property in capybara.__proto__. If it didn’t find it in capybara.__proto__, it would look in capybara.__proto__.__proto__. This is known as the prototype chain.
- Setting a property is a little different. When we set capybara.size = 'XXL', a new property called size is created in the capybara object. Next time we try to access capybara.size, we find it directly in the object, set to 'XXL'.
- Since the prototype property is a reference, changing the prototype object’s properties at runtime will affect all objects using the prototype. For example, if we rewrote the description function or added a new function in genericAnimal after creating rodent and capybara, they would be immediately available for use in rodent and capybara, thanks to delegation.

if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

- If you wanted to extend JavaScript’s Math object, how would you do it? Suppose that we would like to redefine the random function without modifying the original Math object, as other scripts might be using it. JavaScript’s flexibility provides many options

var myMath = Object.create(Math);
myMath.random = function() {
  var uber = Object.getPrototypeOf(this);
if (typeof(arguments[0]) === 'number' && typeof(arguments[1]) === 'number' && arguments[0] < arguments[1]) {
    var rand = uber.random();
    var min = Math.floor(arguments[0]);
    var max = Math.ceil(arguments[1]);
    return this.round(rand * (max - min)) + min;
  }
  return uber.random();
};

-  But the key points everyone can agree on are that prototypal OOP is simpler to understand, more flexible, and more dynamic.
- But JavaScript and prototype-based OOP’s dynamic nature makes it simple. Every array is an object and points to a parent prototype object. If we can define the function in the prototype, then our code will work as is without any modification!

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(elem) {
    //Your magical fix code goes here.
};
}

- Simulating class-based OOP without completely understanding prototype-based OOP can lead to unexpected results. 

Animal.prototype.makeBaby=function(){
  var baby=new Animal(); 
  if(!this.hasOwnProperty('offspring')){
    this.offspring=[]; }
  this.offspring.push(baby); 
  return baby;
};