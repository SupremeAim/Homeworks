
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.word = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  normalize(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  insert(word) {
    const normalized = this.normalize(word);

    if (!normalized) return;

    let current = this.root;

    for (const character of normalized) {
      if (!current.children.has(character)) {
        current.children.set(character, new TrieNode());
      }

      current = current.children.get(character);
    }

    current.isEndOfWord = true;
    current.word = word;
  }

  search(word) {
    const normalized = this.normalize(word);
    let current = this.root;

    for (const character of normalized) {
      if (!current.children.has(character)) return false;
      current = current.children.get(character);
    }

    return current.isEndOfWord;
  }

  startsWith(prefix) {
    const normalized = this.normalize(prefix);
    let current = this.root;

    for (const character of normalized) {
      if (!current.children.has(character)) return false;
      current = current.children.get(character);
    }

    return true;
  }

  autocomplete(prefix, limit = 8) {
    const normalized = this.normalize(prefix);

    if (!normalized) return [];

    let current = this.root;

    for (const character of normalized) {
      if (!current.children.has(character)) return [];
      current = current.children.get(character);
    }

    const suggestions = [];

    const collectWords = (node) => {
      if (suggestions.length >= limit) return;

      if (node.isEndOfWord) {
        suggestions.push(node.word);
      }

      for (const child of node.children.values()) {
        collectWords(child);
        if (suggestions.length >= limit) return;
      }
    };

    collectWords(current);

    return suggestions;
  }
}

export default Trie;