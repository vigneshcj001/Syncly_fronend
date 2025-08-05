import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <App />
    </Provider>
  </React.StrictMode>
);
