// in promise async code, rejections used for error handling but rejections amy get lost, leading ot silent failures
   function main() {
        asyncFunc()
        .then(···)
        .then(() => console.log('Done!'));
    }

// only chrome reports unhalded rejections:
 window.addEventListener('unhandledrejection', event => ···);
 //The event is an instance of PromiseRejectionEvent whose two most important properties are:

// promise: the Promise that was rejected
// reason: the value with which the Promise was rejected

window.addEventListener('unhandledrejection', event => {
    // Prevent error output on the console:
    event.preventDefault();
    console.log('Reason: ' + event.reason);
});

function foo() {
    Promise.reject('abc');
}
foo();

 window.addEventListener('rejectionhandled', event => ···);

 window.addEventListener('unhandledrejection', event => {
      // Prevent error output on the console:
      event.preventDefault();
      console.log('Reason: ' + event.reason);
  });
  window.addEventListener('rejectionhandled', event => {
      console.log('REJECTIONHANDLED');
  });
  
  
  function foo() {
      return Promise.reject('abc');
  }
  var r = foo();
  setTimeout(() => {
      r.catch(e => {});
  }, 0);