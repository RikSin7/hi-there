import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { AuthProvider } from "@/features/auth";
import { Toaster } from "react-hot-toast";

// Note: PersistGate temporarily removed - will be added once redux-persist installs
// To enable: npm install redux-persist

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  </Provider>
);
