import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
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
            shared: ["react", "react-dom"]
        })
    ],
    server: {
        port: 3001
    },
    preview: {
        port: 3001,
        strictPort: true,
        cors: true
    }
});
