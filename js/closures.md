## Closures
### Michael Dawson

- Closures are a natural way of associating data with the code that acts on the data, with continuation passing as the main semantic style.
- When you use closures, data elements that you define within an enclosing scope become accessible to a function that's created in the scope, even when the enclosing scope is logically exited.
-  functions are first-class variables, this behavior is of great importance, because the lifecycle of functions determines the lifecycle of the data elements that are visible to the function
- easy to inadvertently retain much more data in memory than you expect.
- n asynchronous method takes a callback method (which has an associated closure) as one of its arguments. This function is often defined in-line at the call site for the asynchronous method, and the function has access to the data elements (local variables and parameters) of the scope that encloses the call site.

function outer(a) {
  var b= 20; 
  function inner(c) {
   var d = 40;
   return a * b / (d  c);
 }
 return inner;
}

var x = outer(10);
var y = x(30);

- The callback method is in a state in which it can be invoked (that is, is reachable from a garbage-collection point of view), so it keeps alive all of the data elements to which it has access. To avoid memory leaks, it's important to understand when and for how long the callback method remains in that state.
- At a high level, closures commonly come into play in at least three kinds of use cases. In all three, the fundamental premise is the same: the ability for a small piece of reusable code (a callable function) to work with, and optionally retain, a context.
- n the completion handler pattern, a function (C1) is passed as an argument to a method (M1), and C1 is invoked as a completion handler when M1 is complete. As part of the pattern, the implementation for M1 ensures that the reference that it retains to C1 is cleared after it's no longer needed.

function CustomObject() {
}

function run() {
  var data = new CustomObject()
  setTimeout(function() {
    data.i = 10
  }, 100)
}
run()

- The completion function uses the data variable from the context in which the setTimeout method was called. Even after the run() method has completed, CustomObject can be referenced by the closure that's created for the completion handler and isn't garbage-collected.
- The closure context is created when the completion function (C1) is defined, and the context consists of the variables and the parameters that are accessible in the scope were C1 is created. The closure for C1 is retained until both:
The completion method is invoked and finishes running or the timer is cleared.
No other references to C1 occur. (In the case of anonymous functions, no other references occur if the preceding condition in this list is met.)
- While the timer is in effect, the Timeout object, the _onTimeout field, and the closure function are all held in the heap through one single reference to them — the timeout event that's pending in the system. When the timer fires, and the subsequent callback completes, the pending event in the event loop is removed. All three objects are no longer accessible and become eligible for collection in the subsequent garbage-collection cycle.
- When the timer is cleared (through the clearTimeout method), the completion function is removed from the _onTimeout field and — provided that no other references to the function occur — it can be collected in the subsequent garbage-collection cycle, even though the Timeout object is retained because the main program holds a reference to it.
- In this pattern, the natural flow of execution is such that memory is retained only until the completion handler (C1) finishes its job of "completing" the method (M1). The result is that — provided that the completion of the methods called by the application occurs in a timely manner — you don't need to take special care to avoid memory leaks.
- ou can return an intermediary function, which can be called one or more times to either access the required data or complete the required computation. As with the completion handlers, you create the closure when you define the function, and the closure provides access to all of the variables and parameters that are available in the scope where the function was defined.

function readData() {
  var buf = new Buffer(1024 * 1024 * 100)
  var index = 0
  buf.fill('g')  //simulates real read
    
  return function() {
    index++
    if (index < buf.length) { 
      return buf[index-1]   
    } else {
      return ''
    } 
  }
}

var data = readData()
var next = data()
while (next !== '') {
  // process data()
  next = data()
}

- Even after the application finishes using the intermediary function, the reference to the function keeps the associated closure alive. To allow the data to be collected, the application must overwrite this reference — for example, by setting the reference to the intermediary function as follows: data = null
- It's often possible to construct intermediary functions so that they limit the potential memory leaks. For example, an intermediary that allows incremental reading of a large data set could remove references to the portions of the data that were returned. But in these cases, it's important that this approach not pose a concern for other parts of the application that might have access to that data in a manner other than through the intermediary function.
- allow memory to be released when no onger required in intermiedate

return function() {
    index++;
    if (index < buf.length) { 
      return buf[index-1]   
    } else {
      buf = null
      return 
    } 
  }

- A common pattern is to register functions that listen for the occurrence of a particular event. Though extremely handy in asynchronous programming, this registration causes the listener function to "escape" into the event emitter's internal cache along with any associated closure context. This is fine as long as the events are being generated and processed, and the event interceptor module knows when to stop event emission and clear the listeners. The risk arises when the lifecycle for a listener function becomes indefinite or unknown by the application. As such, listener functions are most at risk of causing a memory leak.

var EventEmitter = require('events').EventEmitter
var ev = new EventEmitter()

function run() {
    var buf = new Buffer(1024 * 1024 * 100)
    var index = 0
    buf.fill('g')
    ev.on('readNext', function nextReader() {
      var byte = buf[index]
      index++
      process(byte)
    });
}

ev.removeEventListener('readNext', nextReader)

- ensure that the lifecycle of the events is well defined and that they can be de-registered when no longer needed.

var http = require('http');

function runServer() {

    /* data local to runServer, but also accessible to
     * the closure context retained for the anonymous 
     * callback function by virtue of the lexical scope
     * in the outer enclosure.
     */
    var buf = new Buffer(1024 * 1024 * 100);
    buf.fill('g');
    
    http.createServer(function (req, res) {
      <!-- kill buffer when end so no memory leaks -->
      res.end(buf);
    }).listen(8080);

}
runServer();

- The lesson is that for any listener that retain a substantial amount of data, you need to understand and document the required lifespan for the listener and ensure that the listener is deregistered when it's no longer necessary. It's also advisable to ensure that listeners retain the minimum amount of data possible across invocations, because of their typically long lifetimes.