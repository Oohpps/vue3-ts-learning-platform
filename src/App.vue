<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import ChapterSidebar from './components/ChapterSidebar.vue'
import { useLocalStorage } from './composables/useLocalStorage'
import { courseChapters, learningResources } from './data/courseContent'
import type { AppView } from './types/course'
import ChapterView from './views/ChapterView.vue'
import OverviewView from './views/OverviewView.vue'
import ResourcesView from './views/ResourcesView.vue'

type ActiveTab = 'goals' | 'docs' | 'exercises'

const activeView = useLocalStorage<AppView>('learning-active-view', 'overview')
const activeChapterId = useLocalStorage<string>('learning-active-chapter', courseChapters[0].id)
const activeTab = useLocalStorage<ActiveTab>('learning-active-tab', 'goals')
const completedExercises = useLocalStorage<Record<string, boolean>>('learning-completed-exercises', {})
const chapterNotes = useLocalStorage<Record<string, string>>('learning-chapter-notes', {})

const selectedChapter = computed(
  () => courseChapters.find((chapter) => chapter.id === activeChapterId.value) ?? courseChapters[0],
)

const totalExerciseCount = computed(() =>
  courseChapters.reduce((total, chapter) => total + chapter.exercises.length, 0),
)

const completedExerciseCount = computed(
  () => Object.values(completedExercises.value).filter(Boolean).length,
)

function setActiveView(view: AppView) {
  activeView.value = view
}

function openChapter(chapterId: string) {
  activeChapterId.value = chapterId
  activeView.value = 'chapter'
  activeTab.value = 'goals'
}

function toggleExercise(exerciseId: string) {
  completedExercises.value = {
    ...completedExercises.value,
    [exerciseId]: !completedExercises.value[exerciseId],
  }
}

function updateChapterNote(value: string) {
  chapterNotes.value = {
    ...chapterNotes.value,
    [selectedChapter.value.id]: value,
  }
}

function exportProgress() {
  const data = {
    completedExercises: completedExercises.value,
    chapterNotes: chapterNotes.value,
    exportedAt: new Date().toISOString(),
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `vue-learning-progress.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function importProgress(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string)
      if (data.completedExercises && typeof data.completedExercises === 'object') {
        completedExercises.value = data.completedExercises
      }
      if (data.chapterNotes && typeof data.chapterNotes === 'object') {
        chapterNotes.value = data.chapterNotes
      }
    } catch {
      alert('导入失败：文件格式不正确，请选择之前导出的 JSON 文件。')
    }
  }
  reader.readAsText(file)
  input.value = ''
}
</script>

<template>
  <div class="app-shell">
    <AppHeader
      :active-view="activeView"
      :completed-exercise-count="completedExerciseCount"
      :total-exercise-count="totalExerciseCount"
      @navigate="setActiveView"
    />

    <main v-if="activeView === 'chapter'" class="chapter-layout">
      <ChapterSidebar
        :chapters="courseChapters"
        :selected-chapter-id="activeChapterId"
        :completed-exercises="completedExercises"
        @select="openChapter"
      />
      <ChapterView
        :chapter="selectedChapter"
        :active-tab="activeTab"
        :completed-exercises="completedExercises"
        :chapter-notes="chapterNotes"
        @change-tab="activeTab = $event"
        @toggle-exercise="toggleExercise"
        @update-note="updateChapterNote"
      />
    </main>

    <main v-else class="main-content">
      <OverviewView
        v-if="activeView === 'overview'"
        :chapters="courseChapters"
        :completed-exercise-count="completedExerciseCount"
        :total-exercise-count="totalExerciseCount"
        @open-chapter="openChapter"
        @export-progress="exportProgress"
        @import-progress="importProgress"
      />
      <ResourcesView v-else :resources="learningResources" />
    </main>
  </div>
</template>
