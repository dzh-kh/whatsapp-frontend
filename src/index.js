import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/Routes";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { setupStore } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appStore = setupStore();
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
