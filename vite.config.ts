import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [{ src: 'public/manifest.json', dest: 'dist' }],
    }),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        options: resolve(__dirname, 'options.html'),
        'yt-content': resolve(__dirname, 'src/content/yt-content.js'),
      },
      output: {
        entryFileNames: `[name].js`,
        // chunkFileNames: `assets/[name].js`,
        // assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
