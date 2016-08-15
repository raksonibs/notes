class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }

  getElement() {
    return this.element;
  }

  getNext() {
    return this.next;
  }

  setElement(element) {
    return this.element = element
  }

  setNext(next) {
    return this.next = next
  }
}

class DNode {
  constructor(element, next, previous) {
    this.element = element;
    this.next = next;
    this.previous = previous;
  }

  getElement() {
    return this.element;
  }

  getNext() {
    return this.next;
  }

  setElement(element) {
    return this.element = element
  }

  setNext(next) {
    return this.next = next
  }
}

class SLinkedList {
  constructor(size) {
    if (size === undefined) {
      this.size = 0;
    } else {
      this.size = size;
    }

    this.head = null;
    this.tail = null;

    this.arr = [];
  }

  size() {
    return this.size;
  }

  isEmpty() {
    return this.front === this.rear;
  }

  insert() {
    // insert at head
  }

  remove() {
    // remove at head
  }

  insertT() {
    // insert at tail
  }

  removeT() {
    // not efficient for single linked list
    // remove at tail
  }

  
}

class DLinkedList {
  constructor(size) {
    if (size === undefined) {
      this.size = 0;
    } else {
      this.size = size;
    }

    this.head = null;
    this.tail = null;

    this.arr = [];
  }

  size() {
    return this.size;
  }

  isEmpty() {
    return this.front === this.rear;
  }

  
}

export { SLinkedList, DLinkedList };