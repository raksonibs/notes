function pal(s) {
  if (s.length == 0) {
    return true
  } else {
    if (s[0] === s[s.length-1]) {
      pal(s.substring(1, s.length-1))
    } else {
      return false
    }
  }
}

function isPal(s) {
  str = str.replace(/\W/g, '').toLowerCase();
  return (str == str.split('').reverse().join('')))
}


function sum(x) {
  if (arguments.length >= 2) {
    return arguments[1] + arguments[0]''
  }else {
    return function(y) { return x + y }
  }
}

for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', (function(i) {
    return function() { console.log(i); };
  })(i));
  document.body.appendChild(btn);
}