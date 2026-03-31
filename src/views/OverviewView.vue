<script setup lang="ts">
import { ref } from 'vue'
import type { CourseChapter } from '../types/course'

defineProps<{
  chapters: CourseChapter[]
  completedExerciseCount: number
  totalExerciseCount: number
}>()

const emit = defineEmits<{
  openChapter: [chapterId: string]
  exportProgress: []
  importProgress: [event: Event]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
</script>

<template>
  <section class="view-stack">
    <section class="overview-hero">
      <div>
        <h1>从零开始的 Vue 3 + TypeScript 学习台</h1>
        <p>
          先建立页面、数据、交互之间的基本认知，再逐步进入类型、响应式和组件拆分。每一章都配有可直接在当前项目中完成的练习。
        </p>
      </div>
      <div class="overview-stats">
        <div class="stat-item">
          <strong>{{ chapters.length }}</strong>
          <span>个学习章节</span>
        </div>
        <div class="stat-item">
          <strong>{{ completedExerciseCount }}/{{ totalExerciseCount }}</strong>
          <span>已完成练习</span>
        </div>
        <div class="stat-item">
          <strong>6 周</strong>
          <span>建议节奏</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">Overview</p>
          <h2>先知道现在应该学什么</h2>
        </div>
      </div>

      <div class="summary-grid">
        <article class="info-card highlight-card">
          <p class="card-label">当前目标</p>
          <h3>先看懂页面结构，再进入交互和组件</h3>
          <p class="workspace-summary">
            如果你是刚接触前端的新手，最重要的不是一下子学很多，而是让“页面结果”和“代码位置”
            能稳定对应起来。
          </p>
        </article>

        <article class="info-card stat-card">
          <p class="card-label">练习完成度</p>
          <strong>{{ completedExerciseCount }}/{{ totalExerciseCount }}</strong>
          <p class="workspace-summary">建议每完成一章，就回到项目里至少做 2 个最小练习。</p>
          <div class="progress-actions">
            <button class="secondary-button" type="button" @click="emit('exportProgress')">
              导出进度
            </button>
            <button class="secondary-button" type="button" @click="fileInput?.click()">
              导入进度
            </button>
            <input
              ref="fileInput"
              type="file"
              accept=".json"
              style="display: none"
              @change="emit('importProgress', $event)"
            />
          </div>
        </article>
      </div>

      <div class="starter-grid">
        <article class="info-card">
          <h3>新手建议的操作顺序</h3>
          <ol class="ordered-list">
            <li>先运行项目，确认你能看到页面并理解入口文件位置。</li>
            <li>一次只改一个点，建立代码和页面结果的联系。</li>
            <li>每章结束后写一句笔记：我今天真正理解了什么。</li>
          </ol>
        </article>

        <article class="info-card">
          <h3>这套学习台如何使用</h3>
          <ul class="simple-list">
            <li>在”章节学习”里逐章阅读目标、正文和练习。</li>
            <li>在”学习资料”里控制资料范围，不要同时开太多教程。</li>
            <li>所有练习进度和笔记自动保存在浏览器本地。</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">Chapters</p>
          <h2>章节预览</h2>
        </div>
      </div>

      <div class="chapter-preview-grid">
        <article v-for="chapter in chapters" :key="chapter.id" class="info-card chapter-preview-card">
          <p class="chapter-order">Chapter {{ chapter.order }} · {{ chapter.duration }}</p>
          <h3>{{ chapter.title }}</h3>
          <p class="workspace-summary">{{ chapter.summary }}</p>
          <ul class="simple-list">
            <li v-for="goal in chapter.goals.slice(0, 2)" :key="goal">{{ goal }}</li>
          </ul>
          <button class="secondary-button" type="button" @click="emit('openChapter', chapter.id)">
            进入本章
          </button>
        </article>
      </div>
    </section>
  </section>
</template>
