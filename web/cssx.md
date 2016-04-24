### csx
Similar to JSX, CSSX offers encapsulation. Being able to see all parts of a single component is a big step forward. The separation of concerns defined development for years, but the web is changing. Very often, we’ll work entirely in the browser, and Facebook’s approach with JSX makes a lot of sense. Understanding what is going on is easier when everything is in one place. We bind parts of JavaScript to parts of HTML anyway. By mixing both together, we’re just making these bindings explicit. If it works for HTML, it would definitely work for CSS.
 While I was experimenting with this approach, I identified two issues:
Flash of unstyled text (FOUT) was the first problem. If we rely on JavaScript to deliver the CSS, then the user will see unstyled content for a second (or more) before getting the styled page. This results in layout shifts and leads to a bad user experience.
The second problem is that there is no style sheet. There are plenty of examples of styles being applied with JavaScript, but most of them are inline styles. In other words, they modify the style property of the DOM element. That’s fine, but we can’t go through all of the elements that need styling and change their attributes. Also, not everything can be placed in a style attribute — media queries and pseudo-classes, for example.
There would be a library that stands between your code and the actual styles applied to the page. Its responsibility would be to create a virtual style sheet, and it would associate a `<style>` tag with it. Then, it would provide an API for managing CSS rules. Every interaction with your JavaScript style sheet would be mirrored to the injected `<style>` tag. With this approach, you would keep the dynamic styles tightly coupled to the JavaScript that controls it. You wouldn’t have to define new CSS classes because you would generate the CSS rules on the fly at runtime.
`var sheet = cssx();
var rule = sheet.add('p > a');
var setFontSize = function (size) {
  return { 'font-size': size + 'px' };
};

rule.update(setFontSize(20));
…
rule.update(setFontSize(24));`
So, writing CSS in JavaScript now becomes a composition of object literals. We may use all of the features of the JavaScript language to build them. Simple things like defining a variable, using factory functions and extending base classes are here by default. Encapsulation, reusability, modularity — we get all of these things for free.
`var smallScreen = sheet.add('@media all and (max-width: 320px)');
smallScreen.nested('body', { 'font-size': '10px' });

/* results in
@media all and (max-width: 320px) {
  body {
    font-size: 10px;
  }
}
*/`
And JSX was exactly what I wanted, but for CSS. I started digging into Babel, because that’s the official transpiler of JSX at the moment. It uses the Babylon module to parse the source code and transform it to an abstract syntax tree (AST). Later, the babel-generator parses that tree and turns it into valid JavaScript code. That’s how Babel understands JSX. It uses same approach for the ES6 features that are still not supported by all the browsers.
I knew about AST and how helpful it can be, but I never spent time learning how to generate one. It is basically a process of reading small chunks (or tokens) of the code, one by one. We have a bunch of assertions trying to form a meaningful sequence of tokens. If something is recognized, then we define a context and continue parsing until we exit the current context and continue with another one. Of course, there are many edge cases that have to be covered. And the fun part is that we can’t extend the parser until we know every little detail about it. It took me a couple of weeks to read and really understand what is going on there.
