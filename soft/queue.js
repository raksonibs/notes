class Queue {
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

  front() {
    if (this.isEmpty()) {
      // throw "EmptyStack"
    } else {
      // console.log(this.arr[this.arr.length-1])
      // debugger
      return this.arr[0];
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      // throw "EmptyStack"
    } else {
      let last = this.arr[0];

      this.arr.splice(-0, 1);
      this.size -= 1;
      // console.log(last)
      // console.log(this.arr)
      return last;
    }
  }

  enqueue(e) {
    this.arr.push(e);
    this.size =+ 1;
  }
}

export { Queue };