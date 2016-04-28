// Proper Error Handling
// Camilo Reyes

function error() {
    var foo = {};
    return foo.bar();
}

function badHandler(fn) {
    try {
        return fn();
    } catch (e) { }
    return null;
}
// recsuces fn ballback as a depencey, then reutnrs null is something goes bad
(function (handler, bomb) {
    var badButton = document.getElementById('bad');

    if (badButton) {
        badButton.addEventListener('click', function () {
            handler(bomb);
            console.log('Imagine, getting promoted for hiding mistakes');
        });
    }
}(badHandler, error));
//leaves you blind with failsilent strategy.
//wicked handler swallows mistakes and pretends all is well
//if don't care about code quality, but multialyered solution with deep call stacks it is impossible to know where went wrong
//

function uglyHandler(fn) {
    try {
        return fn();
    } catch (e) {
        throw Error('a new error');
    }
}

//  exception gets bubbled up the call stack.
// errors unwind the stack which is super helpful. exception inteeprter will travel up the stack looking for another handler/// but lose orriganl error!

function main(bomb) {
    try {
        bomb();
    } catch (e) {
        // Handle all the error things
    }
}

window.addEventListener('error', function (e) {
    var error = e.error;
    console.log(error);
});

// caths errors within any exuectugin ontexts, centralizes error handling in code, error handlers have single purpose
//gets freeds from try .. catch
window.addEventListener('error', function (e) {
    var stack = e.error.stack;
    var message = e.error.toString();
    if (stack) {
        message += '\n' + stack;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/log', true);
    xhr.send(message);
});

// call stack nice because gets to send via log(//)
// could catch exceptions in aync callback,
// v8 disourages try catch, and recomend blocks at top of call stack
// add global error handler to operate within any executing context
// 
