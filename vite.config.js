import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Aumentar el límite a 1000KB
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar Three.js y sus dependencias en chunks separados
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'gsap-vendor': ['gsap', '@gsap/react'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Suprimir advertencias de eval (viene de three-stdlib/libs/lottie.js)
    onwarn(warning, warn) {
      // Ignorar advertencias de eval de lottie.js
      if (warning.code === 'EVAL' && warning.id?.includes('lottie.js')) {
        return;
      }
      warn(warning);
    },
  },
})
