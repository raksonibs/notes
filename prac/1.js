var cat = {"1": "2", "2": "4", "5": "3"}
var dog =  {"1": "2", "2": "4", "5": "3", "6": "1"}
var keys = []

testCat = function(cat, keys) { 
  if (Object.keys(cat).length ===0) { 
    console.log("we did it")
    return true 
  } else { 
    var breakTest = false;
    // breakTest = keys.map(key) => { 
    //   return cat[0] === k
    // }
    var first = cat[Object.keys(cat)[0]]
    for (var i=0; i < keys.length; i++) {
      if (cat[first] === keys[i]) {
        breakTest = true;
        break;
      }
    }

    if (breakTest) {
      console.log("Dependency detected")
      return false
    } else {
      keys.push(cat[first])
      delete cat[first]
      testCat(cat, keys)
    }
  } 
}

testCat(cat, keys)
testCat(dog, keys)