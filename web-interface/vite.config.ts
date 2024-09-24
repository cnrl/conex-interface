import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */

export default ({ mode }) => {
  return defineConfig({
    define: {
      // For excalidraw application
      'process.env.IS_PREACT': JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    plugins: [react()],
    server: { port: 3030, open: true },
  });
};
