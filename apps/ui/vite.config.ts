import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import VitePrettier from 'vite-plugin-prettier';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    VitePrettier(),
    tsconfigPaths(),
  ],
});
