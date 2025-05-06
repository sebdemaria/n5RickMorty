import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        target: "esnext",
        minify: false,
        cssCodeSplit: false
    },
    plugins: [
        react(),
        federation({
            name: "charactersRick",
            filename: "remoteEntry.js",
            exposes: {
                "./CharactersList": "./src/App.tsx"
            },
            shared: {
                react: {
                    import: true,
                    version: "^18.2.0",
                    shareScope: "default"
                },
                "react-dom": {
                    import: true,
                    version: "^18.2.0",
                    shareScope: "default"
                },
                "styled-components": {
                    import: true,
                    requiredVersion: "6.1.17",
                    shareScope: "default"
                }
            }
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    server: {
        port: 3001
    },
    preview: {
        port: 3001,
        strictPort: true,
        cors: true
    }
});
