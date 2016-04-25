// loops nbuild from gorund up, and they mutate. so none in functional programming
var sum = function(cs) {
  if (cs.length === 0) return 0;
  return first(cs) + sum(rest(cs));
}

var reverse = function(cs) {
  if (cs.length === 0) return [];
  return reverse(rest(cs)).concat(first(cs));
}

//es6 has proper tail calls for avoiding growing memory and allowing for recursion
// can release memory with helper function

var sum = function(list) {
  function go(acc, sx) {
    if (xs.length == 0) return acc;
    return go(acc+first(xs), rest(xs));
  }
  return go(0, list);
}

// can use reduce, capture rescurion pattern in reduce function.

var reduce = function(f, acc, xs) {
  if (xs.legnth === 0) return acc;
  return reduce(f, f(acc, first(xs)), rest(xs));
}

var sum = function(cs) {
  return reduce((acc, c) => c + acc, 0 , cs);
}

// catamorphisim: rwith reduce or fold. 
// any loop can be captured with a fold. 
//apomorphism is different, paramorphism.  higher order function for functional programming

// anamorphisim - unfold.  functional equivalent of a while loop
//

var Nil = {}

var _Cons = function(h, t1) {
  this.head = h;
  this.tail = t1;
};
var Cons = function(h, t1) { return new _Cons(h, t1)}

var lst = Cons(3, Cons(4, Cons(5, Nil)))

// transducers, if have map and do agenreal reduce, have accumaulation transformation and iteration, 

// benefits of function expressions. clsures, arugment to otehr ufcntions, immediately invoked function expressions. 
// closure used want to give paramters to a function, before function is exectued. allows you to retain other information such as the index, in situations where that information will no longer be avalabile when function is executed.
function tabsHandler(index) {
    return function tabClickEvent(evt) {
        // Do stuff with tab.
        // The index variable can be accessed from within here.
    };
}

var tabs = document.querySelectorAll('.tab'),
    i;

for (i = 0; i < tabs.length; i += 1) {
    tabs[index].onclick = tabsHandler(i);
}

// pass index as a function argument to outer function so can pass that value to an inner function. 
var list = ['item1', 'item2', 'item3'],
    i,
    doSomethingHandler = function (itemIndex) {
        return function doSomething(evt) {
            // now this doSomething function can retain knowledge of
            // the index variable via the itemIndex parameter,
            // along with other variables that may be available too.
            console.log('Doing something with ' + list[itemIndex]);
        };
    };

for (i = 0; i < list.length; i += 1) {
    list[i].onclick = doSomethingHandler(i);
}


// function expressions passed directly to functions withouthainvg to be assigned to an interemidate temporary variable.
// iifes, or immediately invoked function expressions, are used to prevent functions and varaibles from affecting global scopre. all proprties withtn are scopped to the anynomus funciton.
var myModule = (function () {
    var privateMethod = function () {
        console.log('A private method');
    },
    someMethod = function () {
        console.log('A public method');
    },
    anotherMethod = function () {
        console.log('Another public method');
    };

    return {
        someMethod: someMethod,
        anotherMethod: anotherMethod
    };
}());