## Memory leak patterns in JavaScript
### Abhijeet Bhattacharya

- JavaScript is a garbage collected language, meaning that memory is allocated to objects upon their creation and reclaimed by the browser when there are no more references to them
- While there is nothing wrong with JavaScript's garbage collection mechanism, it is at odds with the way some browsers handle the allocation and recovery of memory for DOM objects.
-  use reference counting to handle memory for DOM objects. In a reference counting system, each object referenced maintains a count of how many objects are referencing it. If the count becomes zero, the object is destroyed and the memory is returned to the heap. Although this solution is generally very efficient, it has a blind spot when it comes to circular (or cyclic) references.
- A circular reference is formed when two objects reference each other, giving each object a reference count of 1. In a purely garbage collected system, a circular reference is not a problem: If neither of the objects involved is referenced by any other object, then both are garbage collected. In a reference counting system, however, neither of the objects can be destroyed, because the reference count never reaches zero. In a hybrid system, where both garbage collection and reference counting are being used, leaks occur because the system fails to identify a circular reference. In this case, neither the DOM object nor the JavaScript object is destroyed. 
- 

## Understand memory leaks in JavaScript applications
### Ben Dolmar

- e context of a single page with no hard page refreshes. In that context, it's easy to retain memory from one state of the application to another when it's no longer needed, or relevant.
- When an object is created, JavaScript automatically allocates an appropriate amount of memory for that object. From that point on, the object is continually evaluated by the garbage collector to see if it is still a valid object.
- At regular intervals, the garbage collector sweeps through the object graph and counts the number of other objects that have a reference to each object. If an object has a count of zero (no other object has a reference to it), or if the only references to it are circular, the object's memory can be reclaimed. 

var Leaker = function(){};

Leaker.prototype = {
    init:function(){
        this._interval = null;
        this.start();
    },

    start: function(){
        var self = this;
        this._interval = setInterval(function(){
            self.onInterval();
        }, 100);
    },

    destroy: function(){
        if(this._interval !== null){
            clearInterval(this._interval);          
        }
    },

    onInterval: function(){
        console.log("Interval");
    }
};

- Any local variable that is referenced in a closure is retained by the closure for as long as the closure exists. To ensure that the callback for the setInterval method executed with access to Leaker instance's scope, the this variable was assigned to the local variable self, which was used to trigger onInterval from within the closure. When onInterval fires, it has access to any instance variables in the Leaker object including self. However, the Leaker object is not garbage collected for as long as the event listener exists.
-  The primary purpose of a destroy function is to centralize the responsibility for cleaning up anything that the object has done that will:
Prevent its reference count from dropping to 0 (for example, removing problematic event listeners and callbacks and unregistering from any services).
Consume unnecessary CPU cycles, such as intervals or animations.
The destroy method is often a necessary step toward cleaning up an object, but it is rarely sufficient. Other objects that retain a reference to the destroyed object could, in theory, call methods on it after the instance has been destroyed. Because this situation can lead to very unpredictable results, it's critical that a destroy method be called only when the object really is about to go away.
- One particularly obscure way to retain an object in memory is to log it to the console.
- A cycle happens when two objects reference each other in such a way that both objects retain each other,
- Sometimes a cycle exists between two objects that do not have a strong enough relationship for one of them to assume responsibility for the other object's lifecycle. In such a case, the object that established the relationship between the two objects should assume responsibility for breaking the cycle when it is destroyed. 

