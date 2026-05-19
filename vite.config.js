import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const repoName =
    env.GITHUB_REPOSITORY?.split("/")[1] ||
    env.VITE_GITHUB_PAGES_REPO ||
    "Travel-Sync-Front";

  return {
    base: mode === "gh-pages" ? `/${repoName}/` : "/",
    plugins: [react()],
    server: {
      host: true,
      strictPort: true,
      port: 4173,
    },
  };
});
