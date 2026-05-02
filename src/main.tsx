
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  
  // Initialize mock backend for standalone mode
  import "./mockBackend";

  createRoot(document.getElementById("root")!).render(<App />);
  