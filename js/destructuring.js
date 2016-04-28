// Destructuring and Default Params in ES6
// Doug Wade


export default (routes, {
  workingDir = ‘./__clientTemp’,
  routesDir = ‘.’,
  ...
} = {}) => {
  // function body omitted
}

// what does the above mean?
export default (routes, {
  workingDir: workingDir,
  routesDir: routesDir} = {
  workingDir: ‘./__clientTemp’,
  routesDir: ‘.’
}) {
  // function body omitted
}

// but actually
export default (routes, {
  workingDir = './__clientTemp',
  routesDir = '.',
} = {}) => {
  console.log(workingDir);
  console.log(routesDir);
}

{ x = 1, y = 2 } = {} //Destructuring, 
[{x=0, y=0} = {}] <- [{z:3}] // 




var { x = 3 } = {};
console.log(x);
// 3