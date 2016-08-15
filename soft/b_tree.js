class bTree {
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
    // provides a means fr stepping trhough the elements stored by bTree
  }

  positions() {
    // returns collection of notes with bTree. 
  }

  root() {

  }

  parent(p) {

  }

  replace(p, o) {

  }

  children(p) {

  }

  left(p) {

  }

  hasLeft(p) {

  }

  hasRight(p) {

  }

  right(p) {

  }

  inOrder(p) {
     // used for printing arhtmetic expressions
     // ecaualting arthemitc xpressions is postOrder
    if (hasLeft(p)) {
      inOrder(left(p))
    }
    visit(p)
    if (hasRight(p)) {
      inOrder(right(p))
    }
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

// var o = new bTree();
// o.push(3)
// o.push(4)
// o.push(5)
// o.pop();
// o.top();

export { bTree };