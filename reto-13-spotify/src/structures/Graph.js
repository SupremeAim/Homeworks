
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set());
    }
  }

  addEdge(vertex1, vertex2) {
    if (vertex1 === vertex2) return;

    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.adjacencyList.get(vertex1).add(vertex2);
    this.adjacencyList.get(vertex2).add(vertex1);
  }

  removeVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) return;

    const neighbors = this.getNeighbors(vertex);

    neighbors.forEach((neighbor) => {
      this.adjacencyList.get(neighbor).delete(vertex);
    });

    this.adjacencyList.delete(vertex);
  }

  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList.has(vertex1)) return;
    if (!this.adjacencyList.has(vertex2)) return;

    this.adjacencyList.get(vertex1).delete(vertex2);
    this.adjacencyList.get(vertex2).delete(vertex1);
  }

  getNeighbors(vertex) {
    if (!this.adjacencyList.has(vertex)) return [];

    return [...this.adjacencyList.get(vertex)];
  }

  getVertices() {
    return [...this.adjacencyList.keys()];
  }

  getEdges() {
    const edges = [];

    this.adjacencyList.forEach((neighbors, vertex) => {
      neighbors.forEach((neighbor) => {
        if (String(vertex) < String(neighbor)) {
          edges.push([vertex, neighbor]);
        }
      });
    });

    return edges;
  }

  bfs(startVertex) {
    if (!this.adjacencyList.has(startVertex)) return [];

    const visited = new Set([startVertex]);
    const queue = [startVertex];
    const result = [];

    while (queue.length > 0) {
      const current = queue.shift();

      result.push(current);

      this.getNeighbors(current).forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

export default Graph;
