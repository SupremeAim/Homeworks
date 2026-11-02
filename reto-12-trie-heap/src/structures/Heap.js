
class MaxHeap {
  constructor() {
    this.items = []
  }

  push(product) {
    this.items.push(product)
    let i = this.items.length - 1

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2)

      if (this.items[parent].popularity >= this.items[i].popularity) {
        break
      }

      const temp = this.items[parent]
      this.items[parent] = this.items[i]
      this.items[i] = temp

      i = parent
    }
  }

  pop() {
    if (this.items.length === 0) return null

    const first = this.items[0]
    const last = this.items.pop()

    if (this.items.length === 0) return first

    this.items[0] = last
    let i = 0

    while (true) {
      const left = i * 2 + 1
      const right = i * 2 + 2
      let biggest = i

      if (left < this.items.length &&
          this.items[left].popularity > this.items[biggest].popularity) {
        biggest = left
      }

      if (right < this.items.length &&
          this.items[right].popularity > this.items[biggest].popularity) {
        biggest = right
      }

      if (biggest === i) break

      const temp = this.items[i]
      this.items[i] = this.items[biggest]
      this.items[biggest] = temp

      i = biggest
    }

    return first
  }

  size() {
    return this.items.length
  }
}

export default MaxHeap

//uso maxHeap porque el reto solicita devolver primero los productos con mayor popularidad.
