import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TareasProvider } from "./context/TareasContext.jsx";
import { QueueProvider } from "./context/QueueContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TareasProvider>
          <QueueProvider>
            <App />
          </QueueProvider>
        </TareasProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);