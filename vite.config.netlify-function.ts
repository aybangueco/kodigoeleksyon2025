import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/scripts/scrape-election-results.ts'),
            name: 'scrape-election-results', // Doesn't matter much for a function
            formats: ['cjs'],
            fileName: () => 'scrape-election-results.js',
        },
        rollupOptions: {
            external: ['playwright'], // Consider externalizing playwright
        },
        outDir: resolve(__dirname, 'netlify/functions/election-results'),
        emptyOutDir: false,
    },
    resolve: {
        alias: {
            // If your function imports modules from your main src directory,
            // you might need to adjust the alias here.
            // For example:
            // "@/": path.resolve(__dirname, "./src"),
        },
    },
    // Define a custom base if needed for the function build
    base: './',
});