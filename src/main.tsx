import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import drone_holder from "./handlers/drone_holder";
import "./index.css";

new drone_holder();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);