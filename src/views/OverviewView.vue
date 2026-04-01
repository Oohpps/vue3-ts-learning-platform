<script setup lang="ts">
import { computed } from 'vue'
import type { CourseChapter, LearningPhaseMeta, QuizResult } from '../types/course'

const props = defineProps<{
  chapters: CourseChapter[]
  phases: LearningPhaseMeta[]
  completedExercises: Record<string, boolean>
  quizResults: Record<string, QuizResult>
  completedExerciseCount: number
  totalExerciseCount: number
  passedQuizCount: number
  totalQuizCount: number
}>()

const emit = defineEmits<{
  openChapter: [chapterId: string]
}>()

const nextChapter = computed(
  () =>
    props.chapters.find((chapter) =>
      chapter.exercises.some((exercise) => !props.completedExercises[exercise.id]),
    ) ?? props.chapters[0],
)

const phaseCards = computed(() =>
  props.phases.map((phase) => {
    const chapters = props.chapters.filter((chapter) => chapter.phase === phase.id)
    const totalExercises = chapters.reduce((sum, chapter) => sum + chapter.exercises.length, 0)
    const completed = chapters.reduce(
      (sum, chapter) =>
        sum + chapter.exercises.filter((exercise) => props.completedExercises[exercise.id]).length,
      0,
    )

    return {
      ...phase,
      chapters,
      completed,
      totalExercises,
    }
  }),
)
</script>

<template>
  <section class="view-stack overview-page">
    <section class="overview-hero">
      <div class="hero-copy">
        <p class="hero-kicker">17 Chapters · 4 Phases · Zero to Production</p>
        <h1>Vue 3 + TypeScript 交互式学习平台</h1>
        <p>
          这不是零散教程集合，而是一条完整学习路线。你会从浏览器和状态驱动视图开始，一路走到组件复用、异步数据流、样式系统和项目实战。
        </p>

        <div class="hero-actions">
          <button class="secondary-button" type="button" @click="emit('openChapter', nextChapter.id)">
            从 {{ nextChapter.title }} 开始
          </button>
        </div>
      </div>

      <div class="hero-metrics">
        <article class="metric-card">
          <strong>{{ chapters.length }}</strong>
          <span>课程章节</span>
        </article>
        <article class="metric-card">
          <strong>{{ completedExerciseCount }}/{{ totalExerciseCount }}</strong>
          <span>练习完成</span>
        </article>
        <article class="metric-card">
          <strong>{{ passedQuizCount }}/{{ totalQuizCount }}</strong>
          <span>测验通过</span>
        </article>
      </div>
    </section>

    <section class="panel overview-focus">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">Course Frame</p>
          <h2>先看整条学习路线，再进入单章细读</h2>
        </div>
        <p class="helper-copy">推荐顺序：基础入门 → 核心机制 → 应用架构 → 生产落地</p>
      </div>

      <div class="phase-roadmap">
        <article
          v-for="phase in phaseCards"
          :key="phase.id"
          class="phase-card"
          :class="'phase-' + phase.id"
        >
          <span class="phase-badge" :class="phase.id">{{ phase.chapterRange }}</span>
          <h3>{{ phase.title }}</h3>
          <p class="phase-focus">{{ phase.focus }}</p>
          <p class="workspace-summary">{{ phase.description }}</p>
          <div class="phase-progress-line">
            <span>{{ phase.completed }}/{{ phase.totalExercises }} 练习</span>
            <span>{{ phase.chapters.length }} 章</span>
          </div>
        </article>
      </div>
    </section>

    <section class="summary-grid">
      <article class="panel runway-card">
        <p class="section-kicker">Current Runway</p>
        <h2>下一步建议</h2>
        <p class="workspace-summary">
          当前最推荐进入的是 <strong>{{ nextChapter.title }}</strong>。它会继续沿着课程节奏推进，不会让你跳过关键基础。
        </p>
        <button class="secondary-button" type="button" @click="emit('openChapter', nextChapter.id)">
          打开章节
        </button>
      </article>

      <article class="panel runway-card muted">
        <p class="section-kicker">Study Method</p>
        <h2>推荐使用方式</h2>
        <ul class="simple-list">
          <li>先看本章目标和完成标准，再读学习内容。</li>
          <li>每章至少完成 2 个练习，再做章节测验。</li>
          <li>测验和笔记都只是反馈手段，真正的掌握来自动手改项目。</li>
        </ul>
      </article>
    </section>

    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">All Chapters</p>
          <h2>按章节进入课程</h2>
        </div>
      </div>

      <div class="chapter-preview-grid">
        <article
          v-for="chapter in chapters"
          :key="chapter.id"
          class="chapter-preview-card"
          :class="'phase-' + chapter.phase"
        >
          <p class="chapter-order" :class="'phase-' + chapter.phase">
            Chapter {{ chapter.order }} · {{ chapter.duration }}
          </p>
          <h3>{{ chapter.title }}</h3>
          <p class="workspace-summary">{{ chapter.summary }}</p>
          <ul class="simple-list">
            <li v-for="goal in chapter.goals.slice(0, 2)" :key="goal">{{ goal }}</li>
          </ul>
          <button class="secondary-button outline" type="button" @click="emit('openChapter', chapter.id)">
            进入本章
          </button>
        </article>
      </div>
    </section>
  </section>
</template>
