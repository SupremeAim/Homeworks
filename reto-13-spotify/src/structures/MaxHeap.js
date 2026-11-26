
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  get size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  insert(song) {
    this.heap.push(song);
    this.bubbleUp(this.heap.length - 1);
  }

  peek() {
    return this.heap[0] || null;
  }

  extractMax() {
    if (this.isEmpty()) return null;

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();

    this.bubbleDown(0);

    return max;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.heap[parent].plays >= this.heap[index].plays) {
        break;
      }

      [this.heap[parent], this.heap[index]] =
        [this.heap[index], this.heap[parent]];

      index = parent;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;

    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let largest = index;

      if (
        left < length &&
        this.heap[left].plays > this.heap[largest].plays
      ) {
        largest = left;
      }

      if (
        right < length &&
        this.heap[right].plays > this.heap[largest].plays
      ) {
        largest = right;
      }

      if (largest === index) break;

      [this.heap[index], this.heap[largest]] =
        [this.heap[largest], this.heap[index]];

      index = largest;
    }
  }

  getTopK(k = 5) {
    const copy = new MaxHeap();
    copy.heap = [...this.heap];

    const result = [];

    for (let i = 0; i < Math.min(k, copy.size); i++) {
      result.push(copy.extractMax());
    }

    return result;
  }
}

export default MaxHeap;