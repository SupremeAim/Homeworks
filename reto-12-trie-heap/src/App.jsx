
import { useState } from 'react'
import Trie from './structures/Trie'
import MaxHeap from './structures/Heap'
import './App.css'

const productos = [
  { name: 'air max', popularity: 90 },
  { name: 'air force', popularity: 95 },
  { name: 'air jordan', popularity: 85 },
  { name: 'adidas boost', popularity: 80 }
]

const trie = new Trie()

productos.forEach(producto => {
  trie.insert(producto.name, producto.popularity)
})

function buscarTopK(prefijo, cantidad) {
  const encontrados = trie.searchPrefix(prefijo)
  const heap = new MaxHeap()

  encontrados.forEach(producto => heap.push(producto))

  const resultados = []

  while (heap.size() > 0 && resultados.length < cantidad) {
    resultados.push(heap.pop())
  }

  return { resultados, total: encontrados.length }
}

function App() {
  const [busqueda, setBusqueda] = useState('air')
  const [cantidad, setCantidad] = useState(2)

  const { resultados, total } = buscarTopK(busqueda, cantidad)

  return (
    <main className="contenedor">
      <header className="encabezado">
        <p className="materia">Estructuras de Datos II / Reto 12</p>
        <h1>Buscador de productos</h1>
        <p>
          Busca productos por el inicio de su nombre y consulta
          cuáles son los más populares.
        </p>
      </header>

      <section className="buscador">
        <div className="campo">
          <label htmlFor="busqueda">Nombre del producto</label>
          <input
            id="busqueda"
            type="search"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Ejemplo: air"
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Mostrar</label>
          <select
            id="cantidad"
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))}
          >
            <option value={1}>Top 1</option>
            <option value={2}>Top 2</option>
            <option value={3}>Top 3</option>
            <option value={4}>Top 4</option>
          </select>
        </div>
      </section>

      <section className="seccion-resultados">
        <div className="titulo-resultados">
          <h2>Resultados</h2>
          <span>{total} coincidencia{total !== 1 ? 's' : ''}</span>
        </div>

        {resultados.length > 0 ? (
          <ol className="lista-productos">
            {resultados.map((producto, index) => (
              <li key={producto.name} className="producto">
                <span className="numero">{index + 1}.</span>

                <span className="nombre">
                  {producto.name}
                </span>

                <span className="popularidad">
                  {producto.popularity}
                  <small> puntos</small>
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="sin-resultados">
            No hay productos que coincidan con esa búsqueda.
          </p>
        )}
      </section>

      <footer className="pie">
        <p>Trie: búsqueda por prefijo</p>
        <p>Max-Heap: selección de los productos más populares</p>
      </footer>
    </main>
  )
}

export default App
