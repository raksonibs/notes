
class List {
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

  add(i, e) {
    if (i > this.size) {
      throw "IndexOutOfBounds"
    } else {
      // let copy = this.arr.slice();
      this.size++;
      this.arr.splice(i, 0, e);

    }
  }

  get(i) {
    if (i > this.size) {
      throw "IndexOutOfBounds"
    } else {
      return this.arr[i];
    }
  }

  remove(i) {
    if (i > this.size) {
      throw "IndexOutOfBounds"
    } else {
      this.size--;
      return this.arr.splice(i, 1);
    }
  }

  set(i) {
    if (i > this.size) {
      throw "IndexOutOfBounds"
    } else {
      let tmp = this.arr[i];
      this.arr[i] = e;
      return tmp;
    }
  }

  toString() {
    console.log(this.arr);
  }

  dog() {
    console.log(`woof ${this.size}`)
  }

  add_extend(i) {
    if (i+1 > this.size) {
      this.size = this.size * 2;
      this.arr.splice(i, 0, e);
    }
  }

  add_extend_2(i) {
    if (i+1 > this.size) {
      let copy = this.array.slice(); // of size 2 times
      this.size = this.size * 2;
      for (let i = 0; i < copy.size; i++) {
        copy[i] = this.arr[i];
      }

      this.arr.splice(i, 0, e);
    }
  }
}

let d = new List();
d.dog()
d.add(0, 1)
d.add(0, 2)
d.add(0, 3)
// should be 3, 2 1
d.toString();