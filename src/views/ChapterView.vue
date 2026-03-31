<script setup lang="ts">
import { computed } from 'vue'
import ExerciseCard from '../components/ExerciseCard.vue'
import QuizPanel from '../components/QuizPanel.vue'
import type { ChapterQuiz, CourseChapter, QuizResult } from '../types/course'

type ActiveTab = 'goals' | 'docs' | 'exercises' | 'quiz'

const props = defineProps<{
  chapter: CourseChapter
  quiz: ChapterQuiz
  quizResult: QuizResult | null
  activeTab: ActiveTab
  completedExercises: Record<string, boolean>
  chapterNotes: Record<string, string>
}>()

const emit = defineEmits<{
  changeTab: [tab: ActiveTab]
  toggleExercise: [exerciseId: string]
  updateNote: [value: string]
  submitQuiz: [chapterId: string, result: QuizResult]
  retryQuiz: [chapterId: string]
}>()

const chapterCompletion = computed(() => {
  const count = props.chapter.exercises.filter((exercise) => props.completedExercises[exercise.id]).length
  return { count, total: props.chapter.exercises.length }
})

const currentChapterNote = computed({
  get: () => props.chapterNotes[props.chapter.id] ?? '',
  set: (value: string) => emit('updateNote', value),
})

const quizPassed = computed(() => {
  if (!props.quizResult) return null
  return props.quizResult.score >= props.quiz.passingScore
})
</script>

<template>
  <section class="workspace">
    <section class="panel workspace-intro" :class="'phase-' + chapter.phase">
      <div class="workspace-header">
        <div>
          <p class="section-kicker">Current Chapter</p>
          <h2>{{ chapter.title }}</h2>
          <p class="workspace-summary">{{ chapter.summary }}</p>
        </div>

        <div class="chapter-meta-card">
          <span>{{ chapter.duration }}</span>
          <strong>{{ chapterCompletion.count }}/{{ chapterCompletion.total }}</strong>
          <p>当前章节练习进度</p>
        </div>
      </div>

      <div class="goal-grid">
        <article class="info-card">
          <p class="section-kicker">Start Here</p>
          <h3>推荐开局顺序</h3>
          <ol class="ordered-list">
            <li v-for="step in chapter.starterSteps" :key="step">{{ step }}</li>
          </ol>
        </article>

        <article class="info-card">
          <p class="section-kicker">Finish Line</p>
          <h3>本章完成标准</h3>
          <p class="workspace-summary">{{ chapter.milestone }}</p>
          <ul class="simple-list">
            <li v-for="outcome in chapter.outcomes" :key="outcome">{{ outcome }}</li>
          </ul>
        </article>
      </div>

      <div class="tabs">
        <button class="tab-button" :class="{ active: activeTab === 'goals' }" type="button" @click="emit('changeTab', 'goals')">学习目标</button>
        <button class="tab-button" :class="{ active: activeTab === 'docs' }" type="button" @click="emit('changeTab', 'docs')">学习内容</button>
        <button class="tab-button" :class="{ active: activeTab === 'exercises' }" type="button" @click="emit('changeTab', 'exercises')">项目练习</button>
        <button class="tab-button" :class="{ active: activeTab === 'quiz' }" type="button" @click="emit('changeTab', 'quiz')">
          章节测验
          <span v-if="quizResult" class="tab-badge" :class="quizPassed ? 'passed' : 'failed'">
            {{ quizPassed ? '通过' : '重做' }}
          </span>
          <span v-else class="tab-badge unattempted">未做</span>
        </button>
      </div>
    </section>

    <Transition name="fade" mode="out-in">
      <section v-if="activeTab === 'goals'" key="goals" class="panel">
        <div class="panel-heading">
          <div>
            <p class="section-kicker">Goals</p>
            <h2>这一章你要掌握什么</h2>
          </div>
        </div>

        <div class="goal-grid">
          <article class="info-card">
            <h3>学习目标</h3>
            <ul class="simple-list">
              <li v-for="goal in chapter.goals" :key="goal">{{ goal }}</li>
            </ul>
          </article>
          <article class="info-card">
            <h3>学完后应达到</h3>
            <ul class="simple-list">
              <li v-for="outcome in chapter.outcomes" :key="outcome">{{ outcome }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section v-else-if="activeTab === 'docs'" key="docs" class="panel">
        <div class="panel-heading">
          <div>
            <p class="section-kicker">Docs</p>
            <h2>本章学习内容</h2>
          </div>
        </div>

        <div class="doc-stack">
          <article v-for="section in chapter.docs" :key="section.title" class="doc-card">
            <h3>{{ section.title }}</h3>
            <p v-for="(paragraph, index) in section.paragraphs" :key="index">{{ paragraph }}</p>
            <ul v-if="section.bullets?.length" class="simple-list">
              <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
            <div v-if="section.code?.length" class="code-blocks">
              <div v-for="block in section.code" :key="block.content" class="code-block">
                <div class="code-block-header">
                  <span class="code-block-title">{{ block.title }}</span>
                  <span class="code-block-lang">{{ block.lang }}</span>
                </div>
                <pre><code>{{ block.content }}</code></pre>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section v-else-if="activeTab === 'exercises'" key="exercises" class="panel">
        <div class="panel-heading">
          <div>
            <p class="section-kicker">Exercises</p>
            <h2>用项目练习把本章做实</h2>
          </div>
        </div>

        <div class="exercise-stack">
          <ExerciseCard
            v-for="exercise in chapter.exercises"
            :key="exercise.id"
            :exercise="exercise"
            :completed="completedExercises[exercise.id] ?? false"
            @toggle="emit('toggleExercise', $event)"
          />
        </div>

        <div class="note-box">
          <div class="note-header">
            <div>
              <p class="section-kicker">Notes</p>
              <h2>本章学习笔记</h2>
            </div>
            <span>自动保存到浏览器本地</span>
          </div>

          <textarea
            v-model="currentChapterNote"
            placeholder="记录你今天真正理解了什么、哪里还不稳定、下一步准备改哪个文件。"
          />
        </div>
      </section>

      <section v-else key="quiz" class="panel">
        <QuizPanel
          :quiz="quiz"
          :result="quizResult"
          @submit="(chapterId: string, result: QuizResult) => emit('submitQuiz', chapterId, result)"
          @retry="(chapterId: string) => emit('retryQuiz', chapterId)"
        />
      </section>
    </Transition>
  </section>
</template>
