class Stack {
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
    return this.size === 0;
  }

  top() {
    if (this.isEmpty()) {
      throw "EmptyStack"
    } else {
      console.log(this.arr[this.arr.length-1])
      return this.arr[this.arr.length-1];
    }
  }

  pop() {
    if (this.isEmpty()) {
      throw "EmptyStack"
    } else {
      let last = this.arr[this.arr.length-1];

      this.arr.splice(this.arr.length - 1, 1)
      console.log(last)
      console.log(this.arr)
      return last;
    }
  }

  push(e) {
    this.arr.splice(0 ,0 ,e);
    this.size =+ 1;
  }
}

var o = new Stack();
o.push(3)
o.push(4)
o.push(5)
o.pop();
o.top();

export { Stack };