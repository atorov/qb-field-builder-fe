import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    preview: {
        port: 8080,
    },
    server: {
        open: true,
        port: 8081,
    },
});
