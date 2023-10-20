import path from 'path';

import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import sassDts from 'vite-plugin-sass-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    react(),
    sassDts(),
    sentryVitePlugin({
      org: 'test-y2j',
      project: 'javascript-react',
    }),
  ],

  css: {
    modules: {
      generateScopedName: '[folder]__[local]__[hash:base64:5]',
      localsConvention: 'camelCaseOnly',
    },
  },

  build: {
    sourcemap: true,
  },
});
