<script setup lang="ts">
import { computed } from 'vue'
import type { CourseChapter, LearningPhaseMeta, QuizResult } from '../types/course'

const props = defineProps<{
  chapters: CourseChapter[]
  phases: LearningPhaseMeta[]
  selectedChapterId: string
  completedExercises: Record<string, boolean>
  quizResults: Record<string, QuizResult>
}>()

const emit = defineEmits<{
  select: [chapterId: string]
}>()

const groupedPhases = computed(() =>
  props.phases.map((phase) => {
    const chapters = props.chapters.filter((chapter) => chapter.phase === phase.id)
    const completed = chapters.reduce(
      (total, chapter) =>
        total + chapter.exercises.filter((exercise) => props.completedExercises[exercise.id]).length,
      0,
    )
    const total = chapters.reduce((sum, chapter) => sum + chapter.exercises.length, 0)

    return {
      ...phase,
      chapters,
      completed,
      total,
    }
  }),
)

function getQuizStatus(chapterId: string): 'passed' | 'failed' | null {
  const result = props.quizResults[chapterId]
  if (!result) return null
  return result.score >= 70 ? 'passed' : 'failed'
}
</script>

<template>
  <aside class="panel chapter-panel">
    <div class="panel-heading compact">
      <div>
        <p class="section-kicker">Navigator</p>
        <h2>章节导航</h2>
      </div>
      <p class="helper-copy">按阶段浏览 14 章内容</p>
    </div>

    <div class="chapter-list grouped">
      <section v-for="phase in groupedPhases" :key="phase.id" class="phase-group">
        <div class="phase-group-head">
          <span class="phase-badge" :class="phase.id">{{ phase.title }}</span>
          <small>{{ phase.completed }}/{{ phase.total }}</small>
        </div>

        <button
          v-for="chapter in phase.chapters"
          :key="chapter.id"
          class="chapter-button"
          :class="[{ selected: chapter.id === selectedChapterId }, 'phase-' + chapter.phase]"
          type="button"
          @click="emit('select', chapter.id)"
        >
          <span class="chapter-order" :class="'phase-' + chapter.phase">Chapter {{ chapter.order }}</span>
          <strong>{{ chapter.title }}</strong>
          <span class="chapter-subtitle">{{ chapter.subtitle }}</span>
          <div class="chapter-progress-dots">
            <span
              v-for="exercise in chapter.exercises"
              :key="exercise.id"
              class="progress-dot"
              :class="{ done: completedExercises[exercise.id] }"
            />
            <span
              v-if="getQuizStatus(chapter.id)"
              class="progress-dot quiz-dot"
              :class="getQuizStatus(chapter.id)"
            />
          </div>
        </button>
      </section>
    </div>
  </aside>
</template>
