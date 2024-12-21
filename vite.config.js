import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Adds React support
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Enables Tailwind CSS
        autoprefixer(), // Adds vendor prefixes for better browser support
      ],
    },
  },
});
