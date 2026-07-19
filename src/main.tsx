import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="shopwave-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
