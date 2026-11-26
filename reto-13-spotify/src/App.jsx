
import { useMemo, useState } from "react";
import Trie from "./structures/Trie";
import MaxHeap from "./structures/MaxHeap";
import Graph from "./structures/Graph";
import { canciones, relaciones } from "./data/canciones";
import "./App.css";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [cancionSeleccionada, setCancionSeleccionada] = useState(1);

  const estructuras = useMemo(() => {
    const trie = new Trie();
    const heap = new MaxHeap();
    const graph = new Graph();

    canciones.forEach((cancion) => {
      trie.insert(cancion.titulo);
      heap.insert({
        ...cancion,
        plays: cancion.reproducciones
      });
      graph.addVertex(cancion.id);
    });

    relaciones.forEach(([origen, destino]) => {
      graph.addEdge(origen, destino);
    });

    return { trie, heap, graph };
  }, []);

  const sugerencias = busqueda.trim()
    ? estructuras.trie
        .autocomplete(busqueda)
        .map((titulo) =>
          canciones.find((cancion) => cancion.titulo === titulo)
        )
        .filter(Boolean)
    : [];

  const coincidenciaExacta = busqueda.trim()
    ? estructuras.trie.search(busqueda)
    : false;

  const ranking = estructuras.heap.getTopK(5);

  const cancionActual =
    canciones.find((cancion) => cancion.id === cancionSeleccionada) ||
    canciones[0];

  const conexiones = estructuras.graph.getNeighbors(cancionSeleccionada);

  const recomendaciones = estructuras.graph
    .bfs(cancionSeleccionada)
    .filter((id) => id !== cancionSeleccionada)
    .slice(0, 4)
    .map((id) => canciones.find((cancion) => cancion.id === id))
    .filter(Boolean);

  const conexionesGrafo = estructuras.graph.getEdges();

  const totalReproducciones = canciones.reduce(
    (total, cancion) => total + cancion.reproducciones,
    0
  );

  const nodos = canciones.map((cancion, index) => {
    const angulo =
      (2 * Math.PI * index) / canciones.length - Math.PI / 2;

    return {
      ...cancion,
      x: 320 + 230 * Math.cos(angulo),
      y: 180 + 130 * Math.sin(angulo)
    };
  });

  const seleccionarCancion = (cancion) => {
    setCancionSeleccionada(cancion.id);
    setBusqueda("");
  };

  const formatearNumero = (numero) =>
    new Intl.NumberFormat("es-CO").format(numero);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">♫</div>
          <div>
            <h2>SoundLab</h2>
            <span>MUSIC PLATFORM</span>
          </div>
        </div>

        <div className="menu-title">MENÚ PRINCIPAL</div>

        <nav className="menu">
          <a href="#inicio" className="menu-item active">
            <span>⌂</span> Inicio
          </a>
          <a href="#buscador" className="menu-item">
            <span>⌕</span> Buscador musical
          </a>
          <a href="#ranking" className="menu-item">
            <span>↗</span> Más escuchadas
          </a>
          <a href="#grafo" className="menu-item">
            <span>◎</span> Red musical
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-avatar">SL</div>
          <div>
            <strong>SoundLab</strong>
            <span>Exploración musical</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            Plataforma <span>/</span> Inicio
          </div>
          <div className="topbar-right">
            <span className="online-status">
              <i></i> Sistema activo
            </span>
            <div className="user-avatar">SL</div>
          </div>
        </header>

        <div className="content" id="inicio">
          <section className="welcome">
            <div>
              <span className="subtitle">PANEL DE EXPLORACIÓN MUSICAL</span>
              <h1>Descubre tu música.</h1>
              <p>
                Explora canciones, encuentra conexiones y descubre
                cuáles son las más escuchadas.
              </p>
            </div>
            <div className="welcome-icon">♫</div>
          </section>

          <section className="statistics">
            <div className="stat-card">
              <div className="stat-icon purple">♫</div>
              <span>Canciones registradas</span>
              <strong>{canciones.length}</strong>
              <small>Índice de búsqueda Trie</small>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">◷</div>
              <span>Reproducciones totales</span>
              <strong>
                {(totalReproducciones / 1000000).toFixed(2)} M
              </strong>
              <small>Actividad musical</small>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">◎</div>
              <span>Relaciones musicales</span>
              <strong>{conexionesGrafo.length}</strong>
              <small>Conexiones del grafo</small>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">★</div>
              <span>Canción más escuchada</span>
              <strong className="stat-song">
                {ranking[0]?.titulo}
              </strong>
              <small>
                {formatearNumero(ranking[0]?.reproducciones || 0)} plays
              </small>
            </div>
          </section>

          <section className="main-grid">
            <article className="card search-card" id="buscador">
              <div className="card-heading">
                <div>
                  <span className="subtitle">BÚSQUEDA PREDICTIVA</span>
                  <h2>Encuentra una canción</h2>
                  <p>Escribe el inicio del título para ver sugerencias.</p>
                </div>
                <span className="tag trie-tag">TRIE</span>
              </div>

              <div className="search-input">
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="Buscar canción... Ej: des, bli, lev"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                {busqueda && (
                  <button onClick={() => setBusqueda("")}>×</button>
                )}
              </div>

              {!busqueda.trim() ? (
                <div className="search-message">
                  <span>✦</span>
                  <div>
                    <strong>Buscador inteligente</strong>
                    <p>
                      Prueba con prefijos como "des", "bli" o "sha".
                    </p>
                  </div>
                </div>
              ) : sugerencias.length > 0 ? (
                <div className="suggestions">
                  <div className="suggestion-title">
                    {sugerencias.length} resultados encontrados
                    {coincidenciaExacta && (
                      <span>Coincidencia exacta</span>
                    )}
                  </div>

                  {sugerencias.map((cancion) => (
                    <button
                      className="suggestion"
                      key={cancion.id}
                      onClick={() => seleccionarCancion(cancion)}
                    >
                      <div
                        className="song-cover mini-cover"
                        style={{ "--cover": cancion.color }}
                      >
                        ♫
                      </div>
                      <div className="song-info">
                        <strong>{cancion.titulo}</strong>
                        <span>{cancion.artista}</span>
                      </div>
                      <span className="arrow">↗</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  No se encontraron canciones con ese prefijo.
                </div>
              )}

              <div className="card-note">
                Búsqueda por prefijo mediante un árbol Trie.
              </div>
            </article>

            <article className="card detail-card">
              <div className="card-heading">
                <div>
                  <span className="subtitle">REPRODUCCIÓN SELECCIONADA</span>
                  <h2>Detalle musical</h2>
                </div>
                <span className="tag active-tag">Disponible</span>
              </div>

              <div className="song-detail">
                <div
                  className="song-cover large-cover"
                  style={{ "--cover": cancionActual.color }}
                >
                  <span>♫</span>
                  <small>SOUNDLAB</small>
                </div>

                <div className="detail-info">
                  <span className="genre">{cancionActual.genero}</span>
                  <h3>{cancionActual.titulo}</h3>
                  <p>{cancionActual.artista}</p>
                  <div className="song-metadata">
                    <span>◷ {cancionActual.duracion}</span>
                    <span>
                      ♫ {formatearNumero(cancionActual.reproducciones)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-footer">
                <span>Conexiones directas</span>
                <strong>{conexiones.length} canciones</strong>
              </div>
            </article>
          </section>

          <section className="lower-grid">
            <article className="card ranking-card" id="ranking">
              <div className="card-heading">
                <div>
                  <span className="subtitle">POPULARIDAD MUSICAL</span>
                  <h2>Top 5 canciones</h2>
                  <p>Las canciones con más reproducciones.</p>
                </div>
                <span className="tag heap-tag">MAX HEAP</span>
              </div>

              <div className="ranking-list">
                {ranking.map((cancion, index) => (
                  <button
                    className="ranking-item"
                    key={cancion.id}
                    onClick={() => seleccionarCancion(cancion)}
                  >
                    <span className="position">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="song-cover ranking-cover"
                      style={{ "--cover": cancion.color }}
                    >
                      ♫
                    </div>

                    <div className="song-info">
                      <strong>{cancion.titulo}</strong>
                      <span>{cancion.artista}</span>
                    </div>

                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          width: `${
                            (cancion.reproducciones /
                              ranking[0].reproducciones) *
                            100
                          }%`
                        }}
                      ></div>
                    </div>

                    <span className="play-count">
                      {formatearNumero(cancion.reproducciones)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="card-note">
                Ranking calculado mediante un MaxHeap.
              </div>
            </article>

            <article className="card recommendations-card">
              <div className="card-heading">
                <div>
                  <span className="subtitle">DESCUBRIMIENTO</span>
                  <h2>Quizás te guste</h2>
                  <p>Canciones relacionadas con tu selección.</p>
                </div>
                <span className="tag graph-tag">GRAFO</span>
              </div>

              <div className="recommendation-origin">
                Basado en <strong>{cancionActual.titulo}</strong>
              </div>

              <div className="recommendation-list">
                {recomendaciones.map((cancion, index) => (
                  <button
                    className="recommendation-item"
                    key={cancion.id}
                    onClick={() => seleccionarCancion(cancion)}
                  >
                    <span className="recommendation-number">
                      0{index + 1}
                    </span>

                    <div
                      className="song-cover recommendation-cover"
                      style={{ "--cover": cancion.color }}
                    >
                      ♫
                    </div>

                    <div className="song-info">
                      <strong>{cancion.titulo}</strong>
                      <span>{cancion.artista}</span>
                    </div>

                    <span className="arrow">↗</span>
                  </button>
                ))}

                {recomendaciones.length === 0 && (
                  <p className="no-results">
                    No hay canciones relacionadas.
                  </p>
                )}
              </div>
            </article>
          </section>

          <section className="card graph-card" id="grafo">
            <div className="card-heading">
              <div>
                <span className="subtitle">RELACIONES MUSICALES</span>
                <h2>Conexiones entre canciones</h2>
                <p>
                  Selecciona una canción para explorar sus relaciones
                  dentro del grafo.
                </p>
              </div>
              <span className="tag graph-tag">GRAFO NO DIRIGIDO</span>
            </div>

            <div className="graph-container">
              <svg viewBox="0 0 640 360">
                {conexionesGrafo.map(([origen, destino]) => {
                  const nodoA = nodos.find(
                    (nodo) => nodo.id === origen
                  );
                  const nodoB = nodos.find(
                    (nodo) => nodo.id === destino
                  );

                  if (!nodoA || !nodoB) return null;

                  const resaltada =
                    origen === cancionSeleccionada ||
                    destino === cancionSeleccionada;

                  return (
                    <line
                      key={`${origen}-${destino}`}
                      x1={nodoA.x}
                      y1={nodoA.y}
                      x2={nodoB.x}
                      y2={nodoB.y}
                      className={
                        resaltada ? "graph-line highlighted" : "graph-line"
                      }
                    />
                  );
                })}

                {nodos.map((nodo) => {
                  const seleccionado =
                    nodo.id === cancionSeleccionada;
                  const relacionado = conexiones.includes(nodo.id);

                  return (
                    <g
                      key={nodo.id}
                      onClick={() => seleccionarCancion(nodo)}
                      className="graph-node"
                    >
                      <circle
                        cx={nodo.x}
                        cy={nodo.y}
                        r={seleccionado ? 17 : 12}
                        className={
                          seleccionado
                            ? "node-selected"
                            : relacionado
                              ? "node-related"
                              : "node-normal"
                        }
                      />
                      <text
                        x={nodo.x}
                        y={nodo.y + 29}
                        textAnchor="middle"
                      >
                        {nodo.titulo.length > 12
                          ? `${nodo.titulo.slice(0, 11)}...`
                          : nodo.titulo}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="graph-footer">
              <div className="graph-legend">
                <span><i className="legend-selected"></i> Seleccionada</span>
                <span><i className="legend-related"></i> Conexión directa</span>
                <span><i className="legend-line"></i> Relación musical</span>
              </div>

              <div className="graph-summary">
                <strong>{canciones.length} nodos</strong>
                <span>{conexionesGrafo.length} conexiones</span>
                <span>Recorrido BFS</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
