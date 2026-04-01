# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目简介

Vue 3 + TypeScript 交互式学习平台。提供 17 个章节的完整学习路线，支持章节切换、代码练习、测验系统、笔记记录和本地持久化。

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器（Vite）
npm run build      # 类型检查（vue-tsc -b）+ 生产构建
npm run preview    # 本地预览生产构建
```

当前无自动化测试框架，`npm run build` 是提交前的最低验证门槛。

## 架构概览

**技术栈**：Vue 3（Composition API + `<script setup>`）+ TypeScript + Vite 8

**路由方案**：未使用 Vue Router。通过 `AppView` 联合类型（`'overview' | 'chapter' | 'roadmap' | 'resources'`）和 `v-if` 切换视图。

**状态管理**：未使用 Pinia。所有状态集中在 `App.vue` 中通过 `useLocalStorage` composable 管理，通过 props/events 与子组件通信。

**数据流**：
- `src/types/course.ts` — 所有共享类型定义（`CourseChapter`、`AppView`、`LearningPhase` 等）
- `src/data/courseContent.ts` — 章节内容、学习阶段、学习资源的静态数据（数据驱动渲染）
- `src/composables/useLocalStorage.ts` — 泛型本地持久化 hook，基于 `ref` + `watch` + `localStorage`

**组件层次**：
```
App.vue（状态中心 + 视图调度）
├── components/AppHeader.vue      — 顶部导航 + 进度统计
├── components/ChapterSidebar.vue — 左侧章节列表
├── components/ExerciseCard.vue   — 单个练习卡片（勾选 + 步骤 + 验证）
├── views/OverviewView.vue        — 学习总览页
├── views/ChapterView.vue         — 章节详情页（目标 / 文档 / 练习三标签切换）
├── views/RoadmapView.vue         — 学习路线页
└── views/ResourcesView.vue       — 学习资料页
```

**TypeScript 配置**：严格模式开启（`strict: true`），启用了 `noUnusedLocals`、`noUnusedParameters`、`erasableSyntaxOnly` 等额外检查。

## 编码风格

- 单引号、不写分号
- Vue 模板 2 空格缩进
- 组件文件 PascalCase，composable 用 `use` 前缀 + camelCase
- 代码注释和输出文本使用中文
