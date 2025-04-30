# React + Vite

## 项目介绍
本项目是一个遵循 MVC 架构的 React 应用，使用 Vite 作为构建工具。前端采用组件化开发，包含动态发布组件、商品卡片组件等；后端接口附带 Swagger 文档，数据库生成 ER 图和数据模型；移动端代码包含 iOS/Android 原生适配。

## 功能模块
1. **前端组件化**：实现动态发布组件、商品卡片组件等。
2. **后端接口**：提供完整的 API 接口，并附带 Swagger 文档。
3. **数据库**：生成 ER 图和数据模型，确保数据结构清晰。
4. **移动端适配**：包含 iOS/Android 原生适配，如状态栏颜色调整。

## 架构说明
### MVC 架构
- **模型（Model）**：负责处理数据逻辑和业务规则。
- **视图（View）**：负责展示数据，采用组件化开发。
- **控制器（Controller）**：负责协调模型和视图之间的交互。

### 技术栈
- **前端**：React，结合 MUI 组件库实现美观的 UI。
- **后端**：Node.js/Express，提供 RESTful API。
- **数据库**：使用 SQL 数据库存储结构化数据。

此模板提供了一个最小化的设置，用于在 Vite 中运行 React，并支持热模块替换 (HMR) 和一些 ESLint 规则。

目前，有两个官方插件可供使用：

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) 使用 [Babel](https://babeljs.io/) 实现快速刷新
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) 使用 [SWC](https://swc.rs/) 实现快速刷新

## 扩展 ESLint 配置

如果您正在开发生产应用程序，我们建议使用启用了类型感知 lint 规则的 TypeScript。查看 [TS 模板](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) 以了解如何在项目中集成 TypeScript 和 [`typescript-eslint`](https://typescript-eslint.io)。
