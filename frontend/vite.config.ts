import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), "../"), "GOOGLE");

  return {
    base: "/",
    plugins: [react()],
    preview: {
      port: 80,
      strictPort: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env.GOOGLE_API_KEY": JSON.stringify(env.GOOGLE_API_KEY),
    },
  };
});
