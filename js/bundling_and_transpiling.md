## Understanding JavaScript Modules: Bundling & Transpiling
### Mark Brown
- before added $ to global window
window.$ = function() { ... };
<script src="jquery.js"></script>
<script>
$(function() { ... });
</script>
will be: export default function $() { ... }

No globals required 👍
Source order independence
Access to npm
No need to namespace your own application code
Dynamically load modules at any time as required

- a lot of wheel re-invention going on and a lot of wasted hours

ES2015 modules are the one true future module format for JavaScript.
Babel is the ES2015 compiler of choice today.
Native loaders are still a while away from being available in browsers, a report on the Future of JavaScript by Telerik suggests that complete ES2015 support could take over two years given the module loading hurdle.
If you want to use modules now, that will very likely involve CommonJS at some point.

-, you can see that it really just boils down to one function that is immediately invoked. It's an immediately invoked function expression which you may be familiar with. Then these are the arguments that are passed to that function. You can see here that this is the contents of our entry.js file here, and then here are the contents of our dep.js file. What you'll notice is that the contents of each of these files is now wrapped in a closure.
-Our entry.js file here, the contents of it are wrapped in this function. You can see what's passed into this function is require, module, and export. Where those things would normally be provided by the node environment, in this case Browserify is providing them for us. Essentially it's just mapping each of these files to a lookup, so you can see that our dep.js file has been given the ID of 1, so we've got an object hash here. The ID of 1 maps to this file and its dependencies. The ID of 2 maps to what was our entry.js file and its dependencies.
- Webpack is a module bundler. Webpack takes modules with dependencies and generates static assets representing those modules.
- t’s not really important to understand how these tools work internally, the important thing to note is that whilst the implementations are different they are essentially doing the same task of compiling the same code with CommonJS modules into standard browser-friendly JavaScript. Each module is put inside a function within bundle.js and assigned an ID so that it can be loaded as required.

There’s far more to Webpack than this though! It truly is the swiss army knife of module bundlers. Webpack also comes with great tools for development out of the box, things like hot module replacement which will automatically reload individual modules in the browser as they are changed—similar to LiveReload but without the page refresh.
- Our Webpack example earlier was the simplest example using the default options, it compiled entry.js with CommonJS modules down into a single bundle.
Webpack is the current juggernaut and you’ll be able to configure it to do almost anything. jspm is a great tool for all your bundling needs and works with a variety of formats and has a nice developer experience. Browserify is still a solid option, the grandfather of modern module bundlers—it’s ecosystem has grown to include some of Webpack’s much loved features (such as bundle splitting and hot reloading). Finally System.js is perfect for when you need to be able to load extra modules at runtime.