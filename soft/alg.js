import _ from "underscore";
import { Stack } from "./stack.js"
import { Queue } from "./queue.js"

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

// var o = new Stack();
// o.push(3)
// o.push(4)
// o.push(5)
// o.pop();
console.log('yo')

function parenMatch(array) {
  var o = new Stack();
  const openings = ["{", "[", "("];
  const closings = ["}", "]", ")"];
  array = array[0].split("");

  for (let i = 0; i< array.length; i ++) {
    // console.log("looking at ", array[i]);
    if (_.contains(openings, array[i])) {
      // console.log("outputting what is going in array", array[i]);
      o.push(array[i]);
    } else {
      if (o.isEmpty()) {
        // console.log("it's empty ", array[i]);
        // console.log(o)
        return false;
      } else {
        // console.log("over here with ", array[i]);
        // console.log("top of stack ", o.top());

        if (
            (o.top() === "{" && array[i] !== "}") || 
            (o.top() === "[" && array[i] !== "]") ||
            (o.top() === "(" && array[i] !== ")")
          ) {
              // console.log("no match ", array[i]);
              return false;            
            } else {
              // console.log("popping")
              o.pop()
            }


      }
    }
  }

  if (o.isEmpty()) {
    return true;
  } else {
    return false;
  }
}

// console.log(_.contains([1,2,3], 5));
// console.log(parenMatch(["{}"]));
// console.log(parenMatch(["{}()[]"]));
// console.log(parenMatch(["{}()["]));
// console.log(parenMatch(["{[]}"]));
// console.log(parenMatch(["{[]()}"]));
// console.log(parenMatch(["{[](){}"]));

// var o = new Queue();
// o.enqueue(3)
// o.enqueue(4)
// o.enqueue(5)
// o.dequeue();
// console.log(o);

// makeHeap(A, n) {
//   for (let i =0; i< n/2; i++) {
//     downHeap(A, i, n)
//   }
// }

// makeHeap(A, i, n) {
//   if (i <= n/2) {
//     makeHeaP(a, left(i), n)
//     makeHeaP(a, right(i), n)
//   }

//   downHeap(a, i n)
// }

function treeSearch(k, v) {
  if (t.isExternal(v)) {
    return v;
  }

  if (key < key(v)) {
    return treeSearch(k, T.left(v))
  } else if (k === key(f)) {
    return v
  } else {
    return treeSearch(k, T.right(v))
  }


}

function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let jmin = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[jmin]) {
        jmin = j;
      }
    }

    swap(array, i, jmin)
  }

  return array;
}

function swap(array, i, jmin) {
  let tmp = array[i];
  array[i] = array[jmin];
  array[jmin] = tmp;
}



function bubbleSort(array) {
  for (let i = array.length; i > 0; i--) {
    let jmin = i;
    for (let j = 0; j < i - 1; j++) {
      if (array[j] > array[j+1]) {
        swap(array, j, j+1);
      }
    }

  }

  return array;
}

function insertionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let key = array[i]
    let j = i;
    while (j > 0 && array[j-1] > key)  {
      swap(array, j, j - 1)
      j = j - 1
    }

    array[j] = key;
  }

  return array;
}

function mergeSort(array) {
  if (array.length > 1) {
    let splitted = split(array, array.length/2);
    let s1 = splitted[0]
    let s2 = splitted[1]
    mergeSort(s1)
    mergeSort(s2)
    merge(s1, s2, array)
  }
}

function merge(s1, s2, array) {
  let i = 0;
  let j = 0;
  while (i < s1.length && j < array.length) {
    if (s1[i] <= s2[j]) {
      s.push(s1[i]);
      i += 1;
    } else {
      s.push(s2[j]);
      j += 1;
    }
  }

  while (i < s1.length) {
    s.push(s1[i]);
    i += 1;
  }

  while (i < s2.length) {
    s.push(s2[j]);
    j += 1;
  }
}

function heapSort(array) {
  let maxHeap = makeMaxHeap(array)

  for (let i = array.length; i > 0; i--) {
    array[i] = maxHeap.removeMax();
  }
}


function quickSort(array) {
  if (array.length > 1) {
    let partitioned = partition(array)
    let left = partitioned[0]
    let equal = partitioned[1]
    let right = partitioned[2]

    quickSort(left)
    quickSort(right)
    array = join(left, equal, right)
    return array;
  } else {
    return array;
  }
}
console.log(insertionSort([2,1,5,5, 2, 9, 5, 3, 10]));