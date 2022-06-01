import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StoreCtxProvider } from "./store/store-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreCtxProvider>
      <App />
    </StoreCtxProvider>
  </React.StrictMode>
);
