import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettierRecommendedConfigs from 'eslint-plugin-prettier/recommended'
import parserVue from 'vue-eslint-parser'
import autoImport from './auto-import.cjs'

export default [
  // eslint 默认推荐规则
  pluginJs.configs.recommended,
  // ts 默认推荐规则
  ...tseslint.configs.recommended,
  // vue3 基础推荐规则
  ...pluginVue.configs['flat/recommended'],
  // prettier 默认推荐规则
  pluginPrettierRecommendedConfigs,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
        ...autoImport.globals, // 自动导入的变量
      },
      ecmaVersion: 2020,
      parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    // 可添加一些自定义规则
    rules: {
      'no-unused-vars': ['off', { caughtErrors: 'none' }], // 未使用变量
      '@typescript-eslint/no-unused-vars': ['off', { caughtErrors: 'none' }], // 未使用变量
      'vue/no-unused-vars': ['off', { caughtErrors: 'none' }], // 未使用变量
      'vue/v-on-event-hyphenation': 'off', // html元素上事件函数名使用短横线连接
      'vue/multi-word-component-names': ['off'], // 组件名应该多个词组成
      'vue/no-mutating-props': 'warn', // props 参数应该不能直接修改
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
  {
    ignores: ['dist/*'],
  },
]
