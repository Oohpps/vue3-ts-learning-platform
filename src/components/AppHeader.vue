<script setup lang="ts">
import type { AppView } from '../types/course'

defineProps<{
  activeView: AppView
  completedExerciseCount: number
  totalExerciseCount: number
}>()

const emit = defineEmits<{
  navigate: [view: AppView]
}>()

const navItems: Array<{ id: AppView; label: string }> = [
  { id: 'overview', label: '学习总览' },
  { id: 'chapter', label: '章节学习' },
  { id: 'resources', label: '学习资料' },
]
</script>

<template>
  <header class="top-bar">
    <div class="top-bar-inner">
      <div class="brand">
        <span class="brand-icon">V</span>
        <span class="brand-title">Vue 3 + TS 学习台</span>
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
          {{ item.label }}
        </button>
      </nav>
      <div class="progress-badge">
        {{ completedExerciseCount }} / {{ totalExerciseCount }} 已完成
      </div>
    </div>
  </header>
</template>
