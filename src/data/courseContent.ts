import type {
  CodeBlock,
  CourseChapter,
  CourseDocSection,
  CourseExercise,
  LearningPhaseMeta,
  LearningResource,
} from '../types/course'

function createCode(title: string, lang: string, content: string): CodeBlock {
  return { title, lang, content }
}

function createDocSection(
  title: string,
  paragraphs: string[],
  bullets?: string[],
  code?: CodeBlock[],
): CourseDocSection {
  return { title, paragraphs, bullets, code }
}

function createExercise(
  id: string,
  title: string,
  intro: string,
  files: string[],
  steps: string[],
  verify: string[],
): CourseExercise {
  return { id, title, intro, files, steps, verify }
}

export const learningPhases: LearningPhaseMeta[] = [
  {
    id: 'foundations',
    title: '基础入门',
    focus: '先把浏览器、JavaScript、CSS、TypeScript 和 Vue 响应式串起来',
    description: '适合从 Python 后端转前端的人，重点不是背 API，而是建立页面如何响应状态变化的直觉。',
    chapterRange: 'Chapter 1-5',
  },
  {
    id: 'core',
    title: '核心机制',
    focus: '把组件拆分、生命周期、逻辑复用、表单处理做扎实',
    description: '从能写页面，提升到能组织一个中小型 Vue 应用，开始形成模块边界和工程习惯。',
    chapterRange: 'Chapter 6-9',
  },
  {
    id: 'architecture',
    title: '应用架构',
    focus: '进入路由、状态管理、异步数据和类型体系',
    description: '这一阶段不再停留在 demo，而是开始接近真实业务系统的页面结构和数据流。',
    chapterRange: 'Chapter 10-14',
  },
  {
    id: 'production',
    title: '生产落地',
    focus: '补齐样式工程、性能、测试和项目交付',
    description: '目标是做出可以展示、可以复盘、可以继续演进的前端项目，而不是只停留在教程练习。',
    chapterRange: 'Chapter 15-17',
  },
]

