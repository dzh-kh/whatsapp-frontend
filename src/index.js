import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/Routes";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import ErrorBoundary from "./components/chatBox/errorBoundary/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appStore = setupStore();
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <ErrorBoundary>
        {" "}
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
