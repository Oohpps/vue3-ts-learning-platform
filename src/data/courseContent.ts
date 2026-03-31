import type { CourseChapter, LearningResource } from '../types/course'

export const courseChapters: CourseChapter[] = [
  {
    id: 'chapter-1',
    order: 1,
    title: '第一章：认识网页是怎么跑起来的',
    subtitle: '先看懂浏览器、HTML、CSS 和项目入口之间的关系',
    duration: '2-3 天',
    summary: '这一章先不追求会写 Vue 语法，而是建立对页面结构、入口文件和样式来源的基本认识。',
    goals: [
      '知道浏览器如何从 `index.html` 进入到 `src/main.ts` 和 `App.vue`',
      '能区分 HTML 结构、CSS 样式和 JavaScript 行为分别负责什么',
      '开始使用开发者工具查看元素、样式和网络请求',
    ],
    outcomes: [
      '能说清楚当前页面是从哪些文件渲染出来的',
      '能独立修改标题、段落和卡片样式并观察即时变化',
    ],
    starterSteps: [
      '先打开 `index.html`、`src/main.ts`、`src/App.vue`、`src/style.css` 四个文件各看一遍',
      '运行 `npm run dev` 后，边改文字边看浏览器变化',
      '打开开发者工具，定位一个标题和一个卡片，看看它们的样式来自哪里',
    ],
    docs: [
      {
        title: '先建立页面入口的整体地图',
        paragraphs: [
          '浏览器最先读取的是 `index.html`。这个文件负责提供挂载点，并加载入口脚本。',
          '`src/main.ts` 会创建 Vue 应用，再把 `App.vue` 挂到 `#app` 上，所以你看到的大部分页面内容都来自组件，而不是直接写在 `index.html` 里。',
        ],
        bullets: [
          '`index.html`：页面入口和挂载点',
          '`src/main.ts`：创建应用并挂载',
          '`src/App.vue`：当前页面结构和交互',
          '`src/style.css`：全局视觉和布局样式',
        ],
      },
      {
        title: '零基础阶段先盯住这三件事',
        paragraphs: [
          '第一，不要急着背框架术语，先把“页面上看到的东西对应哪段代码”这件事搞清楚。',
          '第二，每次只改一个点，例如只改标题、只改颜色、只改间距，这样更容易建立代码和结果之间的联系。',
          '第三，尽早学会开发者工具。看懂元素结构和样式来源，比死记语法更重要。',
        ],
      },
    ],
    exercises: [
      {
        id: 'ch1-entry-map',
        title: '练习 1：做一次最小页面改动',
        intro: '通过修改标题、说明文字和背景样式，确认你已经知道这些内容分别来自哪个文件。',
        files: ['index.html', 'src/App.vue', 'src/style.css'],
        steps: [
          '把 `index.html` 里的页面标题改成你自己的学习项目名',
          '在 `src/App.vue` 的欢迎区域写一段“我这一周要完成什么”',
          '在 `src/style.css` 调整主标题字号或背景色',
        ],
        verify: [
          '浏览器标签页标题发生变化',
          '页面内容和样式更新时不需要手动刷新',
        ],
      },
      {
        id: 'ch1-devtools',
        title: '练习 2：用开发者工具验证你的修改',
        intro: '从一开始就训练调试习惯，后面遇到样式和结构问题会轻松很多。',
        files: ['src/App.vue', 'src/style.css'],
        steps: [
          '修改一个卡片标题或按钮文案',
          '在开发者工具的 Elements 面板里找到它',
          '在 Styles 面板临时改一个颜色，再对比源码里的真实样式',
        ],
        verify: [
          '能在 Elements 面板找到你改过的节点',
          '能区分临时调试样式和项目源码样式',
        ],
      },
    ],
    milestone: '完成标准：你能讲清页面入口链路，并且不再害怕修改 HTML 和 CSS。',
  },
  {
    id: 'chapter-2',
    order: 2,
    title: '第二章：JavaScript 基础与页面交互',
    subtitle: '先掌握变量、数组、对象、函数，再理解页面为什么会响应点击',
    duration: '3-4 天',
    summary: '这一章解决“页面为什么会动”。先把 JavaScript 的基本数据和函数写顺，再进入组件逻辑。',
    goals: [
      '熟悉变量、数组、对象、条件判断和函数的基本用法',
      '理解点击按钮、切换标签、更新文本这类交互背后是状态变化',
      '开始把静态页面改成带一点交互的页面',
    ],
    outcomes: [
      '能读懂页面里常见的列表渲染和条件显示逻辑',
      '能自己加一个小开关、小筛选或小计数器',
    ],
    starterSteps: [
      '先在纸上或笔记里写清楚：页面上哪些内容是固定的，哪些内容会变',
      '把“章节列表”“完成状态”“笔记内容”这些页面数据当成对象和数组来看',
      '练习先改数据，再看界面跟着变化',
    ],
    docs: [
      {
        title: '页面交互的本质是状态变化',
        paragraphs: [
          '当你点击一个按钮时，本质上不是“页面自己变了”，而是某个变量的值发生了变化，界面重新显示了新的状态。',
          '如果你能先把页面数据抽象成对象、数组和布尔值，再去写模板，就会比一上来直接拼页面稳定很多。',
        ],
      },
      {
        title: '新手最值得先练的四类数据',
        paragraphs: [
          '字符串用来放标题和说明，数组用来放列表，对象用来组织一组字段，布尔值用来表示开关和完成状态。',
          '这四类数据已经能覆盖大多数入门页面。先把它们用熟，再往更复杂的语法走。',
        ],
      },
    ],
    exercises: [
      {
        id: 'ch2-filter',
        title: '练习 1：给章节列表加一个搜索输入框',
        intro: '这会让你把输入内容和列表结果联系起来，理解数据驱动视图。',
        files: ['src/App.vue', 'src/style.css'],
        steps: [
          '新增一个输入框，保存搜索关键词',
          '只显示标题或副标题里包含关键词的章节',
          '为空时恢复完整列表',
        ],
        verify: [
          '输入内容后列表实时变化',
          '清空输入后列表恢复正常',
        ],
      },
      {
        id: 'ch2-toggle',
        title: '练习 2：加一个“只看未完成”开关',
        intro: '这是最典型的布尔状态练习。',
        files: ['src/App.vue'],
        steps: [
          '新增一个布尔值表示是否隐藏已完成练习',
          '根据这个状态过滤练习列表',
          '在页面上显示“当前可见练习数 / 总练习数”',
        ],
        verify: [
          '开关切换后，列表会立即更新',
          '统计数字会随着筛选同步变化',
        ],
      },
    ],
    milestone: '完成标准：你开始把页面看成“数据 + 显示规则”，而不是一堆零散标签。',
  },
  {
    id: 'chapter-3',
    order: 3,
    title: '第三章：TypeScript 与数据建模',
    subtitle: '给页面数据写类型，让结构更清楚，报错更及时',
    duration: '3-4 天',
    summary: '这一章的目标不是掌握所有 TS 语法，而是学会给页面数据建模，让代码更稳。',
    goals: [
      '知道 `interface`、`type`、可选属性和联合类型的基本使用场景',
      '能为章节、练习、资源等数据定义清晰类型',
      '养成先想数据结构再写页面的习惯',
    ],
    outcomes: [
      '新增字段时能借助类型提示快速同步相关代码',
      '减少因为字段名写错、结构不一致导致的低级错误',
    ],
    starterSteps: [
      '从 `src/types/course.ts` 开始读，先看懂每个字段在页面上对应哪里',
      '不要一下子追求复杂类型，先把对象和数组的类型写准确',
      '每次改数据结构时，观察编辑器如何提示你同步修复其他位置',
    ],
    docs: [
      {
        title: '为什么新手也要学类型',
        paragraphs: [
          '类型不是为了写得更复杂，而是为了在你改错字段、漏传数据、搞混结构时，编辑器能尽早提醒你。',
          '页面数据一旦稍微变多，没有类型就很容易出现“页面为什么不显示”的低效排查。',
        ],
      },
      {
        title: '够用就好，不要一开始追求炫技',
        paragraphs: [
          '入门阶段最重要的是把对象、数组、字符串、布尔值和少量联合类型用准确。',
          '先把常见结构写稳，比一开始研究高阶类型收益更高。',
        ],
        bullets: [
          '`interface` 适合描述对象结构',
          '`type` 适合写联合类型或别名',
          '可选属性适合不一定会出现的数据',
        ],
      },
    ],
    exercises: [
      {
        id: 'ch3-status',
        title: '练习 1：为章节增加学习状态',
        intro: '这会练到联合类型和条件渲染。',
        files: ['src/types/course.ts', 'src/data/courseContent.ts', 'src/App.vue', 'src/style.css'],
        steps: [
          '为章节增加状态字段，例如 `not-started`、`learning`、`reviewing`',
          '用联合类型限制这些状态值',
          '在页面上为不同状态显示不同样式',
        ],
        verify: [
          '写错状态字符串时编辑器会提示错误',
          '页面上能直观看到不同章节状态',
        ],
      },
      {
        id: 'ch3-resource-model',
        title: '练习 2：补充一组自己的学习资源',
        intro: '通过新增数据，体会类型如何帮助你维持结构一致。',
        files: ['src/types/course.ts', 'src/data/courseContent.ts'],
        steps: [
          '新增 2-3 个你打算使用的学习资源',
          '保持字段结构与已有资源一致',
          '如果需要，给资源类型增加更清楚的分类',
        ],
        verify: [
          '新增资源后页面能正常显示',
          '没有出现字段缺失或命名不一致的问题',
        ],
      },
    ],
    milestone: '完成标准：你开始在写页面前先想清楚数据长什么样。',
  },
  {
    id: 'chapter-4',
    order: 4,
    title: '第四章：Vue 3 响应式与模板',
    subtitle: '理解 `ref`、`computed`、`v-model` 和列表渲染的实际用法',
    duration: '4-5 天',
    summary: '这一章重点不是背指令，而是搞清楚“数据变了，界面为什么会自动更新”。',
    goals: [
      '理解 `ref`、`computed`、`v-if`、`v-for`、`v-model` 的基本使用方式',
      '学会把派生结果放进 `computed`，而不是把逻辑塞进模板',
      '用响应式状态驱动输入、列表和统计信息',
    ],
    outcomes: [
      '能自己做出带搜索、筛选、统计的学习页面',
      '开始分辨哪些逻辑适合放在模板，哪些适合放在脚本里',
    ],
    starterSteps: [
      '先看现有 `computed` 是如何从原始数据推导出显示结果的',
      '把复杂判断先写成普通语言，再翻译成代码',
      '模板里尽量只放展示逻辑，计算过程优先写在脚本区',
    ],
    docs: [
      {
        title: '响应式可以理解成“改状态，不改 DOM”',
        paragraphs: [
          '在 Vue 里，你通常不需要手动去找节点再改文字，而是更新状态值，让模板重新渲染。',
          '`ref` 用来保存可变状态，`computed` 用来根据已有状态生成新结果，`v-model` 负责把输入和状态连起来。',
        ],
      },
      {
        title: '模板要简洁，逻辑要可读',
        paragraphs: [
          '如果一段模板里出现很多判断和过滤，就说明这段逻辑更适合搬到 `computed` 里。',
          '让模板负责展示，让脚本负责数据和规则，后续维护会轻松很多。',
        ],
      },
    ],
    exercises: [
      {
        id: 'ch4-summary',
        title: '练习 1：给首页增加学习摘要卡片',
        intro: '练习如何从现有状态中派生出可展示的信息。',
        files: ['src/App.vue', 'src/style.css'],
        steps: [
          '新增一个摘要区域，显示已完成练习数、当前章节和剩余章节数',
          '使用 `computed` 生成这些统计值',
          '不要在模板里直接写复杂计算表达式',
        ],
        verify: [
          '勾选练习后摘要卡片会同步更新',
          '模板结构依然保持清晰',
        ],
      },
      {
        id: 'ch4-note',
        title: '练习 2：为当前章节增加一个“今日收获”输入框',
        intro: '练习 `v-model` 和本地状态同步。',
        files: ['src/App.vue'],
        steps: [
          '在章节页新增一个文本输入区域',
          '通过 `v-model` 绑定章节笔记',
          '切换章节时显示对应章节自己的笔记内容',
        ],
        verify: [
          '输入内容后页面立即更新',
          '切换章节后能看到不同章节对应的笔记',
        ],
      },
    ],
    milestone: '完成标准：你已经能让页面跟着状态变化，而不是依赖手动操作 DOM。',
  },
  {
    id: 'chapter-5',
    order: 5,
    title: '第五章：组件拆分与小型项目结构',
    subtitle: '把大页面拆成多个文件，让结构更清楚、更容易继续扩展',
    duration: '4-6 天',
    summary: '这一章把前面的知识串起来，开始形成真正可维护的小型项目结构。',
    goals: [
      '学会识别哪些区域应该拆成组件或视图文件',
      '理解 props 传值和事件回传的基本协作方式',
      '知道何时把可复用逻辑放进 composable',
    ],
    outcomes: [
      '能把学习总览、章节详情、路线说明拆成多个文件',
      '能逐步把单文件页面演进为更有层次的小项目',
    ],
    starterSteps: [
      '先按“导航、总览、详情、资源”拆视觉区域，再考虑逻辑边界',
      '重复结构优先拆组件，页面级内容优先拆视图文件',
      '和模板无强绑定的逻辑，优先考虑放到 composable',
    ],
    docs: [
      {
        title: '拆分的目标不是文件越多越好',
        paragraphs: [
          '拆分的意义在于让每个文件职责明确：谁负责导航，谁负责详情，谁负责展示资源，一眼就能看懂。',
          '如果一个文件已经同时负责布局、列表、表单、统计和多个交互，通常就值得拆开了。',
        ],
      },
      {
        title: '新手拆分时优先看这两个标准',
        paragraphs: [
          '第一，这一块是不是能独立讲清楚职责。第二，这一块是不是未来还会反复修改或复用。',
          '符合其中一个标准，就可以考虑拆分，而不是等到文件巨大后再动手。',
        ],
      },
    ],
    exercises: [
      {
        id: 'ch5-sidebar',
        title: '练习 1：把章节导航拆成独立组件',
        intro: '这是最适合开始练 props 和事件的部分。',
        files: ['src/App.vue', 'src/components/ChapterSidebar.vue'],
        steps: [
          '把章节列表区域抽到 `ChapterSidebar.vue`',
          '通过 props 传入章节数据、当前选中章节和完成统计',
          '通过事件把章节切换动作通知给父组件',
        ],
        verify: [
          '页面功能保持正常，`App.vue` 变得更短',
          '子组件没有直接依赖父组件内部变量',
        ],
      },
      {
        id: 'ch5-views',
        title: '练习 2：拆出总览页和路线页',
        intro: '让项目从一个大页面演进为多个视图文件。',
        files: ['src/views/OverviewView.vue', 'src/views/RoadmapView.vue', 'src/App.vue'],
        steps: [
          '把首页摘要和学习路线拆到不同视图文件',
          '保留一个清晰的顶部导航切换视图',
          '确保切换视图时当前学习进度不丢失',
        ],
        verify: [
          '不同视图文件职责清楚',
          '切换页面时本地进度和笔记仍然保留',
        ],
      },
    ],
    milestone: '完成标准：你的项目已经不再依赖单个巨型 `App.vue`，结构开始清晰。',
  },
  {
    id: 'chapter-6',
    order: 6,
    title: '第六章：路由、状态管理与请求封装',
    subtitle: '从单页学习台进化为真正的多页应用',
    duration: '5-7 天',
    summary: '这一章把前面的组件知识用起来，引入 Vue Router、Pinia 和请求层，让你能搭出接近真实业务的页面结构。',
    goals: [
      '学会安装和配置 Vue Router，实现多页面切换',
      '用 Pinia 创建 store 管理跨组件共享状态',
      '封装可复用的请求模块，统一处理加载态和错误态',
    ],
    outcomes: [
      '能独立搭建包含登录页、列表页、详情页的小型后台',
      '理解页面间导航和数据流转的完整链路',
    ],
    starterSteps: [
      '先回顾第五章的组件拆分，确认每个视图可以独立工作',
      '安装 Vue Router 和 Pinia，先跑通最小配置',
      '把现有的 useLocalStorage 替换为 Pinia store + 持久化插件',
    ],
    docs: [
      {
        title: '为什么需要路由和状态管理',
        paragraphs: [
          '当你的应用从"一个页面里切换区域"变成"多个独立页面"时，就需要路由来管理 URL 和页面对应关系。',
          '当多个页面需要共享同一份数据（比如用户信息、学习进度）时，就需要状态管理来避免数据传递混乱。',
        ],
      },
      {
        title: '请求封装不是调用一个函数那么简单',
        paragraphs: [
          '真实的业务请求需要统一处理 loading 状态、错误提示、token 过期重定向等。这些逻辑不应该散落在每个组件里。',
          '先封装一个基础的请求工具函数，再用它包装具体的 API 方法，这样换请求库或改错误处理时只需要改一处。',
        ],
      },
    ],
    exercises: [
      {
        id: 'ch6-router',
        title: '练习 1：引入 Vue Router，把学习台改成多页应用',
        intro: '把 v-if 切换视图改为 URL 驱动的路由切换。',
        files: ['src/App.vue', 'src/router/index.ts', 'src/main.ts'],
        steps: [
          '安装 vue-router，创建 router 配置',
          '为总览、章节、路线、资料分别创建路由',
          '用 router-link 替代手动切换视图的按钮',
        ],
        verify: [
          '浏览器地址栏 URL 随导航切换变化',
          '刷新页面后仍然停留在当前视图',
        ],
      },
      {
        id: 'ch6-store',
        title: '练习 2：用 Pinia 管理学习进度',
        intro: '把分散在 useLocalStorage 里的状态集中到 Pinia store 中。',
        files: ['src/stores/progress.ts', 'src/App.vue', 'src/views/ChapterView.vue'],
        steps: [
          '安装 Pinia，创建 progress store',
          '把完成状态和笔记迁移到 store 中',
          '使用 Pinia 持久化插件替代 useLocalStorage',
        ],
        verify: [
          '学习进度在页面刷新后依然保留',
          '多个组件可以同时访问同一份进度数据',
        ],
      },
    ],
    milestone: '完成标准：你能搭建一个包含路由、状态管理和请求层的小型项目骨架。',
  },
]

export const learningResources: LearningResource[] = [
  {
    type: '官方文档',
    name: 'Vue 官方文档',
    note: '优先阅读 Essentials、Reactivity Fundamentals、Component Basics。每学完一个概念，都回到项目里做最小实践。',
    link: 'https://vuejs.org/',
  },
  {
    type: '官方文档',
    name: 'TypeScript Handbook',
    note: '重点阅读 Everyday Types、Functions、Generics，不需要一开始全部读完。',
    link: 'https://www.typescriptlang.org/docs/',
  },
  {
    type: '基础参考',
    name: 'MDN Web Docs',
    note: '遇到 HTML、CSS、DOM、事件、Fetch 等基础概念时，优先查 MDN。',
    link: 'https://developer.mozilla.org/',
  },
  {
    type: '练习建议',
    name: '自己的学习笔记',
    note: '每章都记录“我今天学会了什么、哪里没懂、下一步准备改哪里”。这比囤教程更有用。',
    link: 'https://developer.mozilla.org/zh-CN/docs/Learn',
  },
]
