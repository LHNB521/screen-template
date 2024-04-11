# screen-template

可视化大屏模板：基于Vu3+typescript+Vite

## 项目目录


## 项目模板启动和打包
1. npm install
2. npm run dev
3. npm run build

## 代码规范
### ESLint + Prettier
```shell
pnpm i eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier -D
```

| 依赖| 版本 | 作用 |
| --- | --- | --- |
| @typescript-eslint/eslint-plugin| 7.6.0 | ESLint 插件，包含了各类定义好的检测 TypeScript 代码的规范 |
| @typescript-eslint/parser | 7.6.0 | ESLint 的解析器，用于解析 TypeScript，从而检查和规范 TypeScript 代码 |
| eslint | 9.0.0 | ESLint 核心库 |
| eslint-config-prettier | 9.1.0 | 关掉所有和 Prettier 冲突的 ESLint 的配置 |
| eslint-plugin-prettier | 5.1.3 | 	将 Prettier 的 rules 以插件的形式加入到 ESLint 里面 |
| eslint-plugin-vue | 9.24.1 | 为 Vue 使用 ESlint 的插件 |
| prettier | 3.2.5 | Prettier 核心库 |

ESLint 与 Prettier 通常是一起使用的，前者只负责检测修复语法规则，后者负责代码格式化。