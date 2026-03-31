# Vue 3 + TypeScript 学习项目

这是一个面向 Python 后端开发者的 Vue 3 + TypeScript 入门项目。

现在它已经不是静态介绍页，而是一个可以直接操作的章节学习台：

- 可在网页上切换章节、查看学习目标、阅读正文讲解。
- 每章都带“基于当前项目的代码练习”，并能在网页里勾选完成状态。
- 章节笔记和练习进度会保存在浏览器本地存储中。
- 项目本身也刻意保留了 `types`、`data`、`composables` 等结构，方便你边学边改。

## 启动方式

```bash
npm install
npm run dev
```

构建检查：

```bash
npm run build
```

## 项目结构

```text
src/
  App.vue                 章节学习台首页
  data/courseContent.ts   章节内容、练习和资料数据
  types/course.ts         课程数据类型
  composables/useLocalStorage.ts  本地持久化示例
  main.ts                 入口文件
  style.css               页面样式
docs/
  LEARNING_PLAN.md        详细学习路线与日程计划
```

## 建议你怎么用这个项目

1. 先在网页里选一个章节，完整读完“学习目标”和“学习内容文档”。
2. 切到“项目练习”，按提示修改对应文件。
3. 每做完一个练习就在网页里勾选，并写下本章笔记。
4. 第四章开始主动拆组件，第五章开始接 `Vue Router`、`Pinia` 和请求层。

## 学习重点

- 先补 JavaScript/TypeScript，不要直接跳进复杂 Vue 项目。
- 用你熟悉的后端业务场景练前端，比做“随机教程 demo”效率更高。
- 每学一个概念，必须落一个最小可运行例子。

详细计划见 [docs/LEARNING_PLAN.md](./docs/LEARNING_PLAN.md)。
