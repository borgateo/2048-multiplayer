import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./app/index.tsx";
import theme from "./app/styles/theme.ts";
import ResetStyles from "./app/styles/reset.ts";

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ResetStyles />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
