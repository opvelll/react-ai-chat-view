import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ exclude: ["src/main.tsx", "src/App.tsx"] })],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ReactAIChatView",
      formats: ["es"],
      fileName: (format) => `react-ai-chat-view.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
