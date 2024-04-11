import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
	plugins: [vue(), eslintPlugin()],
	resolve: {
		alias: {
			'@': path.resolve('./src'), // 设置 `@` 指向 `src` 目录
		},
	},
	server: {
		port: 1209,
		open: true,
	},
})
