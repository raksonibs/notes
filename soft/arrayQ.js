class aQueue {
  constructor(size) {
    if (size === undefined) {
      this.size = 0;
    } else {
      this.size = size;
    }

    this.front = 0;
    this.rear = 0

    this.arr = [];
  }

  size() {
    return this.size;
  }

  isEmpty() {
    return this.front === this.rear;
  }

  front() {
    if (this.isEmpty()) {
      // throw "EmptyStack"
    } else {
      // console.log(this.arr[this.arr.length-1])
      // debugger
      return this.arr[this.front];
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      // throw "EmptyStack"
    } else {
      let last = this.arr[this.front];

      this.arr.splice(this.front, 1);
      this.size -= 1;
      this.front = (this.front + 1) % this.size
      // console.log(last)
      // console.log(this.arr)
      return last;
    }
  }

  enqueue(e) {
    this.arr.push(this.rear);
    this.size =+ 1;
    this.rear = (this.rear + 1) % this.size;
  }
}

export { aQueue };