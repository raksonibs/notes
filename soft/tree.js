class Tree {
  constructor(size) {
    if (size === undefined) {
      this.size = 0;
    } else {
      this.size = size;
    }

    this.arr = [];
  }

  size() {
    return this.size;
  }

  isEmpty() {
    return this.arr.length === 0;
  }

  isExternal(p) {
    return true;
  }

  isInternal(p) {
    return true;
  }

  isRoot(p) {
    return true;
  }

  iterator() {
    // provides a means fr stepping trhough the elements stored by tree
  }

  positions() {
    // returns collection of notes with tree. 
  }

  root() {

  }

  parent(p) {

  }

  replace(p, o) {

  }

  children(p) {

  }

  visit(p) {
    console.log(p);
  }

  preOrder(p) {
    vist(p);
    this.arr.forEach(function(element, index, array) {
      preOrder(element)
    })
  }

  postOrder(p) {
    this.arr.forEach(function(element, index, array) {
      postOrder(element)
    })
    vist(p);
  }
}

// var o = new Tree();
// o.push(3)
// o.push(4)
// o.push(5)
// o.pop();
// o.top();

export { Tree };