import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        outDir: 'public/dist',
        emptyOutDir: true,
    },
    server: {
        port: 5173,
        https: false,
        proxy: {
            '/api': 'http://localhost:8000',
        }
    }
});