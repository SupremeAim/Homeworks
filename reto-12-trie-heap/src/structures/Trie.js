
class TrieNode {
  constructor(letter = '') {
    this.letter = letter
    this.children = {}
    this.isEndOfWord = false
    this.product = null
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  insert(name, popularity) {
    let current = this.root

    for (const letter of name.toLowerCase().trim()) {
      if (!current.children[letter]) {
        current.children[letter] = new TrieNode(letter)
      }

      current = current.children[letter]
    }

    current.isEndOfWord = true
    current.product = { name, popularity }
  }

  searchPrefix(prefix) {
    let current = this.root

    for (const letter of prefix.toLowerCase().trim()) {
      if (!current.children[letter]) return []
      current = current.children[letter]
    }

    const products = []

    const collect = node => {
      if (node.isEndOfWord) {
        products.push(node.product)
      }

      Object.values(node.children).forEach(collect)
    }

    collect(current)
    return products
  }
}

export default Trie
