
class Graph {
  constructor() {
    this.nodes = []
    this.adjList = {}
    this.nextId = 1
  }

  addNode(node) {
    this.nodes.push(node)
    this.adjList[node.id] = []
    return node
  }

  searchNode(id) {
    return this.nodes.find(n => n.id === id) || null
  }

  addCity(name) {
    return this.addNode({
      id: `city-${this.nextId++}`,
      name,
      type: 'city'
    })
  }

  addPerson(name, age, cityId) {
    const city = this.searchNode(cityId)
    if (!city || city.type !== 'city') return null

    const person = this.addNode({
      id: `person-${this.nextId++}`,
      name,
      age,
      cityId,
      type: 'person'
    })

    this.addEdge(person.id, cityId)
    return person
  }

  addEdge(id1, id2) {
    if (!this.searchNode(id1) || !this.searchNode(id2)) return false
    if (id1 === id2) return false

    if (!this.adjList[id1].includes(id2)) {
      this.adjList[id1].push(id2)
      this.adjList[id2].push(id1)
    }

    return true
  }

  addFriendship(id1, id2) {
    const p1 = this.searchNode(id1)
    const p2 = this.searchNode(id2)

    if (p1?.type !== 'person' || p2?.type !== 'person') return false

    return this.addEdge(id1, id2)
  }

  printAdjacency(id) {
    return (this.adjList[id] || [])
      .map(id => this.searchNode(id))
      .filter(Boolean)
  }

  getPeopleByCity(cityId) {
    return this.printAdjacency(cityId).filter(n => n.type === 'person')
  }

  toD3Data() {
    const links = []

    for (const id in this.adjList) {
      for (const vecino of this.adjList[id]) {
        if (id > vecino) continue

        const origen = this.searchNode(id)
        const destino = this.searchNode(vecino)
        const amistad = origen.type === 'person' && destino.type === 'person'

        links.push({
          source: id,
          target: vecino,
          color: amistad ? '#34d3ad' : '#8091ac'
        })
      }
    }

    return {
      nodes: this.nodes.map(n => ({ ...n })),
      links
    }
  }
}

export default Graph
