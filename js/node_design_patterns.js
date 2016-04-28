//Design Patterns
// Stephen Belanger

// callbacks
// ananymous function given to antoehr with intenet of calling it later. ex:
keyValueStore.get(‘my-data’, function (err, data) {
})

// err callback used to pass whatever data the interface is expcted to return. accespting callbacks are asyncyhous and anymonous
// event emiters
// special contrcut allow an interface to designate many callbacks for diff behaviors:
var emitter = new EventEmitter
emitter.on(‘triggered’, function () {
 console.log(‘The event was triggered’)
})
emitter.emit(‘triggered’)
//event emitters are themselves synchronous, but things attahed to are not. 
//streams
// special type of event emitter deisgned for consuming a seuqnces of data events without having to buffer the entire sequence in memory. ex reading larfe files
var file = fs.createReadStream(‘something’)
file.on(‘error’, function (err) {
 console.error(‘an error occured’, err)
})
file.on(‘data’, function (data) {
 console.log(‘I got some data: ‘ + data)
})
file.on(‘end’, function () {
 console.log(‘no more data’)
})
//pipe stream automaitcally propgates appricate events from source to target streama nd is chaniable:
socket.pipe(jsonParseStream()).pipe(eachObject(function (item) {
 console.log(‘got an item’, item)
}))
socket
.on(‘error’, function (err) {
 console.error(‘a socket error occurred’, err)
})
.pipe(jsonParseStream())
.on(‘error’, function (err) {
 console.error(‘a json parsing error occurred’, err)
})
.pipe(iterateStream(function (item) {
 console.log(‘got an item’, item)
}))
.on(‘error’, function (err) {
 console.error(‘an iteration error occurred’, err)
})
 // singleton single instance of object, alsoe sometimes constructed as closuress to prevent acces to private date:
 var linesSingleton = (function () {
   var content = ‘’
   return {
     push: function (line) {
       content += line + ‘\n’
     },
     forEach: function (fn) {
       content.split(‘\n’).forEach(fn)
     }
   }
 })()

 // constructors includeing propertype for functions:
 function Person (name) {
   this.name = name
 }
 Person.prototype.greet = function () {
   return ‘Hello, I am ‘ + this.name + ‘.’
 }

 function makePerson (name) {
   return {
     greet: function () {
       return ‘Hello, I am ‘ + name + ‘.’
     }
   }
 }

 // middleware/pipeling simliar to pipe streams but used to buld flow of transfomrations something not flow based, like express.
 var app = connect()
app.use(function (req, res, next) {
 req.name = ‘World’
 next()
})
app.use(function (req, res) {
 res.send(‘Hello, ‘ + req.name)
})

// es6 gives Promise. used to encapsulate a resolvable or rejectable behavior that may be async or not, but will not contnue exucturion until a future iteration. inteface include then allowing for callbacks and cath. Promise API is chaniable
function delay (n) {
 return new Promise(function (resolve, reject) {
 setTimeout(function () {
 resolve(n)
 }, n)
 })
}
var promise = delay(100)
 .then(function (n) {
 return delay(n)
 })
 .then(function (n) {
 console.log(‘this was delayed for ‘ + (n * 2) + ‘ms’)
 })

 // dependecy injections, not needed.
 // factory functionsm returncaes instances of sonctrutor like http.creatserver