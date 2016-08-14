console.log("YO")

var fib = function(n) {
  if (n === 0 || n === 1) {
    return n;
  } else {
    return n * fib(n - 1);
  }
}

var num = fib(5);
console.log(num);

var powers = function(x, n) {
  if (n === 0) {
    return 1;
  } else {
    return x * powers(x, n- 1)
  }
}

var powers2 = function(x, n) {
  if (n === 0) {
    return 1;
  } if (n % 2 === 1) {
    return x * Math.pow(powers(x, (n - 1)/2), 2);
  } else {
    return Math.pow(powers(x, (n)/2), 2);
  }
}
// only one power is executed per frame.
// each time we make recursively call, we halve the value of n. thus make log n recursive calles, so o(logn)

var num2 = powers2(4, 2)
console.log(num2);


var reverseArray = function(A, i, j) {
  if (i < j) {
    var tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;
    reverseArray(A, i+1, j-1);
  } else {
    // console.log(A);
    return A;
  }
}

var array = [1,2,3,5,6,7]
var arr = reverseArray(array, 0, array.length-1);
console.log(arr);

var fib2 = function(n) {
  if (n < 2) {
    return n;
  } else {
    return fib(n-1) + fib(n-2);
  }
}

var fib3 = function(n) {
  if (n === 1) {
    return [n, 0];
  } else {
    var i;
    var j;
    [i, j] = fib3(n-1);
    return [i+j, i];
  }
}

var towers = function(n, source, destination, spare) {
  if (n === 1) {
    move(n, source, destination);
  } else {
    towers(n - 1, source, spare, destination);
    move(n, source, destination);
    towers(n - 1, space, destination, source);
  }
}

var move = function(n, source, destination) {
  disks[source] = n;
  disks[destination] = n;
}
console.log("wtf")

import { Stack } from "./stack.js"

var o = new Stack();
o.push(3)
o.push(4)
o.push(5)
o.pop();
o.top();