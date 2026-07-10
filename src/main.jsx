import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <ThemeProvider>

      <App />

      <Toaster
        richColors
        position="top-right"
      />

    </ThemeProvider>

  </React.StrictMode>
);