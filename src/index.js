import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Sidebar from "./components/sidebar/Sidebar";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>
);
