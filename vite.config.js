import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: set base to '/<repo-name>/' when deploying
  // e.g., base: '/portfolio/' if your repo is username.github.io/portfolio
  // For custom domain or username.github.io root, use '/'
  base: '/',
})
