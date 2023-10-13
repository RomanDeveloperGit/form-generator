import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import sassDts from 'vite-plugin-sass-dts';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), sassDts()],
  css: {
    modules: {
      generateScopedName: '[folder]__[local]__[hash:base64:5]',
      localsConvention: 'camelCaseOnly',
    },
  },
});
