import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { viteMockServe } from 'vite-plugin-mock'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  console.log(env)
  return {
    plugins: [
      vue(),
      eslintPlugin(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', '@vueuse/core'],
        eslintrc: {
          enabled: false, // 是否自动生成 eslint 规则，建议生成之后设置 false
          filepath: './.eslintrc-auto-import.json', // 指定自动导入函数 eslint 规则的文件
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({}),
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, 'typings', 'auto-imports.d.ts'), // 指定自动导入函数TS类型声明文件路径
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'], // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          }),
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ['src/components', 'src/**/components'],
        dts: path.resolve(pathSrc, 'typings', 'components.d.ts'), // 指定自动导入组件TS类型声明文件路径
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
      viteMockServe({
        mockPath: 'src/mock',
        enable: true,
        watchFiles: true,
      }),
    ],
    base: './', // 设置打包路径
    resolve: {
      alias: {
        '@': pathSrc, // 设置 `@` 指向 `src` 目录
      },
    },
    server: {
      port: 1209,
      host: '0.0.0.0',
      open: true,
      // proxy: {
      //   [env.VITE_APP_BASE_API]: {
      //     // 代理地址
      //     target: 'http://0.0.0.0:1209',
      //     changeOrigin: true,
      //     ws: true,
      //     rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
      //   },
      // },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    },
  }
})
