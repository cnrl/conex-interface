import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/** @type {import('vite').UserConfig} */

export default ({ mode }) => {
  return defineConfig({
    define: {
      // For excalidraw application
      'process.env.IS_PREACT': JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    plugins: [react(), tsconfigPaths()],
    server: { port: 3030, open: true },
  });
};
