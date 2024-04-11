import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src') // 设置 `@` 指向 `src` 目录
    }
  },
  server: {
    port: 1209,
    open: true,
  }
})
