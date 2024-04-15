/// <reference types="vite/client" />

/**
 * 由于 vite-plugin-eslint 库有点落后，导致 vite 高版本不能正确的识别 cjs 模块
 * 所以这里手动定义
 */
declare module 'vite-plugin-eslint' {
  import { Plugin } from 'vite'
  import { ESLint } from 'eslint'

  /** Plugin options, extending from ESlint options */
  interface Options extends ESLint.Options {
    /** Path to ESLint instance that will be used for linting */
    eslintPath?: string
    /** Check all matching files on project startup */
    lintOnStart?: boolean
    /** A single file, or array of files, to include when linting */
    include?: string | string[]
    /** A single file, or array of files, to exclude when linting */
    exclude?: string | string[]
    /** Custom error formatter or the name of a built-in formatter */
    formatter?: string | ESLint.Formatter['format']
    /** The waring found will be printed */
    emitWarning?: boolean
    /** The errors found will be printed */
    emitError?: boolean
    /** Will cause the module build to fail if there are any warnings, based on emitWarning */
    failOnWarning?: boolean
    /** Will cause the module build to fail if there are any errors, based on emitError */
    failOnError?: boolean
  }

  const content: (rawOptions?: Options) => Plugin
  export default content
}
declare module '@eslint/js'
declare module 'eslint-plugin-vue'
