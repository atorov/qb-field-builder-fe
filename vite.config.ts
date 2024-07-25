/// <reference types="vitest" />

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
    test: {
        environment: "happy-dom",
        globals: true,
        outputFile: {
            html: "./vitest-reports/html/index.html",
            json: "./vitest-reports/json/report.json",
        },
        reporters: ["default", "html", "json"],
        setupFiles: ["./__test__/setup.ts"],
    },
});
