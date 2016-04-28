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