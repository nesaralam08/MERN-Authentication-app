import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/auth':"https://mern-authentication-app-git-main-nesaralam08s-projects.vercel.app",
      "/products":"https://mern-authentication-app-git-main-nesaralam08s-projects.vercel.app"
    }
  }
})
