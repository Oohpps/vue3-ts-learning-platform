<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import ChapterSidebar from './components/ChapterSidebar.vue'
import { useLocalStorage } from './composables/useLocalStorage'
import { courseChapters, learningPhases, learningResources } from './data/courseContent'
import { chapterQuizzes } from './data/quizContent'
import type { AppView, QuizResult } from './types/course'
import ChapterView from './views/ChapterView.vue'
import OverviewView from './views/OverviewView.vue'
import ResourcesView from './views/ResourcesView.vue'

type ActiveTab = 'goals' | 'docs' | 'exercises' | 'quiz'

const activeView = useLocalStorage<AppView>('learning-active-view', 'overview')
const activeChapterId = useLocalStorage<string>('learning-active-chapter', courseChapters[0].id)
const activeTab = useLocalStorage<ActiveTab>('learning-active-tab', 'goals')
const completedExercises = useLocalStorage<Record<string, boolean>>('learning-completed-exercises', {})
const chapterNotes = useLocalStorage<Record<string, string>>('learning-chapter-notes', {})
const quizResults = useLocalStorage<Record<string, QuizResult>>('learning-quiz-results', {})

const selectedChapter = computed(
  () => courseChapters.find((chapter) => chapter.id === activeChapterId.value) ?? courseChapters[0],
)

const selectedChapterQuiz = computed(
  () => chapterQuizzes.find((quiz) => quiz.chapterId === activeChapterId.value) ?? chapterQuizzes[0],
)

const totalExerciseCount = computed(() =>
  courseChapters.reduce((total, chapter) => total + chapter.exercises.length, 0),
)

const completedExerciseCount = computed(
  () => Object.values(completedExercises.value).filter(Boolean).length,
)

const overallProgress = computed(() => {
  if (totalExerciseCount.value === 0) return 0
  return Math.round((completedExerciseCount.value / totalExerciseCount.value) * 100)
})

const passedQuizCount = computed(() =>
  Object.entries(quizResults.value).filter(([chapterId, result]) => {
    const quiz = chapterQuizzes.find((item) => item.chapterId === chapterId)
    if (!quiz) return false
    return result.score >= quiz.passingScore
  }).length,
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

function submitQuiz(chapterId: string, result: QuizResult) {
  quizResults.value = {
    ...quizResults.value,
    [chapterId]: result,
  }
}

function retryQuiz(_chapterId: string) {
}

function exportProgress() {
  const data = {
    completedExercises: completedExercises.value,
    chapterNotes: chapterNotes.value,
    quizResults: quizResults.value,
    exportedAt: new Date().toISOString(),
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'vue-learning-progress.json'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

function importProgress(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  const reader = new FileReader()
  reader.onload = (loadEvent) => {
    try {
      const data = JSON.parse(loadEvent.target?.result as string)

      if (data.completedExercises && typeof data.completedExercises === 'object') {
        completedExercises.value = data.completedExercises
      }

      if (data.chapterNotes && typeof data.chapterNotes === 'object') {
        chapterNotes.value = data.chapterNotes
      }

      if (data.quizResults && typeof data.quizResults === 'object') {
        quizResults.value = data.quizResults
      }
    } catch {
      alert('导入失败，请选择之前导出的 JSON 进度文件。')
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
      :overall-progress="overallProgress"
      @navigate="setActiveView"
    />

    <Transition name="fade" mode="out-in">
      <main v-if="activeView === 'chapter'" key="chapter" class="chapter-layout">
        <ChapterSidebar
          :chapters="courseChapters"
          :phases="learningPhases"
          :selected-chapter-id="activeChapterId"
          :completed-exercises="completedExercises"
          :quiz-results="quizResults"
          @select="openChapter"
        />
        <ChapterView
          :chapter="selectedChapter"
          :quiz="selectedChapterQuiz"
          :quiz-result="quizResults[selectedChapter.id] ?? null"
          :active-tab="activeTab"
          :completed-exercises="completedExercises"
          :chapter-notes="chapterNotes"
          @change-tab="activeTab = $event"
          @toggle-exercise="toggleExercise"
          @update-note="updateChapterNote"
          @submit-quiz="submitQuiz"
          @retry-quiz="retryQuiz"
        />
      </main>

      <main v-else key="overview" class="main-content">
        <OverviewView
          v-if="activeView === 'overview'"
          :chapters="courseChapters"
          :phases="learningPhases"
          :completed-exercises="completedExercises"
          :quiz-results="quizResults"
          :completed-exercise-count="completedExerciseCount"
          :total-exercise-count="totalExerciseCount"
          :passed-quiz-count="passedQuizCount"
          :total-quiz-count="chapterQuizzes.length"
          @open-chapter="openChapter"
          @export-progress="exportProgress"
          @import-progress="importProgress"
        />
        <ResourcesView v-else :resources="learningResources" :phases="learningPhases" />
      </main>
    </Transition>
  </div>
</template>
