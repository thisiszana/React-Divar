import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { paths } from "./src/Constants/paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: {
      ...paths.reduce((acc, curr) => ({
        ...acc,
        [curr]: `/${curr === "src" ? curr : "src/" + curr}`,
      })),
    },
  },
});
