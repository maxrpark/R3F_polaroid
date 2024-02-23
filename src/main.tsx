import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/main.css";
import { ThreeProvider } from "./context/threeContext.tsx";
import Providers from "./providers/Providers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <ThreeProvider>
        <App />
      </ThreeProvider>
    </Providers>
  </React.StrictMode>
);
