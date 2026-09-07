import { useState, useEffect} from "react";
import DoublyLinkedList from "../data-structures/DoublyLinkedList";

const PAGES = [
{ url: "google.com", title: "Google - Buscador", time: "10:00 AM" },
  { url: "github.com", title: "GitHub - Repositorios", time: "10:05 AM" },
  { url: "stackoverflow.com", title: "Stack Overflow - Preguntas", time: "10:15 AM" },
  { url: "youtube.com", title: "YouTube - Videos", time: "10:30 AM" },
  { url: "reddit.com", title: "Reddit - Foros", time: "10:45 AM" },
  { url: "developer.mozilla.org", title: "MDN Web Docs", time: "11:00 AM" },
  { url: "netflix.com", title: "Netflix - Streaming", time: "11:20 AM" },
];

function BrowserHistoryPage(){
    const [history] = useState(() =>{
        const list = new DoublyLinkedList();
        PAGES.forEach((page) => list.append (page));
        return list;
    });
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(null);

useEffect(() => {
    const node = history.getAt(currentIndex);
    if (node) {
        setCurrentPage(node.data);
    }
}, [currentIndex, History]);
const handleBack = () => {
    if (currentIndex >0) {
        setCurrentIndex(currentIndex -1);
    }
};

const handleForward = () => {
    if (currentIndex < history.size - 1){
        setCurrentIndex (currentIndex + 1);
    }
};

const allPages = history.toArray();

 return (
    <div className="page-container">
      <h1>Historial del Navegador</h1>
      <p className="subtitle">Implementación con Doubly Linked List</p>


      {currentPage && (
        <div className="now-playing">
          <h2>Pagina Actual</h2>
          <div className="browser-card current">
            <span className="page-title">{currentPage.title}</span>
            <span className="page-url">{currentPage.url}</span>
            <span className="page-time">Visitada: {currentPage.time}</span>
          </div>
        </div>
      )}
      

      <div className="controls">
        <button onClick={handleBack} disabled={currentIndex === 0}>
          Anterior
        </button>
        <span className="track-info">
          Pagina {currentIndex + 1} de {history.size}
        </span>
        <button onClick={handleForward} disabled={currentIndex === history.size - 1}>
          Siguiente
        </button>
      </div>
      
      
      <h3>Historial Completo</h3>
      <div className="list-container">
        {allPages.map((page, index) => (
          <div
            key={index}
            className={`browser-card ${index === currentIndex ? "current" : ""}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="page-index">{index + 1}.</span>
            <span className="page-title">{page.title}</span>
            <span className="page-url">{page.url}</span>
            <span className="page-time">{page.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BrowserHistoryPage;
