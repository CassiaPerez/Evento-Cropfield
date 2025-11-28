import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" error
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Map GEMINI_API_KEY (or API_KEY) from environment variables to process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.API_KEY || process.env.API_KEY)
    }
  }
})