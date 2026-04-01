# Vue 3 + TypeScript Learning Platform

一个交互式的 Vue 3 + TypeScript 学习平台，自带章节管理、代码练习、测验系统和学习进度追踪，边学边练，即开即用。

## Features

- **章节学习台** — 17 个章节覆盖从 JS 基础到 Vue 3 生产部署的完整路径
- **四阶段路线** — 基础入门 → 核心机制 → 应用架构 → 生产落地，循序渐进
- **代码练习** — 每章配有基于项目本身的动手练习，带步骤引导和验证清单
- **章节测验** — 单选、多选、判断、代码输出四种题型，即时反馈
- **进度追踪** — 练习完成状态、测验成绩、章节笔记自动保存到浏览器本地
- **学习资料** — 内置推荐资源列表，快速找到官方文档和优质教程
- **零依赖架构** — 不使用 Vue Router / Pinia / UI 框架，代码结构清晰，适合阅读和动手修改

## Quick Start

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查 + 生产构建
npm run build
```

启动后打开浏览器访问 `http://localhost:5173` 即可开始学习。

## Tech Stack

| 技术 | 说明 |
|---|---|
| Vue 3 | Composition API + `<script setup>` |
| TypeScript | 严格模式，完整类型定义 |
| Vite 8 | 开发服务器与构建工具 |

无额外 UI 框架或状态管理库依赖，项目结构本身就是学习素材。

## Project Structure

```text
src/
  App.vue                          状态中心 + 视图调度
  main.ts                          应用入口
  style.css                        全局样式
  types/
    course.ts                      所有共享类型定义
  data/
    courseContent.ts               章节内容、学习阶段、学习资源
    quizContent.ts                 章节测验题目数据
  composables/
    useLocalStorage.ts             泛型本地持久化 hook
  components/
    AppHeader.vue                  顶部导航 + 进度统计
    ChapterSidebar.vue             左侧章节列表
    ExerciseCard.vue               练习卡片（勾选 + 步骤 + 验证）
    QuizCard.vue                   单个测验题卡片
    QuizPanel.vue                  章节测验面板
  views/
    OverviewView.vue               学习总览页
    ChapterView.vue                章节详情页（目标 / 文档 / 练习 / 测验）
    ResourcesView.vue              学习资料页
docs/
  LEARNING_PLAN.md                 详细学习路线与日程计划
```

## How to Use

1. 打开网页，在总览页了解完整学习路线
2. 选择一个章节，依次阅读「学习目标」和「学习内容」
3. 切到「项目练习」，按提示在对应文件中动手修改代码
4. 完成后勾选练习、参加章节测验、记录学习笔记
5. 进度自动保存，随时可以继续

## Learning Path

| 阶段 | 章节 | 重点 |
|---|---|---|
| 基础入门 | Chapter 1-5 | 浏览器、JavaScript、CSS、TypeScript、Vue 响应式 |
| 核心机制 | Chapter 6-9 | 组件拆分、生命周期、逻辑复用、表单处理 |
| 应用架构 | Chapter 10-14 | 路由、状态管理、异步数据、类型体系 |
| 生产落地 | Chapter 15-17 | 样式工程、性能优化、测试与部署 |

详细计划见 [docs/LEARNING_PLAN.md](./docs/LEARNING_PLAN.md)。

## License

MIT

### 扫描二维码访问本项目
![Repository QR Code](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://github.com/Oohpps/vue3-ts-learning-platform.git&color=3178c6)