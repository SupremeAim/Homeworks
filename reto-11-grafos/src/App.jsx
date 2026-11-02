
import { useEffect, useMemo, useRef, useState } from 'react'
import { Graph as D3Graph } from 'react-d3-graph'
import Graph from './structures/Graph'
import './App.css'

const grafo = new Graph()

const cali = grafo.addCity('Cali')
const bogota = grafo.addCity('Bogotá')
const popayan = grafo.addCity('Popayán')

const juan = grafo.addPerson('Juan Jose', 21, cali.id)
const samuel = grafo.addPerson('Samuel Cortez', 20, cali.id)
const sebastian = grafo.addPerson('Sebastian Rojas', 23, bogota.id)
const sofia = grafo.addPerson('Sofia Collazos', 19, popayan.id)

grafo.addFriendship(juan.id, samuel.id)
grafo.addFriendship(samuel.id, sebastian.id)
grafo.addFriendship(sebastian.id, sofia.id)

const ciudades = grafo.nodes.filter(n => n.type === 'city')

function App() {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(cali.id)
  const [ancho, setAncho] = useState(0)
  const contenedor = useRef(null)

  useEffect(() => {
    const elemento = contenedor.current
    if (!elemento) return

    const observador = new ResizeObserver(([entrada]) => {
      setAncho(Math.round(entrada.contentRect.width))
    })

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  const columnas = ancho >= 450 ? 3 : ancho >= 300 ? 2 : 1
  const paso = 230
  const alto = Math.ceil(ciudades.length / columnas) * paso + 40

  const datos = useMemo(() => {
    const resultado = grafo.toD3Data()

    ciudades.forEach((ciudad, i) => {
      const fila = Math.floor(i / columnas)
      const columna = i % columnas
      const cantidad = Math.min(
        columnas,
        ciudades.length - fila * columnas
      )

      const centro = ancho * (columna + 0.5) / cantidad
      const y = fila * paso + 70

      const nodoCiudad = resultado.nodes.find(n => n.id === ciudad.id)

      nodoCiudad.x = centro
      nodoCiudad.y = y
      nodoCiudad.color = '#ffb36b'
      nodoCiudad.symbolType = 'square'

      const habitantes = resultado.nodes.filter(n => n.cityId === ciudad.id)
      const espacio = Math.min(100, ancho / cantidad * 0.5)

      habitantes.forEach((persona, indice) => {
        persona.x = centro + (indice - (habitantes.length - 1) / 2) * espacio
        persona.y = y + 120
        persona.color = '#65b7ff'
        persona.symbolType = 'circle'
      })
    })

    return resultado
  }, [ancho, columnas])

  const config = useMemo(() => ({
    width: ancho,
    height: alto,
    directed: false,
    staticGraphWithDragAndDrop: true,
    nodeHighlightBehavior: true,
    node: {
      size: 420,
      labelProperty: 'name',
      labelPosition: 'bottom',
      fontSize: ancho < 500 ? 11 : 12,
      fontColor: '#e9eef8',
      highlightStrokeColor: '#ffffff'
    },
    link: {
      color: '#8091ac',
      strokeWidth: 2,
      highlightColor: '#ffffff'
    }
  }), [ancho, alto])

  const ciudad = grafo.searchNode(ciudadSeleccionada)
  const habitantes = grafo.getPeopleByCity(ciudadSeleccionada)

  return (
    <main>
      <header className="cabecera">
        <span className="etiqueta">EDA2 / CHALLENGE 11</span>
        <h1>Grafo de amigos y ciudades</h1>
        <p>Visualización de personas, ciudades y relaciones de amistad.</p>
      </header>

      <section className="panel">
        <div className="panel-titulo">
          <h2>Mapa de relaciones</h2>
          <span>{grafo.nodes.length} nodos · {datos.links.length} conexiones</span>
        </div>

        <div className="grafico" ref={contenedor}>
          {ancho > 0 && (
            <D3Graph
              key={`${columnas}-${ancho}`}
              id="grafo-amigos"
              data={datos}
              config={config}
            />
          )}
        </div>

        <div className="leyenda">
          <span><i className="cuadrado" /> Ciudad</span>
          <span><i className="circulo" /> Persona</span>
          <span><i className="linea gris" /> Residencia</span>
          <span><i className="linea verde" /> Amistad</span>
        </div>

        <p className="nota">Puedes arrastrar los nodos para moverlos.</p>
      </section>

      <section className="panel">
        <h2>Consultar habitantes</h2>
        <p>Selecciona una ciudad para conocer las personas que viven allí.</p>

        <label htmlFor="ciudad">Ciudad</label>
        <select
          id="ciudad"
          value={ciudadSeleccionada}
          onChange={e => setCiudadSeleccionada(e.target.value)}
        >
          {ciudades.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="resultado">
          <h3>Habitantes de {ciudad.name}</h3>
          <span>{habitantes.length} personas</span>
        </div>

        <div className="habitantes">
          {habitantes.map(persona => (
            <div className="habitante" key={persona.id}>
              <span className="avatar">
                {persona.name.charAt(0)}
              </span>

              <div>
                <strong>{persona.name}</strong>
                <p>{persona.age} años</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
