import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/updated_velora_residences/",
  plugins: [react()],
  build: {
    target: "es2020",
    outDir: "dist",
    sourcemap: false,
  },
});
