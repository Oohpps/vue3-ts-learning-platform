<script setup lang="ts">
import type { CourseChapter } from '../types/course'

defineProps<{
  chapters: CourseChapter[]
  selectedChapterId: string
  completedExercises: Record<string, boolean>
}>()

const emit = defineEmits<{
  select: [chapterId: string]
}>()

function chapterDoneCount(chapter: CourseChapter, completedExercises: Record<string, boolean>) {
  return chapter.exercises.filter((exercise) => completedExercises[exercise.id]).length
}
</script>

<template>
  <aside class="panel chapter-panel">
    <div class="panel-heading">
      <div>
        <p class="section-kicker">Chapters</p>
        <h2>章节导航</h2>
      </div>
    </div>

    <div class="chapter-list">
      <button
        v-for="chapter in chapters"
        :key="chapter.id"
        class="chapter-button"
        :class="{ selected: chapter.id === selectedChapterId }"
        type="button"
        @click="emit('select', chapter.id)"
      >
        <span class="chapter-order">Chapter {{ chapter.order }}</span>
        <strong>{{ chapter.title }}</strong>
        <span class="chapter-subtitle">{{ chapter.subtitle }}</span>
        <span class="chapter-progress">
          {{ chapterDoneCount(chapter, completedExercises) }}/{{ chapter.exercises.length }} 个练习已完成
        </span>
      </button>
    </div>
  </aside>
</template>
