import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ exclude: ["./src/main.tsx", "./src/App.tsx"] }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "ReactAIChatView",
      formats: ["es", "umd"],
      fileName: (format) => `react-ai-chat-view.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
