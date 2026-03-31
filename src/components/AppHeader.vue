<script setup lang="ts">
import type { AppView } from '../types/course'

defineProps<{
  activeView: AppView
  completedExerciseCount: number
  totalExerciseCount: number
  overallProgress: number
}>()

const emit = defineEmits<{
  navigate: [view: AppView]
}>()

const navItems: Array<{ id: AppView; label: string; note: string }> = [
  { id: 'overview', label: '课程总览', note: '看路线和阶段' },
  { id: 'chapter', label: '章节学习', note: '进入当前章节' },
  { id: 'resources', label: '学习资源', note: '查文档和外部资料' },
]
</script>

<template>
  <header class="top-bar">
    <div class="top-bar-inner">
      <div class="brand">
        <span class="brand-icon">V3</span>
        <div>
          <p class="brand-kicker">Frontend Learning System</p>
          <strong class="brand-title">Vue 3 + TypeScript 课程</strong>
        </div>
      </div>

      <nav class="main-nav">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav-link"
          :class="{ active: item.id === activeView }"
          type="button"
          @click="emit('navigate', item.id)"
        >
          <span>{{ item.label }}</span>
          <small>{{ item.note }}</small>
        </button>
      </nav>

      <div class="progress-badge">
        <strong>{{ overallProgress }}%</strong>
        <span>{{ completedExerciseCount }} / {{ totalExerciseCount }} 练习</span>
      </div>
    </div>

    <div class="top-progress">
      <div class="top-progress-fill" :style="{ width: overallProgress + '%' }" />
    </div>
  </header>
</template>
