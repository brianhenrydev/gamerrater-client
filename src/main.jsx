import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApplicationViews } from "./componets/ApplicationViews.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApplicationViews />
  </StrictMode>,
);
