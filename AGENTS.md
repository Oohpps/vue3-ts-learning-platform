# Repository Guidelines

## 项目结构与模块组织
这是一个基于 Vite 的 Vue 3 + TypeScript 学习项目。业务代码位于 `src/`：`main.ts` 负责入口挂载，`App.vue` 是当前主页面，`composables/` 放可复用逻辑，如 `useLocalStorage.ts`，`data/` 存放课程内容，`types/` 定义共享类型，`assets/` 管理导入的图片资源。`public/` 用于直接静态托管的文件，`docs/` 存放学习计划等说明文档，`dist/` 是构建产物，不要手动修改。

## 构建、测试与开发命令
- `npm install`：安装依赖。
- `npm run dev`：启动本地开发服务器。
- `npm run build`：先执行 `vue-tsc -b` 做类型检查，再输出生产构建到 `dist/`。
- `npm run preview`：本地预览生产构建结果。

## 编码风格与命名约定
遵循现有源码风格：使用 TypeScript、单引号、不写分号。Vue 模板统一使用 2 空格缩进，脚本区写法保持与相邻文件一致。组件文件使用 PascalCase 命名；组合式函数使用 `use` 前缀加 camelCase，例如 `useLocalStorage`；共享类型文件使用语义清晰的单数命名，例如 `course.ts`。新增逻辑优先拆分到 `src/` 下的小模块中，避免继续堆积到大型模板里。

## 测试指南
当前仓库尚未配置自动化测试框架，因此 `npm run build` 是提交前的最低验证要求，可用于发现类型和打包错误。涉及界面修改时，还应运行 `npm run dev` 或 `npm run preview`，手动检查章节切换、本地存储持久化以及静态资源加载是否正常。

## 提交与合并请求规范
当前工作区不是 Git 仓库，无法从本地历史中确认既有提交规范。建议使用简短、祈使句式的提交信息，例如 `add chapter progress reset`、`extract local storage composable`。提交 PR 时应包含变更摘要、影响范围、手动验证步骤；如果改动了界面，请附上截图。

## 配置与安全说明
不要将密钥、令牌或其他敏感信息提交到仓库。如果后续引入环境变量，请使用 Vite 的 `.env` 文件管理，并在 `README.md` 中补充必需变量说明。
