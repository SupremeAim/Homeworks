import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SongPlayerPage from "./pages/SongPlayerPage";
import BrowserHistoryPage from "./pages/BrowserHistoryPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* Barra de navegacion superior */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Linked List (Musica)</Link>
        <Link to="/browser-history" className="nav-link">Doubly Linked List (Navegador)</Link>
      </nav>

      {/* Rutas de las paginas */}
      <Routes>
        <Route path="/" element={<SongPlayerPage />} />
        <Route path="/browser-history" element={<BrowserHistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;