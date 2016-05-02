## Webpack - The confusing Parts 
### rajrodv

- Webpack just has a unique syntax and new philosophies that may cause confusion in the beginning. Incidentally, these philosophies are also responsible for making it so popular
- two philosophies:
  - Everything is a module:  This mean we can split any artifact into smaller manageable pieces, reuse them and so on.
  - only “what” you need and “when” you need :various features to split your code and generate multiple “bundle” files, and also load parts of the app asynchronously so that you just load what you need and when you need it.
- to create bundles use scripts:
“scripts”: {
//npm run build to build production bundles
“build”: “webpack --config webpack.config.prod.js”,
//npm run dev to generate development bundles and run dev. server
“dev”: “webpack-dev-server”
}

- two interfaces: webpack CLI, webpack-dev-server.
-It’s worth noting that some of the options like “inline” and “hot” are webpack-dev-server only options. Where as some others like “hide-modules” are CLI only options.
- sometimes devServier hot:true doesn't work, use:
//package.json
{
scripts: 
   {“start”: “webpack-dev-server --hot --inline”}
}
-But, if you want to append multiple files that are NOT dependent on each other, you can use the Array format.
- can config entry to output diff dists: 
entry: {
  indexEntry: 'index.js',
  profile: 'prfile'
},
output: {
  pathL '/dist',
  filename: "[name].js" //index & profile.js
}
//profile.html
<script src=”dist/profileEntry.js”></script>
//index.html
<script src=”dist/indexEntry.js”></script>

- output tells the Webpack where and how to store the resulting files. It has two properties “path” and “publicPath” that could be confusing.
- path” simply tells the Webpack where it should store the result. Where as “publicPath” is used by several Webpack’s plugins to update the URLs inside CSS, HTML files when generating production builds.
- Loaders are additional node modules that help ‘load’ or ‘import’ files of various types into browser acceptable formats like JS, Stylesheets and so on. Further loaders also allow importing such files into JS via “require” or “import” in ES6.
- module: {
 loaders: [{
  test: /\.js$/, ←Test for ".js" file, if it passes, use the loader
  exclude: /node_modules/, ←Exclude node_modules folder
  loader: ‘babel’ ←use babel (short for ‘babel-loader’)
 }]
 - Multiple Loaders can be chained and made to work on the same file type. The chaining works from right-to-left and the loader are separated by “!”.
 module: {
 loaders: [{
  test: /\.css$/,
  loader: ‘style!css’ <--(short for style-loader!css-loader)
 }]

 Webpack searches for CSS files dependencies inside the modules. That is Webpack checks to see if a JS file has “require(myCssFile.css)”. If it finds the dependency, then the Webpack gives that file first to the “css-loader”
css-loader loads all the CSS and CSS’ own dependencies (i.e @import otherCSS) into JSON. Webpack then passes the result to “style-loader”.
style-loader to take the JSON and add it to a style tag — <style>CSS contents</style> and inserts the tag into the index.html file.


-babel-loader uses “presets” configuration to know how to convert ES6 to ES5 and also how to parse React’s JSX to JS
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }
  ]
}

- but can keep separate .babelrc file
-Plugins are additional node modules that usually work on the resulting bundle.
//webpack.config.js
//Take all the .css files, combine their contents and it extract them to a single "styles.css"
var ETP = require("extract-text-webpack-plugin");

module: {
 loaders: [
  {test: /\.css$/, loader:ETP.extract("style-loader","css-loader") }
  ]
},
plugins: [
    new ExtractTextPlugin("styles.css") //Extract to styles.css file
  ]
}
-As you might have realized, Loaders work at the individual file level during or before the bundle is generated.
Where as Plugins work at bundle or chunk level and usually work at the end of the bundle generation process. And some Plugins like commonsChunksPlugins go even further and modify how the bundles themselves are created.
- Many Webpack config files have a resolve extensions property that has an empty string like shown below. The empty string is there to help resolve imports without extensions like: require(“./myJSFile”) or import myJSFile from ‘./myJSFile’ without file extensions.