export const courseChapters: CourseChapter[] = [
  {
    id: 'chapter-1',
    order: 1,
    title: '第一章：浏览器、页面结构与 Vite 入口',
    subtitle: '先搞清楚页面是怎么被加载出来的，再谈 Vue 语法',
    duration: '2 天',
    phase: 'foundations',
    summary: '这一章先建立前端运行模型。你需要知道浏览器先读什么、Vite 做了什么、Vue 是怎么挂载到页面上的。',
    goals: [
      '知道 `index.html`、`src/main.ts`、`App.vue` 和 `src/style.css` 的角色分工',
      '理解 HTML 负责结构、CSS 负责表现、JavaScript 负责行为',
      '开始使用浏览器开发者工具定位 DOM、样式和网络请求',
    ],
    outcomes: ['能独立修改页面标题、布局和局部样式', '能解释当前学习项目的入口链路'],
    starterSteps: [
      '先通读 `index.html`、`src/main.ts`、`src/App.vue`、`src/style.css`',
      '运行 `npm run dev`，边改文字边观察热更新',
      '打开 DevTools，定位一个标题和一个卡片，确认样式来源',
    ],
    docs: [
      createDocSection(
        '浏览器先看到什么',
        [
          '浏览器不会先读 `App.vue`。它先读取 `index.html`，找到挂载点，再加载入口脚本。',
          'Vite 在开发阶段会把模块依赖关系接起来，让你修改文件后页面可以即时更新。',
          'Vue 真正负责的是把组件树渲染到 `#app` 里，所以主体界面通常都来自组件文件。',
        ],
        ['先认入口，再认组件，再认样式来源'],
        [
          createCode(
            '入口文件关系',
            'html',
            `<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>`,
          ),
        ],
      ),
      createDocSection(
        '前端三件套怎么分工',
        [
          'HTML 描述内容结构，比如标题、列表、按钮和表单。',
          'CSS 决定视觉呈现，比如间距、颜色、排版和响应式布局。',
          'JavaScript 处理状态和交互，比如点击、切换、请求和动态渲染。',
        ],
        ['结构变动先看 HTML', '样式问题先看 CSS', '行为问题先看脚本'],
      ),
      createDocSection(
        '为什么 Vite 适合入门',
        [
          'Vite 的开发服务器足够快，保存后几乎马上就能看到变化，这对建立反馈回路非常重要。',
          '它默认支持 ESM 模块和 Vue 单文件组件，不需要你先搭一堆复杂配置。',
          '对于新手来说，重点不是研究 bundler，而是把时间放在页面结构和数据流上。',
        ],
        undefined,
        [
          createCode(
            'main.ts 最小挂载',
            'ts',
            `import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')`,
          ),
        ],
      ),
      createDocSection(
        '从 Python 后端视角理解页面加载',
        [
          '如果你熟悉 Django 或 Flask 模板，可以把 `index.html` 理解成壳页面，但 Vue 会继续在浏览器里接管后续渲染。',
          '后端模板是服务端一次性生成 HTML，SPA 则是在客户端根据状态不断重绘视图。',
          '所以前端开发更强调状态变更、组件边界和浏览器调试，而不只是输出字符串。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch1-entry-map',
        '练习 1：画出项目入口地图',
        '把当前项目从浏览器到组件的加载链路自己复述一遍。',
        ['index.html', 'src/main.ts', 'src/App.vue'],
        ['写出页面先加载哪个文件，再进入哪个脚本，再渲染哪个组件', '把首页标题改成你自己的学习主题', '在页面上补一段“我为什么学 Vue”说明'],
        ['刷新后改动仍然存在', '你能口头解释文件关系'],
      ),
      createExercise(
        'ch1-devtools',
        '练习 2：用 DevTools 验证样式来源',
        '练习从界面反查源码，而不是盲猜样式在哪。',
        ['src/App.vue', 'src/style.css'],
        ['选一个卡片，用 Elements 面板定位节点', '在 Styles 面板临时改颜色和间距', '回到源码里做真正修改，再对比结果'],
        ['能区分临时调试样式和源码样式', '能找到一个样式声明的准确位置'],
      ),
    ],
    milestone: '完成标准：你不再把 Vue 项目看成黑盒，而是知道浏览器、入口脚本和组件之间如何接起来。',
  },
  {
    id: 'chapter-2',
    order: 2,
    title: '第二章：JavaScript 基础与页面交互',
    subtitle: '先理解变量、数组、对象和函数，再用原生 JS 操纵页面',
    duration: '4 天',
    phase: 'foundations',
    summary: '这一章解决”交互从哪里来”。你需要把页面变化抽象成状态变化，同时体验原生 DOM 操作，为后续理解 Vue 的价值打下基础。',
    goals: [
      '熟悉变量、数组、对象、函数和条件判断',
      '理解按钮点击、筛选和切换背后其实是状态更新',
      '体验原生 DOM 查询和事件监听，感受手动操作的繁琐',
      '开始把页面数据看成对象和数组，而不是直接拼模板',
    ],
    outcomes: ['能写出搜索、计数、切换这种基础交互', '能把一段 UI 需求先翻译成数据结构和规则', '能解释原生 DOM 操作的痛点，理解为什么需要框架'],
    starterSteps: [
      '先写出页面里哪些数据会变化，哪些不会变化',
      '把章节、资源、练习看成数组和对象',
      '练习用数组方法驱动界面结果，而不是手写重复内容',
      '用浏览器控制台手写几行 DOM 操作，感受一下',
    ],
    docs: [
      createDocSection(
        '页面交互本质是状态变化',
        [
          '点击按钮不会直接让页面神奇变化，本质是某个变量变了，然后页面重新渲染。',
          '只要你能把状态列清楚，后续不管是原生 JS 还是 Vue，思路都一致。',
          '状态通常包括字符串、数组、对象和布尔值，这四类足够覆盖大量入门页面。',
        ],
      ),
      createDocSection(
        '数组方法是前端高频武器',
        [
          '`map` 常用来把数据转换成展示项，`filter` 常用来筛选列表，`find` 常用来查单个对象。',
          '对 Python 开发者来说，`map/filter` 可以类比列表推导式，但在前端里它们更直接服务于渲染。',
          '学会这几个方法后，很多页面逻辑都会变成简单的数据操作。',
        ],
        ['优先写纯数据操作，再让模板消费结果'],
        [
          createCode(
            '列表筛选',
            'js',
            `const keyword = 'vue'
const items = ['Vue 3', 'React', 'TypeScript']
const result = items.filter((item) =>
  item.toLowerCase().includes(keyword),
)`,
          ),
        ],
      ),
      createDocSection(
        '对象和解构在页面中为什么重要',
        [
          '前端几乎所有业务数据都是对象数组，例如用户列表、订单列表、课程章节。',
          '解构让你更方便地读取字段，但也要注意不要过度拆散，尤其在响应式场景里更要理解边界。',
          '写页面之前先想数据长什么样，通常比直接写模板更稳。',
        ],
      ),
      createDocSection(
        '原生 DOM 操作：先体验痛苦，再理解框架',
        [
          '在没有 Vue 之前，前端开发者需要手动查找 DOM 节点、绑定事件、拼接 HTML 字符串来更新页面。',
          '`document.querySelector` 找节点，`addEventListener` 绑事件，`textContent` 或 `innerHTML` 改内容，这些是原生三件套。',
          '当页面只有一两个交互时还能应付，一旦状态多起来、列表需要动态增删，代码会迅速失控。',
          '先体验这种繁琐，后面学 Vue 响应式时你才会真正理解它解决了什么问题。',
        ],
        ['原生 DOM 操作是理解框架价值的基础', '不需要精通，但要写过'],
        [
          createCode(
            '原生 JS 操作 DOM',
            'js',
            `// 找到按钮和计数显示区
const btn = document.querySelector('#count-btn')
const display = document.querySelector('#count-display')
let count = 0

// 手动绑定事件、手动更新 DOM
btn.addEventListener('click', () => {
  count++
  display.textContent = \`点击了 \${count} 次\`
})`,
          ),
        ],
      ),
      createDocSection(
        '异步基础不要跳过',
        [
          '哪怕你现在还没正式写接口，请先熟悉 Promise 和 `async/await` 的思路。',
          '前端请求接口、等待用户输入、延迟反馈，这些场景都离不开异步。',
          '对 Python 开发者来说，`async/await` 不是新概念，但浏览器里更容易和 UI 状态绑在一起。',
        ],
        undefined,
        [
          createCode(
            '异步请求骨架',
            'ts',
            `async function loadChapters() {
  const response = await fetch('/api/chapters')
  const data = await response.json()
  return data
}`,
          ),
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch2-search',
        '练习 1：给章节列表加搜索',
        '让输入内容驱动列表筛选，这是最典型的数据驱动视图练习。',
        ['src/App.vue', 'src/components/ChapterSidebar.vue'],
        ['增加一个关键词状态', '根据标题和副标题筛选章节', '为空时恢复完整列表'],
        ['输入时列表实时变化', '清空后恢复全部章节'],
      ),
      createExercise(
        'ch2-toggle',
        '练习 2：增加”只看未完成”开关',
        '练习布尔状态和条件过滤。',
        ['src/App.vue', 'src/views/OverviewView.vue'],
        ['增加布尔状态保存过滤条件', '只展示还有未完成练习的章节', '在界面显示当前可见章节数'],
        ['开关切换时界面立即更新', '计数结果和列表一致'],
      ),
      createExercise(
        'ch2-dom-practice',
        '练习 3：用原生 JS 写一个计数器',
        '在浏览器控制台或临时 HTML 文件中体验手动 DOM 操作，为后续理解 Vue 做铺垫。',
        ['index.html', '浏览器控制台'],
        ['在控制台用 querySelector 找到页面上的一个元素', '用 addEventListener 绑定点击事件', '手动更新元素的 textContent'],
        ['你能解释每一步在做什么', '你能说出这种方式的痛点'],
      ),
    ],
    milestone: '完成标准：你开始把交互问题理解成”状态 + 规则”，并且体验过原生 DOM 操作的繁琐。',
  },
  {
    id: 'chapter-3',
    order: 3,
    title: '第三章：CSS 布局基础',
    subtitle: '掌握 Flexbox 和 Grid，让页面不再是一堆挤在一起的方块',
    duration: '3 天',
    phase: 'foundations',
    summary: '这一章补齐布局能力。Python 后端开发者通常没有系统学过 CSS 布局，但这是前端开发的基础中的基础。',
    goals: [
      '理解盒模型、display 属性和文档流的基本概念',
      '掌握 Flexbox 核心属性，能实现常见的水平排列、居中和等分布局',
      '了解 Grid 基础，能搭建简单的网格结构',
      '建立响应式布局意识，知道媒体查询的基本用法',
    ],
    outcomes: [
      '能用 Flexbox 实现导航栏、卡片列表、居中布局等常见结构',
      '能解释为什么某个元素没有按预期排列',
    ],
    starterSteps: [
      '先搞清楚块级元素和行内元素的区别',
      '从 Flexbox 的主轴和交叉轴开始理解，不要背所有属性',
      '在当前项目的 style.css 中找到 Flexbox 用法并理解它们',
    ],
    docs: [
      createDocSection(
        '盒模型：一切布局的起点',
        [
          '每个 HTML 元素都是一个矩形盒子，由内容区、内边距（padding）、边框（border）和外边距（margin）组成。',
          '默认情况下，你设置的 width 只包含内容区，加上 padding 和 border 后实际宽度会更大。',
          '`box-sizing: border-box` 让 width 包含 padding 和 border，这是现代开发几乎必加的设置。',
        ],
        undefined,
        [
          createCode(
            '盒模型设置',
            'css',
            `/* 推荐全局设置 */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 这样设置 width: 200px 后，
   实际宽度就是 200px，
   不用再手动减 padding 和 border */`,
          ),
        ],
      ),
      createDocSection(
        'Flexbox：解决 80% 的布局问题',
        [
          'Flexbox 是一维布局方案，适合在一行或一列中排列元素。',
          '核心概念是主轴和交叉轴：`flex-direction` 决定主轴方向，`justify-content` 控制主轴排列，`align-items` 控制交叉轴对齐。',
          '最常用的组合：水平居中（`justify-content: center` + `align-items: center`）、两端对齐（`justify-content: space-between`）、等分（`gap` + 去掉固定宽度）。',
        ],
        [
          '主轴方向由 flex-direction 决定',
          'justify-content 管主轴，align-items 管交叉轴',
          'gap 是最简洁的元素间距方案',
        ],
        [
          createCode(
            'Flexbox 常见用法',
            'css',
            `/* 水平居中 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 导航栏：左右两端对齐 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 卡片列表：自动换行 + 间距 */
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1;
  min-width: 280px;
}`,
          ),
        ],
      ),
      createDocSection(
        'Grid：当你需要二维控制',
        [
          'Grid 是二维布局方案，适合需要同时控制行和列的场景，例如仪表盘、图片墙和复杂页面框架。',
          '入门阶段不需要掌握所有 Grid 属性，`grid-template-columns`、`gap` 和 `fr` 单位就够用了。',
          '一个常见的判断标准：如果 Flexbox 已经能清晰解决问题，就不必硬上 Grid。',
        ],
        undefined,
        [
          createCode(
            'Grid 基础',
            'css',
            `/* 三列等分布局 */
.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

/* 自适应列数 */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}`,
          ),
        ],
      ),
      createDocSection(
        '响应式布局：不是缩成一列就完事',
        [
          '响应式不是让所有东西在小屏幕上堆成一列，而是重新考虑阅读顺序和交互密度。',
          '媒体查询（`@media`）是最基础的响应式手段，根据屏幕宽度应用不同样式。',
          '对 Python 开发者来说，可以类比后端根据不同客户端返回不同模板，只是在前端用 CSS 完成。',
        ],
        undefined,
        [
          createCode(
            '媒体查询示例',
            'css',
            `/* 移动端优先 */
.sidebar {
  display: none;
}

/* 桌面端 */
@media (min-width: 768px) {
  .sidebar {
    display: block;
    width: 260px;
  }

  .main {
    display: flex;
  }
}`,
          ),
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch3-flexbox-nav',
        '练习 1：用 Flexbox 重做导航栏',
        '把课程平台的顶部导航栏改成纯 Flexbox 实现，理解每行 CSS 在做什么。',
        ['src/style.css', 'src/components/AppHeader.vue'],
        ['找到导航栏相关的样式代码', '确认 flex、justify-content、align-items 各自的作用', '试着修改对齐方式，观察变化'],
        ['你能解释导航栏每个 flex 属性的作用', '修改属性后布局变化符合预期'],
      ),
      createExercise(
        'ch3-layout-practice',
        '练习 2：练习卡片列表布局',
        '用 Flexbox 或 Grid 实现一个自适应的卡片列表。',
        ['src/style.css', 'src/views/OverviewView.vue'],
        ['让章节预览卡片在不同宽度下自动换行', '用 gap 控制间距', '在窄屏下单列显示'],
        ['窗口缩小时卡片自动重排', '间距统一且不拥挤'],
      ),
    ],
    milestone: '完成标准：你看到一张页面布局图，能判断该用 Flexbox 还是 Grid，并写出基本样式。',
  },
  {
    id: 'chapter-4',
    order: 4,
    title: '第四章：TypeScript 与前端数据建模',
    subtitle: '先学够用的类型，再让编辑器帮你守住结构',
    duration: '3 天',
    phase: 'foundations',
    summary: '这一章不是追求炫技类型，而是学会给页面数据建模，让字段、结构和组件契约更稳定。',
    goals: ['理解 `type`、`interface`、联合类型和泛型的基础用法', '能为章节、资源、练习和测验定义类型', '建立先定义数据结构再写界面的习惯'],
    outcomes: ['能用类型提示快速定位字段改动带来的影响', '能减少因为命名错误和结构漂移导致的低级 bug'],
    starterSteps: ['从 `src/types/course.ts` 反查每个类型被谁使用', '优先写清楚对象和数组结构，不急着写复杂泛型', '每次加字段都观察编辑器如何提示你同步修改其他位置'],
    docs: [
      createDocSection(
        '为什么前端也要重视建模',
        [
          '前端不是只有模板和样式，它同样要面对接口结构、组件参数和页面状态。',
          '当页面规模一变大，没有类型约束就容易出现字段写错、结构不一致、空值漏判等问题。',
          'TypeScript 的价值在于把很多错误提前到编码阶段，而不是等浏览器运行时报错。',
        ],
      ),
      createDocSection(
        '先用够用的类型，不要一开始过度设计',
        [
          '入门阶段优先掌握对象、数组、字面量联合类型和少量泛型就够了。',
          '复杂类型技巧不是不能学，但应该在你真实遇到问题时再引入。',
          '你现在最需要的是稳定的数据契约，而不是类型体操。',
        ],
        ['`interface` 更适合对象结构', '`type` 更适合别名和联合类型'],
      ),
      createDocSection(
        '把页面状态显式化',
        [
          '像 `loading`、`error`、`ready` 这类状态，如果只靠注释约定，维护成本会很高。',
          '更稳妥的做法是把它们定义成联合类型，让非法值根本写不进去。',
          '这类写法在真实业务里非常常见，例如请求状态、权限状态、表单状态。',
        ],
        undefined,
        [
          createCode(
            '联合类型约束状态',
            'ts',
            `type RequestState = 'idle' | 'loading' | 'success' | 'error'

interface PageModel {
  state: RequestState
  message?: string
}`,
          ),
        ],
      ),
      createDocSection(
        '类型和运行时不是一回事',
        [
          'TypeScript 只在编译阶段工作，打包后运行的仍然是 JavaScript。',
          '这意味着类型可以提前发现问题，但不能替代运行时校验。',
          '真正对接后端时，接口返回的数据仍然需要做空值、字段存在性和异常处理。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch3-status-model',
        '练习 1：给章节增加学习状态类型',
        '练习联合类型和样式映射。',
        ['src/types/course.ts', 'src/data/courseContent.ts', 'src/components/ChapterSidebar.vue'],
        ['定义 `not-started`、`learning`、`reviewing` 之类的状态', '给章节补充状态字段', '在侧栏上显示不同状态样式'],
        ['写错状态值时编辑器报错', '不同状态有可视化区别'],
      ),
      createExercise(
        'ch3-resource-model',
        '练习 2：新增一组你自己的资源分类',
        '通过补充数据体会类型约束如何保护结构一致性。',
        ['src/types/course.ts', 'src/data/courseContent.ts'],
        ['新增 2 到 3 个资源项', '保持结构与已有资源一致', '如有必要，扩展资源分类字段'],
        ['页面正常显示', '没有出现字段缺失问题'],
      ),
    ],
    milestone: '完成标准：你已经能先想数据结构，再用类型把结构固定下来。',
  },
  {
    id: 'chapter-5',
    order: 5,
    title: '第五章：Vue 3 响应式、模板与计算属性',
    subtitle: '从“改 DOM”切换到“改状态”',
    duration: '4 天',
    phase: 'foundations',
    summary: '这一章开始真正进入 Vue 核心心智模型。重点不是背指令，而是理解状态变化如何驱动界面自动更新。',
    goals: ['掌握 `ref`、`computed`、`v-model`、`v-if`、`v-for` 的基础使用', '知道什么逻辑该放模板，什么逻辑该放脚本', '能用响应式状态构建筛选、统计和表单输入'],
    outcomes: ['能写出有搜索、统计、备注输入的学习页面', '能解释 Vue 为什么不鼓励你直接操作 DOM'],
    starterSteps: ['先读现有 `computed` 和 `useLocalStorage` 的用法', '把复杂判断先写成人话，再翻成代码', '模板里优先展示结果，计算过程尽量放脚本区'],
    docs: [
      createDocSection(
        '响应式核心：你改的是状态，不是节点',
        [
          '在 Vue 里，你通常不需要先 `querySelector` 再改文本，而是直接更新状态。',
          'Vue 会追踪状态依赖关系，在数据变化时重新渲染对应区域。',
          '这也是组件开发能保持可维护性的基础，否则复杂页面很快就会变成手写 DOM 的泥潭。',
        ],
      ),
      createDocSection(
        'ref、reactive、computed 的分工',
        [
          '`ref` 更适合单个值，`reactive` 更适合对象，`computed` 用来表达派生结果。',
          '如果一个值可以从其他状态推导出来，就不要再单独存一份。',
          '这样可以减少状态冗余，避免多个地方不同步。',
        ],
        undefined,
        [
          createCode(
            '从原始状态推导统计',
            'vue',
            `const completed = ref(6)
const total = ref(14)

const progress = computed(() => {
  return Math.round((completed.value / total.value) * 100)
})`,
          ),
        ],
      ),
      createDocSection(
        '模板为什么要保持干净',
        [
          '模板是给人读的。如果模板里塞满筛选、排序、格式化和条件嵌套，维护成本会迅速上升。',
          '更好的方式是让模板只消费结果，把数据准备过程放到脚本中。',
          '当你开始觉得模板难读时，通常就该提炼 `computed` 或子组件了。',
        ],
      ),
      createDocSection(
        'v-model 其实是双向同步约定',
        [
          '`v-model` 让输入框和状态保持同步，适合文本框、选择器和表单组件。',
          '但它不是魔法，本质仍然是读取当前值并在输入时更新状态。',
          '理解这一点后，你在自定义组件中也更容易掌握 `modelValue` 机制。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch5-summary-card',
        '练习 1：做一个学习进度摘要卡片',
        '练习从已有状态中推导 UI 结果。',
        ['src/views/OverviewView.vue', 'src/App.vue'],
        ['新增摘要卡片展示已完成练习、通过测验和当前章节', '用 `computed` 组织展示数据', '避免在模板里直接写复杂表达式'],
        ['勾选练习后摘要会同步变化', '模板保持可读'],
      ),
      createExercise(
        'ch5-note',
        '练习 2：为每章增加“今日收获”输入框',
        '练习 `v-model` 和章节级状态切换。',
        ['src/views/ChapterView.vue', 'src/App.vue'],
        ['在章节页增加一个笔记输入区', '切换章节时读取对应章节笔记', '返回章节后笔记仍然存在'],
        ['输入内容实时更新', '不同章节的笔记互不覆盖'],
      ),
    ],
    milestone: '完成标准：你已经能用“状态驱动视图”的方式写页面，而不是手动改 DOM。',
  },
  {
    id: 'chapter-6',
    order: 6,
    title: '第六章：组件拆分、生命周期与项目结构',
    subtitle: '从一个大页面走向职责清晰的模块化结构',
    duration: '5 天',
    phase: 'core',
    summary: '这一章关注结构设计和生命周期。你会开始知道什么时候该拆组件、什么时候该拆视图、组件挂载和销毁时该做什么。',
    goals: [
      '识别可复用视图块和重复结构',
      '掌握 `props`、事件回传和插槽的基本协作方式',
      '理解 `onMounted`、`onUnmounted` 等生命周期钩子的使用场景',
      '掌握模板 ref 的基本用法',
      '初步建立按功能和职责组织目录的习惯',
    ],
    outcomes: [
      '能把大页面拆成头部、侧栏、内容区和功能卡片',
      '能避免把所有逻辑继续堆在 `App.vue` 里',
      '能在组件挂载时执行初始化、销毁时执行清理',
    ],
    starterSteps: [
      '先从重复 UI 下手拆组件',
      '再把整页内容拆成视图组件',
      '最后把纯数据和纯逻辑移动到独立模块',
      '思考每个组件挂载和销毁时需要做什么',
    ],
    docs: [
      createDocSection(
        '拆分不是为了文件更多',
        [
          '拆分的目标是职责清晰。每个文件最好能一句话说清它负责什么。',
          '当一个文件同时处理布局、逻辑、表单、统计和弹窗时，通常就值得拆分。',
          '但拆得过细也会增加跳转成本，所以要结合复用价值和认知负担判断。',
        ],
      ),
      createDocSection(
        '父子协作的基本模式',
        [
          '父组件负责组织数据和规则，子组件负责聚焦展示和局部交互。',
          '父组件通过 `props` 把数据传下去，子组件通过事件把动作抛回来。',
          '先把这条单向数据流练熟，再引入全局状态会更自然。',
        ],
        undefined,
        [
          createCode(
            'props 和 emit 协作',
            'vue',
            `const props = defineProps<{ title: string }>()

const emit = defineEmits<{
  select: [id: string]
}>()`,
          ),
        ],
      ),
      createDocSection(
        '什么时候该拆视图',
        [
          '当一个区域已经能独立讲清业务目标，例如总览页、章节页、资源页，就适合拆成视图。',
          '视图组件让入口文件更像控制中心，而不是巨型模板。',
          '对学习项目来说，这一步很重要，因为它会逼你梳理页面边界。',
        ],
      ),
      createDocSection(
        '什么时候该拆数据模块',
        [
          '静态课程数据、资源列表、题库数据都不应该和页面模板混在一起。',
          '把它们拆出去以后，你会更容易同时关注数据内容和展示方式。',
          '这也是后续做接口替换时最常见的准备动作。',
        ],
      ),
      createDocSection(
        '组件生命周期：挂载时做什么，销毁时做什么',
        [
          '每个 Vue 组件都有自己的生命周期：创建、挂载到 DOM、更新、卸载。',
          '`onMounted` 是最常用的钩子，适合执行初始化操作，比如获取数据、设置定时器或操作 DOM。',
          '`onUnmounted` 用于清理工作，比如清除定时器、移除事件监听或取消请求，防止内存泄漏。',
          '如果你在 `onMounted` 里创建了需要手动清理的资源，就必须在 `onUnmounted` 里释放它。',
        ],
        ['onMounted 做初始化', 'onUnmounted 做清理', '配对使用，不要遗漏'],
        [
          createCode(
            '生命周期钩子基本用法',
            'vue',
            `<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const time = ref('')

let timer: number | undefined

onMounted(() => {
  // 挂载后启动定时器
  timer = window.setInterval(() => {
    time.value = new Date().toLocaleTimeString()
  }, 1000)
})

onUnmounted(() => {
  // 销毁时清除定时器，防止内存泄漏
  if (timer) clearInterval(timer)
})
</script>`,
          ),
        ],
      ),
      createDocSection(
        '模板 ref：当你确实需要访问 DOM',
        [
          '通常 Vue 会帮你处理 DOM 更新，但有时你需要直接访问 DOM 节点，比如聚焦输入框或测量元素尺寸。',
          '模板 ref 通过 `ref` 属性和同名的响应式变量建立关联，组件挂载后就能拿到真实 DOM 节点。',
          '只能在 `onMounted` 及之后访问模板 ref，因为挂载前 DOM 还不存在。',
        ],
        undefined,
        [
          createCode(
            '模板 ref 基本用法',
            'vue',
            `<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 声明一个和模板中 ref 同名的变量
const inputEl = ref<HTMLInputElement | null>(null)

onMounted(() => {
  // 挂载后自动聚焦
  inputEl.value?.focus()
})
</script>

<template>
  <input ref="inputEl" placeholder="自动聚焦" />
</template>`,
          ),
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch6-sidebar',
        '练习 1：重做章节侧栏分组',
        '把侧栏从简单列表升级为带阶段分组的导航。',
        ['src/components/ChapterSidebar.vue', 'src/style.css'],
        ['按阶段对章节分组', '显示每个阶段的章节数和完成状态', '保持点击切换逻辑不变'],
        ['侧栏更清晰', '现有导航功能无回归'],
      ),
      createExercise(
        'ch6-layout',
        '练习 2：把总览页拆成多个信息板块',
        '练习在一个页面里组织多个职责明确的组件区块。',
        ['src/views/OverviewView.vue', 'src/style.css'],
        ['区分课程介绍、阶段路线、进度统计和推荐起步动作', '给每个板块一个明确标题', '避免所有信息塞在同一张卡片里'],
        ['总览结构更清楚', '每个板块都有独立意图'],
      ),
      createExercise(
        'ch6-lifecycle',
        '练习 3：给章节页增加自动聚焦',
        '练习 onMounted 和模板 ref，切换到章节页时自动聚焦笔记输入框。',
        ['src/views/ChapterView.vue'],
        ['给笔记输入框添加模板 ref', '在 onMounted 中实现自动聚焦', '确保切换章节时聚焦逻辑正常工作'],
        ['进入章节页后笔记框自动获得焦点', '能解释为什么要在 onMounted 而不是 setup 阶段操作 DOM'],
      ),
    ],
    milestone: '完成标准：你已经能把页面拆成有边界的模块，并知道组件挂载和销毁时该做什么。',
  },
  {
    id: 'chapter-7',
    order: 7,
    title: '第七章：响应式进阶、watch 与副作用',
    subtitle: '开始区分状态、派生结果和副作用处理',
    duration: '4 天',
    phase: 'core',
    summary: '这一章让你更细致地理解 Vue 响应式。重点是知道何时用 `computed`，何时用 `watch`，何时抽到 composable。',
    goals: ['理解 `watch`、`watchEffect`、`toRefs` 等进阶响应式 API', '避免把副作用塞进 `computed`', '理解 reactive 解构、深层追踪和依赖收集的边界'],
    outcomes: ['能处理本地持久化、自动同步和监听类逻辑', '能解释为什么有些状态变化没有触发预期更新'],
    starterSteps: ['先确认哪些逻辑是纯计算，哪些逻辑会产生副作用', '复盘现有 `useLocalStorage` 为什么更适合用监听机制', '用最小示例感受 `ref`、`reactive` 和解构后的差别'],
    docs: [
      createDocSection(
        '为什么要区分副作用',
        [
          '修改 localStorage、发请求、写日志、触发动画，这些都属于副作用。',
          '副作用不应该塞进 `computed`，因为 `computed` 更适合纯粹的结果推导。',
          '一旦计算属性里开始偷偷改状态，排错会变得非常困难。',
        ],
      ),
      createDocSection(
        'watch 和 watchEffect 的边界',
        [
          '`watch` 适合明确指定监听源，`watchEffect` 适合快速追踪回调内部用到的依赖。',
          '如果你需要比较新旧值、控制触发时机，通常优先选 `watch`。',
          '如果你只想“依赖什么就自动重跑什么”，`watchEffect` 更省事。',
        ],
        undefined,
        [
          createCode(
            '本地持久化监听',
            'ts',
            `watch(progress, (value) => {
  localStorage.setItem('progress', JSON.stringify(value))
}, { deep: true })`,
          ),
        ],
      ),
      createDocSection(
        'reactive 解构为什么会出问题',
        [
          '很多新手会直接从 `reactive` 对象里解构字段，结果发现后续更新不再响应。',
          '这是因为你拿到的是当前值，而不是继续受代理追踪的引用。',
          '需要保留响应式连接时，可以使用 `toRefs` 或直接保留对象访问。',
        ],
      ),
      createDocSection(
        '深层对象监听要克制',
        [
          '深层监听虽然方便，但也会带来额外成本和更难理解的触发链路。',
          '更稳妥的做法是尽量把状态结构扁平化，把变化点收束到明确字段。',
          '当你发现一个状态对象越来越大，通常应该考虑拆模块或拆 composable。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch7-watch-storage',
        '练习 1：自己实现一个最小 `watch` 持久化',
        '不要先看 composable，先亲手把监听和存储串一遍。',
        ['src/App.vue', 'src/composables/useLocalStorage.ts'],
        ['选一个简单状态做本地持久化', '用 `watch` 同步到 localStorage', '刷新页面后恢复数据'],
        ['状态刷新后保留', '没有把副作用写进 `computed`'],
      ),
      createExercise(
        'ch7-reactive-boundary',
        '练习 2：验证 reactive 解构边界',
        '用一个最小实验理解为什么有时界面不更新。',
        ['src/views/ChapterView.vue'],
        ['构造一个 reactive 对象', '分别测试直接访问和解构后的更新表现', '记录差异和原因'],
        ['你能解释差异来源', '实验结果符合预期'],
      ),
    ],
    milestone: '完成标准：你能区分纯计算和副作用，也知道 watch 该在什么场景出手。',
  },
  {
    id: 'chapter-8',
    order: 8,
    title: '第八章：Composables 与逻辑复用',
    subtitle: '把重复的状态管理和副作用提炼成可复用模块',
    duration: '5 天',
    phase: 'core',
    summary: '这一章进入 Composition API 的真正生产用法。目标是把逻辑从页面里抽离出来，形成可维护的 composable。',
    goals: ['识别适合抽取的可复用逻辑', '理解 composable 的输入、输出和生命周期边界', '能抽出和 UI 解耦的逻辑模块'],
    outcomes: ['能把搜索、分页、本地缓存、请求状态等逻辑抽成 composable', '能避免 composable 里偷偷依赖具体页面结构'],
    starterSteps: ['先找重复逻辑，不要先找重复模板', '明确 composable 接收什么参数、返回什么状态和方法', '保证 composable 不直接关心某个页面长什么样'],
    docs: [
      createDocSection(
        '什么样的逻辑值得抽成 composable',
        [
          '如果一段逻辑和具体模板无强绑定，并且未来会重复出现，就值得提炼。',
          '例如搜索关键字管理、分页状态、localStorage 同步、接口加载状态都是典型候选。',
          '相反，如果逻辑只服务于一个很局部的模板结构，先留在组件里通常更简单。',
        ],
      ),
      createDocSection(
        'composable 最重要的是边界清晰',
        [
          '一个好的 composable 要能说清楚输入、输出和副作用。',
          '输入通常是参数、响应式引用或配置对象；输出通常是状态、计算属性和方法。',
          '边界清晰以后，它才能在多个页面里复用，而不是只是把复杂度换个地方堆积。',
        ],
        undefined,
        [
          createCode(
            '搜索逻辑 composable',
            'ts',
            `import { computed, ref } from 'vue'

export function useKeywordFilter(items: string[]) {
  const keyword = ref('')
  const filteredItems = computed(() =>
    items.filter((item) => item.toLowerCase().includes(keyword.value.toLowerCase())),
  )

  return { keyword, filteredItems }
}`,
          ),
        ],
      ),
      createDocSection(
        '和 Python 工具函数的区别',
        [
          '普通工具函数只处理入参和返回值，而 composable 可以持有响应式状态和生命周期。',
          '因此它更像一个有状态的小模块，而不只是函数封装。',
          '这也是为什么 composable 要特别注意副作用和清理逻辑。',
        ],
      ),
      createDocSection(
        '避免把 composable 写成迷你框架',
        [
          '初学者容易把所有逻辑都抽进去，最后 composable 比页面还难懂。',
          '更稳妥的做法是一次只抽一类明确职责，例如过滤、分页、持久化、请求。',
          '先让 composable 好读，再谈它是否通用到极致。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch8-extract-filter',
        '练习 1：抽取章节搜索 composable',
        '把总览页或侧栏的搜索逻辑提炼为可复用模块。',
        ['src/composables/useChapterFilter.ts', 'src/views/OverviewView.vue'],
        ['定义关键词状态和筛选结果', '返回供组件消费的状态与方法', '让视图层只负责绑定输入和渲染结果'],
        ['功能保持正常', '视图代码更短更清楚'],
      ),
      createExercise(
        'ch8-extract-progress',
        '练习 2：抽取学习进度统计 composable',
        '把练习统计和测验统计从视图中剥离出来。',
        ['src/composables/useLearningProgress.ts', 'src/App.vue'],
        ['接收章节、完成记录和测验记录', '返回总进度和阶段进度', '在多个视图复用同一份计算结果'],
        ['多个页面展示一致', '视图中减少重复统计逻辑'],
      ),
      createExercise(
        'ch8-composable-review',
        '练习 3：审查现有 composable 的 API',
        '不是所有 composable 都需要重写，但需要学会判断 API 是否合理。',
        ['src/composables/useLocalStorage.ts'],
        ['写出它的输入、输出和副作用', '判断是否有命名或边界可以优化', '记录你的判断依据'],
        ['你能清楚说明这个 composable 的职责', '能指出至少一处可优化点'],
      ),
    ],
    milestone: '完成标准：你已经能把重复逻辑从页面里抽出，并且保持清晰边界。',
  },
  {
    id: 'chapter-9',
    order: 9,
    title: '第九章：表单处理、用户输入与数据校验',
    subtitle: '别把表单看成一堆输入框，它本质上是状态机',
    duration: '5 天',
    phase: 'core',
    summary: '表单是前端最典型的复杂交互之一。这一章聚焦输入同步、校验、错误提示、提交状态和可访问性。',
    goals: ['建立表单状态、错误状态和提交状态的清晰模型', '掌握基础校验、即时校验和提交校验的差异', '能设计对用户友好的错误反馈和禁用策略'],
    outcomes: ['能完成带校验规则的创建或编辑表单', '能把前端校验和后端校验分清职责'],
    starterSteps: ['先列出字段、默认值、错误信息和提交流程', '区分输入中、已触碰、可提交、提交中这些状态', '不要把校验逻辑散落在模板判断里'],
    docs: [
      createDocSection(
        '为什么表单容易失控',
        [
          '表单同时拥有字段值、格式校验、业务校验、提交流程和错误提示，状态远比静态展示复杂。',
          '如果没有明确模型，很容易出现按钮状态不对、错误提示闪烁、请求重复提交等问题。',
          '把表单看成一个状态机，会比把它看成很多输入框更有效。',
        ],
      ),
      createDocSection(
        '前端校验和后端校验的边界',
        [
          '前端校验主要负责即时反馈，例如必填、长度、格式和基础组合规则。',
          '后端校验负责最终可信规则，例如唯一性、权限、库存和业务约束。',
          '不要把前端校验当成安全手段，但也不要完全省略它，因为体验会很差。',
        ],
      ),
      createDocSection(
        '何时展示错误信息',
        [
          '错误提示太早会打断输入，太晚又会让用户迷失。',
          '常见策略是字段失焦后展示单字段错误，提交时统一展示整体错误。',
          '对复杂表单，建议结合已触碰状态和是否提交过状态决定提示时机。',
        ],
        undefined,
        [
          createCode(
            '字段校验骨架',
            'ts',
            `interface LoginForm {
  email: string
  password: string
}

function validate(form: LoginForm) {
  return {
    email: form.email ? '' : '请输入邮箱',
    password: form.password.length >= 8 ? '' : '密码至少 8 位',
  }
}`,
          ),
        ],
      ),
      createDocSection(
        '提交状态必须显式管理',
        [
          '提交中要不要禁用按钮、失败后是否保留输入、成功后是否重置，这些都需要明确。',
          '如果不显式维护 `submitting`、`success`、`error` 状态，就容易出现重复点击和状态错乱。',
          '表单是最适合练习状态设计的业务模块。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch9-login-form',
        '练习 1：做一个登录表单',
        '用最小业务场景练习输入、校验和提交状态。',
        ['src/views/ChapterView.vue', 'src/style.css'],
        ['包含邮箱和密码字段', '实现必填与最小长度校验', '提交时展示 loading 状态并禁用按钮'],
        ['无效输入无法提交', '提交中不能重复点击'],
      ),
      createExercise(
        'ch9-profile-form',
        '练习 2：做一个资料编辑表单',
        '练习多字段、分组校验和错误提示布局。',
        ['src/components/ExerciseCard.vue', 'src/style.css'],
        ['设计昵称、角色、个人简介三个字段', '分别处理即时校验和提交校验', '给出明确错误提示'],
        ['错误提示和字段一一对应', '通过校验后提交成功'],
      ),
      createExercise(
        'ch9-form-review',
        '练习 3：复盘现有输入交互',
        '把你做过的输入场景整理成状态图。',
        ['docs/LEARNING_PLAN.md'],
        ['选一个输入场景', '写出默认、输入中、校验失败、提交中、提交成功五个状态', '记录各状态之间如何切换'],
        ['状态图清楚', '你能口头解释切换条件'],
      ),
    ],
    milestone: '完成标准：你已经能把表单当成状态管理问题来设计，而不是只会绑定输入框。',
  },
  {
    id: 'chapter-10',
    order: 10,
    title: '第十章：视图管理与应用架构',
    subtitle: '从学习页面过渡到真实应用的页面组织方式',
    duration: '6 天',
    phase: 'architecture',
    summary: '这一章开始站到应用层看项目。重点是页面层次、路由分工、布局壳和功能模块边界。',
    goals: ['理解布局壳、页面视图和业务组件的分层', '知道何时引入路由，何时保留单页视图切换', '学会按功能模块组织前端目录'],
    outcomes: ['能规划一个带列表页、详情页、设置页的应用骨架', '能避免把业务逻辑和布局逻辑混在一起'],
    starterSteps: ['从当前学习平台抽象出哪些属于布局，哪些属于内容', '画出页面层级关系图', '按模块而不是按文件类型思考新增功能'],
    docs: [
      createDocSection(
        '先分层，再写页面',
        [
          '一个真实应用至少要区分布局壳、视图页面和可复用业务组件。',
          '布局壳关注导航和页面骨架，视图关注单页业务目标，组件关注局部功能块。',
          '如果三者混在一起，需求一变就会牵一大片。',
        ],
      ),
      createDocSection(
        '路由不是越早越好，但也不是越晚越好',
        [
          '当你的页面已经拥有独立的目标和 URL 价值时，就值得用路由管理。',
          '如果只是局部标签切换或单个工作台的视图切换，先用组件状态就够了。',
          '关键不是技术先进，而是边界是否清楚。',
        ],
        undefined,
        [
          createCode(
            '应用骨架示例',
            'ts',
            `src/
  layouts/
  views/
  components/
  composables/
  data/
  types/`,
          ),
        ],
      ),
      createDocSection(
        '从页面到模块的切分方式',
        [
          '按功能切分通常比按技术切分更稳定，例如 `users/`、`courses/`、`settings/`。',
          '因为真实需求通常是围绕业务模块变化，而不是只改所有组件或所有工具函数。',
          '学习项目里不一定要一次到位，但要开始具备这种组织意识。',
        ],
      ),
      createDocSection(
        '架构设计的标准不是抽象，而是可演进',
        [
          '如果一个结构让新增页面、替换数据源和增加权限逻辑都更容易，那它就是好结构。',
          '如果一个结构只是让命名更复杂、文件更多，但没有降低修改成本，那它就没价值。',
          '架构判断永远要回到后续演进成本上。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch10-app-map',
        '练习 1：画一个小型管理台的信息架构图',
        '在动手写代码前先练页面分层。',
        ['docs/LEARNING_PLAN.md'],
        ['选择一个熟悉业务，例如任务管理或用户管理', '画出列表、详情、设置和登录页面关系', '标出哪些是布局层、哪些是视图层、哪些是组件层'],
        ['层级关系清楚', '页面职责不互相混淆'],
      ),
      createExercise(
        'ch10-layout-refactor',
        '练习 2：重做当前课程总览的信息架构',
        '把课程总览从普通首页升级为阶段化课程门户。',
        ['src/views/OverviewView.vue', 'src/style.css'],
        ['区分英雄区、阶段路线、推荐行动和课程列表', '加强阶段分层和节奏感', '让 14 章内容在总览中仍然易扫读'],
        ['总览不再拥挤', '14 章信息仍然容易定位'],
      ),
      createExercise(
        'ch10-module-structure',
        '练习 3：为未来路由化提前调整目录',
        '先做结构准备，不急着全部上路由。',
        ['src/views', 'src/components', 'src/composables'],
        ['审查现有目录', '记录哪些模块未来会需要独立路由', '调整一个你觉得最混乱的结构点'],
        ['目录层次更符合业务心智', '后续扩展更自然'],
      ),
    ],
    milestone: '完成标准：你已经能站在应用层设计页面结构，而不是只盯单个组件。',
  },
  {
    id: 'chapter-11',
    order: 11,
    title: '第十一章：Vue Router 与多页面导航',
    subtitle: '让应用拥有真正的页面切换和 URL 管理',
    duration: '5 天',
    phase: 'architecture',
    summary: '这一章解决页面导航问题。当前学习平台用视图切换模拟页面跳转，真实应用需要 URL 驱动的路由系统。',
    goals: [
      '理解路由的本质：URL 和页面组件的映射关系',
      '掌握路由配置、动态路由参数和嵌套路由',
      '了解导航守卫的基本用法',
      '理解路由懒加载对性能的意义',
    ],
    outcomes: [
      '能为一个应用设计合理的路由结构',
      '能实现列表页到详情页的参数传递',
      '能解释当前项目的视图切换和真实路由的区别',
    ],
    starterSteps: [
      '先理解当前项目的视图切换是怎么做的',
      '安装 vue-router 并创建最小路由配置',
      '对比视图切换和路由切换的差异',
    ],
    docs: [
      createDocSection(
        '路由的本质是 URL 和组件的映射',
        [
          '单页应用只有一个 HTML 页面，但用户需要不同的 URL 对应不同的内容。',
          'Vue Router 的工作就是在 URL 变化时，自动显示对应的组件、隐藏其他组件。',
          '对 Python 开发者来说，可以类比 Django 的 URLconf，只是执行环境从服务端搬到了浏览器。',
        ],
        undefined,
        [
          createCode(
            '最小路由配置',
            'ts',
            `import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomePage.vue') },
    { path: '/chapters', component: () => import('./views/ChapterList.vue') },
    { path: '/chapters/:id', component: () => import('./views/ChapterDetail.vue') },
  ],
})`,
          ),
        ],
      ),
      createDocSection(
        '动态路由和路由参数',
        [
          '当页面内容由 ID 决定时（比如章节详情页），就需要动态路由。',
          '路径中的 `:id` 是参数占位符，组件内通过 `useRoute().params.id` 读取。',
          '这是列表页→详情页导航的核心机制，几乎所有管理类应用都会用到。',
        ],
        undefined,
        [
          createCode(
            '使用路由参数',
            'vue',
            `<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const chapterId = computed(() => route.params.id as string)
</script>`,
          ),
        ],
      ),
      createDocSection(
        '导航守卫：在跳转前后执行逻辑',
        [
          '有时候你需要在页面跳转前做检查，比如用户是否登录、表单是否保存。',
          '`beforeEach` 是全局守卫，每次跳转都会触发，适合做权限拦截。',
          '`beforeRouteLeave` 是组件级守卫，只在离开当前页面时触发，适合做未保存提醒。',
          '入门阶段不需要把守卫写得很复杂，但要知道它解决什么问题。',
        ],
      ),
      createDocSection(
        '路由懒加载和当前项目的对比',
        [
          '路由配置中使用 `() => import()` 语法，可以让组件在首次访问时才加载，减少首屏体积。',
          '当前学习平台用 `v-if` 切换视图，好处是简单、不需要引入路由库。',
          '当页面数量增多、需要浏览器前进后退、需要可分享 URL 时，就应该迁移到路由。',
          '迁移的过程本身就是一次很好的架构练习。',
        ],
        ['当前项目用 v-if 是合理的，因为页面少', '页面超过 5 个且有独立 URL 价值时就应该用路由'],
      ),
    ],
    exercises: [
      createExercise(
        'ch11-route-plan',
        '练习 1：为学习平台设计路由结构',
        '先在纸面上规划路由，不急着写代码。',
        ['docs/LEARNING_PLAN.md'],
        ['列出当前应用的所有页面', '为每个页面设计 URL 路径', '标出哪些页面需要参数、哪些需要嵌套'],
        ['路由结构清晰', 'URL 语义合理'],
      ),
      createExercise(
        'ch11-minimal-router',
        '练习 2：创建一个最小路由示例',
        '在独立分支或临时文件中实践路由基础。',
        ['src/router/index.ts（新建）', 'src/main.ts'],
        ['安装 vue-router', '创建路由配置，至少包含 3 个页面', '在 main.ts 中注册路由插件'],
        ['通过 URL 切换页面', '浏览器前进后退正常工作'],
      ),
      createExercise(
        'ch11-dynamic-route',
        '练习 3：实现列表页到详情页的参数传递',
        '练习动态路由参数的传递和使用。',
        ['src/router/index.ts', 'src/views/ChapterDetail.vue（新建）'],
        ['定义动态路由 /chapters/:id', '在列表页用 router-link 跳转', '在详情页读取参数并展示对应内容'],
        ['点击列表项跳转到正确详情', '刷新页面后内容仍然正确'],
      ),
    ],
    milestone: '完成标准：你能用 Vue Router 搭建一个多页面应用，并理解路由和视图切换的差异。',
  },
  {
    id: 'chapter-12',
    order: 12,
    title: '第十二章：HTTP 请求与异步数据流',
    subtitle: '让页面真正接入后端，而不是停留在静态数据',
    duration: '6 天',
    phase: 'architecture',
    summary: '这一章解决页面如何和后端对话。除了请求本身，更重要的是 loading、error、empty、retry 和缓存策略。',
    goals: ['理解请求生命周期和典型页面状态', '掌握接口封装、错误处理和重试的基本方式', '能设计异步数据的用户反馈'],
    outcomes: ['能写出列表加载、详情加载和提交请求的完整流程', '能把请求错误和业务错误区分开来'],
    starterSteps: ['先画出一个请求从发起到结束的状态流转', '明确哪些错误应该提示用户，哪些错误应该记录日志', '把网络层和页面层职责分开'],
    docs: [
      createDocSection(
        '请求不是拿到数据这么简单',
        [
          '真正的前端请求流程至少包含 idle、loading、success、empty、error 五类常见状态。',
          '如果页面只处理成功路径，真实业务中很快就会暴露大量体验问题。',
          '所以异步数据流的重点是状态管理，而不是只会 `fetch`。',
        ],
      ),
      createDocSection(
        '网络层应该统一收口',
        [
          '请求头、超时、基础错误转换、鉴权处理，这些逻辑最好集中在请求层，而不是散落在页面里。',
          '页面应该更关注我要拿什么数据和如何展示状态。',
          '请求层统一以后，后续换 axios 或新增鉴权逻辑都会容易很多。',
        ],
        undefined,
        [
          createCode(
            '请求封装骨架',
            'ts',
            `export async function http<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`)
  }

  return response.json() as Promise<T>
}`,
          ),
        ],
      ),
      createDocSection(
        '错误要分层处理',
        [
          '网络错误、权限错误、业务校验失败、空数据，这些情况不能用同一种提示糊过去。',
          '用户需要知道是自己填错了，还是系统暂时不可用，还是当前没有数据。',
          '你能否分层处理错误，基本决定了应用是否专业。',
        ],
      ),
      createDocSection(
        '异步状态和界面反馈要成对出现',
        [
          '有 loading 就该有 skeleton 或占位，有 error 就该有 retry，有 empty 就该有引导。',
          '这些不是锦上添花，而是异步页面的基本完成度。',
          '后端开发者转前端时，最容易忽略的就是这一层用户反馈。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch12-request-wrapper',
        '练习 1：封装一个最小请求函数',
        '目标不是造轮子，而是学会把重复逻辑收口。',
        ['src/data/courseContent.ts', 'src/composables/useLocalStorage.ts'],
        ['定义统一请求函数', '处理非 2xx 响应', '在页面中消费它并展示错误状态'],
        ['成功和失败路径都能跑通', '页面不会静默失败'],
      ),
      createExercise(
        'ch12-async-state',
        '练习 2：为一个列表设计 loading / empty / error 三态',
        '练习真正的异步 UI 完整度。',
        ['src/views/OverviewView.vue', 'src/style.css'],
        ['设计三种状态的文案和样式', '增加重试按钮', '确保状态切换不会互相覆盖'],
        ['三态都能独立展示', '重试行为可用'],
      ),
      createExercise(
        'ch12-api-compare',
        '练习 3：对比一个后端接口契约',
        '从你熟悉的后端接口出发设计前端消费模型。',
        ['docs/LEARNING_PLAN.md'],
        ['选一个分页接口', '列出成功响应、空列表和错误响应结构', '写出前端最小类型定义'],
        ['契约清楚', '能对应到前端页面状态'],
      ),
    ],
    milestone: '完成标准：你已经能把请求、状态和用户反馈完整串起来。',
  },
  {
    id: 'chapter-13',
    order: 13,
    title: '第十三章：状态管理与 Pinia',
    subtitle: '从"所有状态堆在 App.vue"到可维护的全局状态',
    duration: '4 天',
    phase: 'architecture',
    summary: '这一章解决跨组件状态共享问题。当前项目把所有状态集中在 App.vue，真实应用需要一个独立的状态管理层。',
    goals: [
      '理解为什么组件 props/events 不够用',
      '掌握 Pinia 的 store、getters 和 actions',
      '能把 App.vue 中的共享状态迁移到 store',
    ],
    outcomes: [
      '能设计合理的 store 结构',
      '能在多个组件中共享和修改同一份状态',
      '能解释什么状态适合放 store，什么状态适合留在组件内',
    ],
    starterSteps: [
      '先盘点 App.vue 中哪些状态被多个视图使用',
      '安装 Pinia 并创建第一个 store',
      '对比迁移前后的代码复杂度',
    ],
    docs: [
      createDocSection(
        '什么时候需要状态管理',
        [
          '当多个不相关的组件需要访问同一份数据时，props 逐层传递会变得非常繁琐。',
          '当前项目的 completedExercises、quizResults 等状态被多个视图消费，这就是典型的跨组件状态。',
          '状态管理的核心不是技术选型，而是判断哪些状态应该是全局的、哪些应该是局部的。',
        ],
        ['被多个视图消费的状态 → 全局 store', '只在单个组件内使用的状态 → 组件内部'],
      ),
      createDocSection(
        'Pinia 的三个核心概念',
        [
          '**State**：定义数据，相当于组件里的 `ref` 和 `reactive`。',
          '**Getters**：定义派生数据，相当于组件里的 `computed`。',
          '**Actions**：定义修改逻辑，可以包含异步操作，相当于组件里的方法。',
          '这三者和组件中的响应式系统一一对应，学习成本很低。',
        ],
        undefined,
        [
          createCode(
            '定义一个 Store',
            'ts',
            `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCourseStore = defineStore('course', () => {
  // state
  const completedExercises = ref<Record<string, boolean>>({})

  // getter
  const completedCount = computed(() =>
    Object.values(completedExercises.value).filter(Boolean).length,
  )

  // action
  function toggleExercise(id: string) {
    completedExercises.value[id] = !completedExercises.value[id]
  }

  return { completedExercises, completedCount, toggleExercise }
})`,
          ),
        ],
      ),
      createDocSection(
        '从 App.vue 迁移到 Store 的策略',
        [
          '不要试图一次性把所有状态都迁移，先选一个最简单的状态练手。',
          '迁移步骤：定义 store → 组件中引用 store → 移除 props/events → 验证功能不变。',
          '迁移后你会发现 App.vue 变瘦了，组件之间的依赖关系也更清晰。',
        ],
        ['先迁移最简单的状态', '逐步替换，每步验证'],
      ),
      createDocSection(
        'Store 和 localStorage 的配合',
        [
          'Pinia 默认不会持久化到 localStorage，页面刷新后状态会丢失。',
          '可以通过 Pinia 插件实现自动持久化，或者继续在组件中用 watch 同步。',
          '对于学习项目，保留现有的 useLocalStorage composable 并在 store 中使用它是最简单的方案。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch13-first-store',
        '练习 1：创建第一个 Pinia Store',
        '把练习完成状态从 App.vue 迁移到独立 store。',
        ['src/stores/courseStore.ts（新建）', 'src/main.ts'],
        ['安装 pinia 并在 main.ts 注册', '创建 store，把 completedExercises 搬进去', '在一个组件中使用 store 替代 props'],
        ['store 定义清楚', '组件通过 store 读写状态'],
      ),
      createExercise(
        'ch13-multi-component',
        '练习 2：让两个组件共享同一个 Store',
        '验证多个组件操作同一份状态时的同步效果。',
        ['src/stores/courseStore.ts', 'src/components/ExerciseCard.vue', 'src/components/AppHeader.vue'],
        ['在 ExerciseCard 中通过 store 标记完成', '在 AppHeader 中通过 store 读取进度', '验证一处修改另一处实时更新'],
        ['进度数据一致', '不通过 props 传递也能同步'],
      ),
      createExercise(
        'ch13-scope-review',
        '练习 3：判断状态应该放哪里',
        '培养状态归属的判断能力。',
        ['docs/LEARNING_PLAN.md'],
        ['列出 App.vue 中所有状态', '按全局/局部分类', '说明每个状态应该放 store 还是留在组件内'],
        ['分类依据清楚', '能解释为什么某些状态不适合全局化'],
      ),
    ],
    milestone: '完成标准：你能用 Pinia 管理跨组件状态，并且知道什么状态该放 store、什么该留在组件。',
  },
  {
    id: 'chapter-14',
    order: 14,
    title: '第十四章：TypeScript 在 Vue 中的高级应用',
    subtitle: '让类型真正参与组件契约、请求模型和业务状态设计',
    duration: '6 天',
    phase: 'architecture',
    summary: '这一章不是炫耀高级类型，而是把类型更深地用进组件 props、事件、请求结果和复杂状态里。',
    goals: ['强化 props、emit、泛型响应体和字面量状态约束', '理解类型缩小、判别联合和工具类型在 Vue 中的价值', '减少复杂页面中隐式 any 和空值问题'],
    outcomes: ['能为组件 API 设计更稳的类型契约', '能用判别联合建模复杂界面状态'],
    starterSteps: ['先审查现有组件有哪些参数和事件没有明确约束', '把请求结果和页面状态显式建模', '对复杂条件分支优先考虑判别联合'],
    docs: [
      createDocSection(
        '组件契约必须类型化',
        [
          '当组件越来越多时，props 和事件就是你的前端接口文档。',
          '如果这些边界不清楚，复用会越来越危险，调用方也容易猜错。',
          'Vue 3 + TypeScript 的优势之一，就是让这些契约在编码时就被约束。',
        ],
        undefined,
        [
          createCode(
            '带类型的事件定义',
            'ts',
            `const emit = defineEmits<{
  submit: [chapterId: string, score: number]
  retry: [chapterId: string]
}>()`,
          ),
        ],
      ),
      createDocSection(
        '判别联合适合页面状态',
        [
          '当一个页面状态不只是一个字符串，而是每种状态还附带不同数据时，判别联合非常好用。',
          '它能让你在不同分支里拿到更准确的类型，而不是处处判空。',
          '这在请求页、表单页和工作流页都非常常见。',
        ],
        undefined,
        [
          createCode(
            '页面状态建模',
            'ts',
            `type PageState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; items: string[] }`,
          ),
        ],
      ),
      createDocSection(
        '工具类型真正有用的地方',
        [
          '`Pick`、`Omit`、`Partial`、`Required` 等工具类型在处理表单草稿、更新接口和视图子集时非常实用。',
          '它们的价值是减少重复定义，而不是制造花哨写法。',
          '只在确实能降低维护成本时使用它们，效果最好。',
        ],
      ),
      createDocSection(
        '高级应用的标准不是复杂，而是更少歧义',
        [
          '如果类型写完以后，组件边界更清楚、重构更稳、补全更准确，那就是有效升级。',
          '如果只是让代码更难读，说明这次高级应用没有价值。',
          '判断标准永远是维护收益，而不是语法复杂度。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch14-typed-events',
        '练习 1：为核心组件补齐事件类型',
        '让交互边界更明确。',
        ['src/components/QuizPanel.vue', 'src/components/ChapterSidebar.vue'],
        ['审查 emit 定义', '去掉模糊类型和隐式 any', '验证调用侧提示是否更准确'],
        ['事件签名清楚', '调用处补全更可靠'],
      ),
      createExercise(
        'ch14-page-state',
        '练习 2：用判别联合重写一个页面状态',
        '不要只用字符串，给每种状态配上所需数据。',
        ['src/views/ResourcesView.vue'],
        ['定义 `loading`、`error`、`ready` 三类状态', '给错误状态附带 message', '给成功状态附带数据'],
        ['模板分支更清楚', '空值判断减少'],
      ),
      createExercise(
        'ch14-request-types',
        '练习 3：为一个分页接口设计泛型类型',
        '把数据契约和列表页面结合起来。',
        ['src/types/course.ts'],
        ['定义通用分页结果', '为章节或资源列表套用它', '说明这个泛型未来还能复用在哪'],
        ['类型定义可复用', '字段语义准确'],
      ),
    ],
    milestone: '完成标准：你已经能让类型参与组件契约和业务状态设计，而不是只给变量标注类型。',
  },
  {
    id: 'chapter-15',
    order: 15,
    title: '第十五章：样式工程化、设计系统与动效',
    subtitle: '把页面从能看提升到有秩序、有节奏、可复用',
    duration: '5 天',
    phase: 'production',
    summary: '这一章聚焦样式体系。重点是设计变量、层级、间距、排版和少量有意义的动效，而不是随意堆颜色。',
    goals: ['理解设计 token、组件状态样式和页面层级', '建立基础设计系统意识', '掌握有节制的过渡和动效'],
    outcomes: ['能设计一套统一的色彩、间距和圆角规则', '能让课程页面在移动端和桌面端都更稳定'],
    starterSteps: ['先从变量开始，不要先从零散类名开始', '统一颜色、阴影、圆角、间距和字号', '只保留有意义的动效，不要堆砌浮夸动画'],
    docs: [
      createDocSection(
        '为什么样式也需要架构',
        [
          '页面一旦变多，如果颜色、间距、字体和圆角没有统一规则，维护会越来越乱。',
          '样式工程化不是为了更漂亮的术语，而是为了减少重复、保持一致和支持扩展。',
          '当前课程页面的重设计，本质上就在做这件事。',
        ],
      ),
      createDocSection(
        '设计 token 是最小稳定层',
        [
          '把颜色、字号、间距、阴影抽成变量，是最容易立刻见效的做法。',
          '这样你改视觉方向时，不需要全项目到处搜值。',
          '对于学习项目，CSS 变量已经足够好用，不必先上复杂方案。',
        ],
        undefined,
        [
          createCode(
            '设计变量示例',
            'css',
            `:root {
  --color-ink: #112018;
  --color-surface: #f8f4ea;
  --color-accent: #1d7a5b;
  --space-4: 16px;
  --radius-lg: 20px;
}`,
          ),
        ],
      ),
      createDocSection(
        '层级感来自结构，不只来自阴影',
        [
          '真正的层级感来自留白、对比、排版节奏和信息分组，而不只是给卡片加更大的阴影。',
          '当课程内容从 6 章扩到 14 章后，信息层级是否清楚会直接决定可读性。',
          '所以样式设计要服务于信息架构，而不是独立存在。',
        ],
      ),
      createDocSection(
        '响应式布局优先解决阅读顺序',
        [
          '移动端不是把元素简单压成一列，而是重新考虑阅读顺序和交互密度。',
          '课程页尤其要注意侧栏、章节导航、代码块和长文本在窄屏上的表现。',
          '如果桌面端好看但手机上难以阅读，这个设计就还不完整。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch15-design-tokens',
        '练习 1：梳理一套页面设计变量',
        '先统一基础变量，再谈组件风格。',
        ['src/style.css'],
        ['归并颜色、字号、间距、圆角和阴影', '删除明显重复的硬编码值', '让按钮、卡片、标签共享同一套规则'],
        ['样式变量更统一', '重复值明显减少'],
      ),
      createExercise(
        'ch15-phase-visual',
        '练习 2：为四个阶段设计清晰视觉区分',
        '让用户一眼知道自己处在哪个阶段。',
        ['src/style.css', 'src/views/OverviewView.vue'],
        ['给阶段设置稳定颜色和背景语言', '保持整体一致而不是四套互相冲突的风格', '在总览和章节页同时体现阶段信息'],
        ['阶段识别度高', '整体视觉仍然统一'],
      ),
      createExercise(
        'ch15-mobile-review',
        '练习 3：专门检查移动端课程页',
        '移动端是课程类产品最容易忽视的阅读场景。',
        ['src/style.css'],
        ['检查章节侧栏、标签页、代码块和资源卡片', '调整拥挤区域', '确保按钮和输入区易点按'],
        ['移动端无明显布局破坏', '阅读顺序自然'],
      ),
    ],
    milestone: '完成标准：你已经能用设计变量和信息层级来组织样式，而不是只会零散调颜色。',
  },
  {
    id: 'chapter-16',
    order: 16,
    title: '第十六章：性能优化、测试与调试',
    subtitle: '会写还不够，还要会验证、会排错、会守住回归',
    duration: '7 天',
    phase: 'production',
    summary: '这一章让你补齐交付能力。重点不是追求极限优化，而是知道何时该测、测什么、怎么查性能和状态问题，以及如何用 vitest 写实际测试。',
    goals: [
      '建立基础性能分析和优化意识',
      '知道单元测试、组件测试和人工回归各自适用场景',
      '掌握常见的 Vue 调试路径',
      '能用 vitest 写基础的单元测试和组件测试',
    ],
    outcomes: ['能分析渲染过多、状态错乱、接口失败等问题', '能为关键逻辑设计最小验证策略'],
    starterSteps: ['先从最常见的性能问题和回归点开始', '用构建、控制台、网络面板和 Vue Devtools 组合排查', '不要一上来就追逐微优化'],
    docs: [
      createDocSection(
        '性能优化先看值不值得',
        [
          '如果页面本身没有卡顿、没有长列表、没有频繁重算，就不要先沉迷微优化。',
          '真正该优先关注的是不必要的重复渲染、过大的数据结构和阻塞式请求。',
          '优化应该基于观察和证据，而不是习惯性预优化。',
        ],
      ),
      createDocSection(
        '前端调试要建立固定路径',
        [
          '先看是否有报错，再看网络是否成功，再看状态是否变化，最后看模板是否正确消费了状态。',
          '这个顺序能帮你避免一上来就怀疑框架。',
          'Vue Devtools、浏览器 Network 面板和控制台日志是最常用三件套。',
        ],
      ),
      createDocSection(
        '测试策略要贴合风险点',
        [
          '不是所有学习项目都要马上补全自动化测试，但关键逻辑必须有验证方式。',
          '对当前项目来说，构建检查、关键交互手测、章节切换、测验得分和持久化都属于高风险点。',
          '先守住高风险路径，比追求测试数量更重要。',
        ],
        undefined,
        [
          createCode(
            '最小验证清单',
            'bash',
            `npm run build
# 然后手动检查：
# 1. 章节切换
# 2. 练习勾选持久化
# 3. 测验提交与重做
# 4. 资源页和总览页显示`,
          ),
        ],
      ),
      createDocSection(
        '会复盘，比会修一个 bug 更重要',
        [
          '每解决一个问题，都要总结它是数据问题、模板问题、样式问题还是架构问题。',
          '这种分类能力会让你以后排错越来越快。',
          '成熟开发者和新手的差距，很多时候不在于有没有遇到 bug，而在于有没有形成复盘模型。',
        ],
      ),
      createDocSection(
        '用 vitest 写实际的自动化测试',
        [
          '学习项目虽然不大，但核心逻辑（进度统计、状态持久化、筛选计算）完全值得写测试保护。',
          'vitest 是 Vite 生态的标准测试框架，配置简单、执行快速，和项目现有的构建体系无缝衔接。',
          '入门阶段不需要追求覆盖率，但至少要为核心 composable 和工具函数写几个测试。',
        ],
        ['先测纯函数和 composable，再考虑组件测试', '测试命名用"当...时应该..."的格式'],
        [
          createCode(
            'vitest 测试示例',
            'ts',
            `import { describe, it, expect } from 'vitest'

describe('进度计算', () => {
  it('当没有完成任何练习时，进度应为 0%', () => {
    const progress = calculateProgress(0, 14)
    expect(progress).toBe(0)
  })

  it('当完成一半练习时，进度应为 50%', () => {
    const progress = calculateProgress(7, 14)
    expect(progress).toBe(50)
  })
})`,
          ),
        ],
      ),
      createDocSection(
        '测试 composable 的基本方式',
        [
          'composable 是最容易测试的部分，因为它们通常不依赖 DOM。',
          '在测试中通过 `setup` 辅助函数创建响应式上下文，然后断言返回值的计算结果。',
          '这是投入产出比最高的测试类型，优先覆盖所有 composable。',
        ],
        undefined,
        [
          createCode(
            '测试 useLocalStorage composable',
            'ts',
            `import { describe, it, expect, beforeEach } from 'vitest'

beforeEach(() => {
  localStorage.clear()
})

it('应该使用初始值', () => {
  const { data } = useLocalStorage('test-key', '默认值')
  expect(data.value).toBe('默认值')
})`,
          ),
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch16-debug-flow',
        '练习 1：写出你的固定排错路径',
        '把模糊经验固化成可执行步骤。',
        ['docs/LEARNING_PLAN.md'],
        ['选一个你遇到过的前端问题', '写出排查顺序', '说明每一步看什么信息'],
        ['路径可执行', '不是停留在“多试试”层面'],
      ),
      createExercise(
        'ch16-regression-check',
        '练习 2：整理课程平台的关键回归清单',
        '把重要交互列出来，防止改版后无声回归。',
        ['TODO.md'],
        ['列出本项目最重要的 6 到 8 个交互', '按风险排序', '给出每项的最小验证方法'],
        ['清单覆盖核心路径', '每项都可验证'],
      ),
      createExercise(
        'ch16-perf-review',
        '练习 3：检查一个可能的过度渲染点',
        '练习从结构角度看性能。',
        ['src/views/OverviewView.vue', 'src/views/ChapterView.vue'],
        ['选一个复杂视图', '找出可能重复计算或重复渲染的区域', '记录你会如何优化以及为什么'],
        ['结论有依据', '不是拍脑袋优化'],
      ),
      createExercise(
        'ch16-vitest-setup',
        '练习 4：安装 vitest 并写第一个测试',
        '动手搭建测试环境，为核心计算逻辑写测试。',
        ['vitest.config.ts（新建）', 'src/composables/__tests__/useLocalStorage.test.ts（新建）'],
        ['安装 vitest', '配置 vitest.config.ts', '为 useLocalStorage composable 写至少 2 个测试用例'],
        ['测试运行通过', '能解释每个测试在验证什么'],
      ),
    ],
    milestone: '完成标准：你具备基本的验证、排错和性能判断能力，并能为核心逻辑写自动化测试。',
  },
  {
    id: 'chapter-17',
    order: 17,
    title: '第十七章：项目实战，构建完整的前端应用',
    subtitle: '把前面十三章的知识收束到一个可展示、可交付的作品',
    duration: '10 天',
    phase: 'production',
    summary: '最后一章是综合实战。目标不是再学新 API，而是把浏览器基础、Vue、类型、表单、请求、结构、样式和验证完整串起来。',
    goals: ['完成一个有明确业务目标的前端作品', '能够说明项目结构、数据流、关键组件和技术决策', '形成自己的项目复盘和下一步升级计划'],
    outcomes: ['拿得出一个可运行、可讲解、可继续扩展的 Vue 3 项目', '能把我会写一些页面提升为我能交付一个完整小项目'],
    starterSteps: ['选一个你熟悉的后端业务场景作为题目', '先写需求范围和页面地图，再开工', '每完成一块就做一次小复盘，而不是最后一起返工'],
    docs: [
      createDocSection(
        '选题比技术更重要',
        [
          '最佳选题是你熟悉业务但不熟悉前端实现的场景，例如用户管理、任务看板、内容后台或工单系统。',
          '这样你不会被业务理解拖慢，可以把精力放在前端建模和页面交付上。',
          '项目实战最怕的是题目太大或太空泛。',
        ],
      ),
      createDocSection(
        '项目最小闭环应该包含什么',
        [
          '至少要有一个列表页、一个详情或编辑页、一套基础表单、一次异步请求和一套统一视觉语言。',
          '如果还能补上登录态、过滤器、空状态和错误反馈，完成度会明显更高。',
          '闭环比功能数量重要，因为它更能体现你是否掌握完整流程。',
        ],
        undefined,
        [
          createCode(
            '实战交付清单',
            'bash',
            `1. 明确页面地图
2. 设计数据模型
3. 拆布局和视图
4. 接入表单与请求
5. 完成样式和状态反馈
6. 构建验证并复盘`,
          ),
        ],
      ),
      createDocSection(
        '如何讲清楚你的项目',
        [
          '能讲清楚项目结构、核心模块、数据流和技术取舍，比只展示界面更有说服力。',
          '尤其对于从 Python 后端转前端的人，讲清为什么这样组织页面和状态会很加分。',
          '这也是求职和团队协作中真正会被追问的部分。',
        ],
      ),
      createDocSection(
        '构建产物和部署基础',
        [
          '`npm run build` 会生成 `dist/` 目录，里面是优化后的静态文件（HTML、JS、CSS）。',
          '部署就是把 `dist/` 目录放到 Web 服务器上。常见选择：Nginx、Vercel、Netlify、GitHub Pages。',
          '环境变量（`.env` 文件）用于区分开发和生产环境，`VITE_` 前缀的变量会被注入到前端代码中。',
          '对 Python 开发者来说，这相当于 Django 的 `collectstatic` + WSGI 部署，只是前端更简单。',
        ],
        undefined,
        [
          createCode(
            '部署前检查清单',
            'bash',
            `# 1. 确认构建成功
npm run build

# 2. 本地预览构建产物
npm run preview

# 3. 环境变量（如有）
# .env.production
VITE_API_BASE=https://api.example.com`,
          ),
        ],
      ),
      createDocSection(
        '课程终点其实是新起点',
        [
          '完成这套课程后，你不会立刻变成资深前端，但你已经拥有独立交付小型 Vue 项目的能力框架。',
          '接下来最有价值的事情不是再刷十套教程，而是持续做真实场景项目。',
          '真正的能力会在项目复用、重构和迭代里被打磨出来。',
        ],
      ),
    ],
    exercises: [
      createExercise(
        'ch17-project-scope',
        '练习 1：定义你的实战项目范围',
        '控制范围是项目成功的一半。',
        ['docs/LEARNING_PLAN.md'],
        ['写出项目名称、目标用户和核心页面', '限定第一版只做最小闭环', '明确哪些需求暂时不做'],
        ['项目目标清楚', '范围没有失控'],
      ),
      createExercise(
        'ch17-build-demo',
        '练习 2：完成一个可演示版本',
        '不是做完所有想法，而是先交付一个能演示的版本。',
        ['src/App.vue', 'src/views', 'src/components', 'src/style.css'],
        ['完成核心流程', '补齐 loading、error 和空状态', '确保移动端和桌面端都可用'],
        ['项目可运行可讲解', '核心流程完整'],
      ),
      createExercise(
        'ch17-retro',
        '练习 3：写最终复盘',
        '把课程学习沉淀成自己的方法论。',
        ['README.md'],
        ['记录你做了什么项目', '总结三点做对的地方和三点要改进的地方', '写出下一步准备补强的方向'],
        ['复盘具体', '对后续学习有指导价值'],
      ),
    ],
    milestone: '完成标准：你能交付一个完整小项目，并清楚解释自己的结构设计、数据流和技术选择。',
  },
]

export const learningResources: LearningResource[] = [
  {
    type: '官方文档',
    name: 'Vue 官方文档',
    note: '优先阅读 Essentials、Reactivity Fundamentals、Component Basics 和 Best Practices，读完马上回到当前项目做最小实验。',
    link: 'https://vuejs.org/',
  },
  {
    type: '官方文档',
    name: 'TypeScript Handbook',
    note: '重点看 Everyday Types、Narrowing、More on Functions、Generics，不必一开始全读完。',
    link: 'https://www.typescriptlang.org/docs/',
  },
  {
    type: '基础参考',
    name: 'MDN Web Docs',
    note: '遇到 DOM、事件、Fetch、CSS 布局和表单行为问题时，优先查 MDN，而不是先搜零散博客。',
    link: 'https://developer.mozilla.org/',
  },
  {
    type: '调试工具',
    name: 'Vue Devtools',
    note: '用来观察组件树、props、事件和响应式状态，是 Vue 排错效率提升最明显的工具之一。',
    link: 'https://devtools.vuejs.org/',
  },
  {
    type: '视频课程',
    name: 'Vue Mastery 免费基础资源',
    note: '适合在卡住某个 Vue 概念时找一个短视频快速建立直觉，但不要替代动手练习。',
    link: 'https://www.vuemastery.com/',
  },
  {
    type: '工程实践',
    name: 'Vite 官方文档',
    note: '重点看 Guide、Features 和 Build，理解开发服务器、环境变量和构建产物。',
    link: 'https://vite.dev/guide/',
  },
  {
    type: '样式系统',
    name: 'Every Layout',
    note: '当你想补布局能力时，这套资源非常适合建立用约束组织页面的思维。',
    link: 'https://every-layout.dev/',
  },
  {
    type: '练习建议',
    name: '自己的学习笔记',
    note: '每章都记录今天做了什么、理解了什么、哪里还不稳定、下一步准备改什么，它比收藏更多链接更有价值。',
    link: 'https://developer.mozilla.org/zh-CN/docs/Learn',
  },
  {
    type: '接口协作',
    name: 'HTTP 状态码与 REST 设计参考',
    note: '适合把你熟悉的后端接口经验映射到前端错误处理和状态反馈上。',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
  },
]
