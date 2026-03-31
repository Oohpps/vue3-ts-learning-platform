<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import QuizCard from './QuizCard.vue'
import type { ChapterQuiz, QuizResult } from '../types/course'

const props = defineProps<{
  quiz: ChapterQuiz
  result: QuizResult | null
}>()

const emit = defineEmits<{
  submit: [chapterId: string, result: QuizResult]
  retry: [chapterId: string]
}>()

const localAnswers = ref<Record<string, number | number[]>>({})
const submitted = ref(false)

// 当切换章节时重置本地状态
watch(() => props.quiz.chapterId, () => {
  localAnswers.value = {}
  submitted.value = false
})

function selectAnswer(questionId: string, answer: number | number[]) {
  localAnswers.value = { ...localAnswers.value, [questionId]: answer }
}

const allAnswered = computed(() => {
  return props.quiz.questions.every((q) => {
    const answer = localAnswers.value[q.id]
    if (answer === undefined || answer === null) return false
    if (Array.isArray(answer)) return answer.length > 0
    return true
  })
})

const calculatedScore = computed(() => {
  if (!submitted.value) return 0
  let correct = 0
  for (const q of props.quiz.questions) {
    const userAnswer = localAnswers.value[q.id]
    if (userAnswer === undefined || userAnswer === null) continue
    const correctAnswer = q.correctAnswer
    if (Array.isArray(correctAnswer)) {
      if (!Array.isArray(userAnswer)) continue
      if (correctAnswer.length === userAnswer.length
        && correctAnswer.every((v) => userAnswer.includes(v))) {
        correct++
      }
    } else {
      if (userAnswer === correctAnswer) correct++
    }
  }
  return Math.round((correct / props.quiz.questions.length) * 100)
})

const passed = computed(() => calculatedScore.value >= props.quiz.passingScore)

function submitQuiz() {
  submitted.value = true
  const result: QuizResult = {
    score: calculatedScore.value,
    answers: { ...localAnswers.value },
    completedAt: new Date().toISOString(),
  }
  emit('submit', props.quiz.chapterId, result)
}

function retryQuiz() {
  localAnswers.value = {}
  submitted.value = false
  emit('retry', props.quiz.chapterId)
}

// 环形进度条
const circumference = 2 * Math.PI * 26
const scoreOffset = computed(() => {
  const score = calculatedScore.value
  return circumference - (score / 100) * circumference
})
</script>

<template>
  <section class="quiz-panel">
    <div class="quiz-header">
      <div>
        <p class="section-kicker">Quiz</p>
        <h2>章节测验</h2>
        <p class="workspace-summary">
          共 {{ quiz.questions.length }} 道题，及格线 {{ quiz.passingScore }}%。{{ submitted ? '查看你的成绩和解析：' : '回答完所有题目后提交。' }}
        </p>
      </div>

      <div v-if="submitted" class="quiz-score-display">
        <div class="quiz-score-ring">
          <svg viewBox="0 0 60 60">
            <circle class="ring-bg" cx="30" cy="30" r="26" />
            <circle
              class="ring-fill"
              :class="passed ? 'passed' : 'failed'"
              cx="30"
              cy="30"
              r="26"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="scoreOffset"
            />
          </svg>
          <span class="quiz-score-text" :class="passed ? 'passed' : 'failed'">
            {{ calculatedScore }}%
          </span>
        </div>
        <div>
          <span class="quiz-result-badge" :class="passed ? 'passed' : 'failed'">
            {{ passed ? '通过' : '未通过' }}
          </span>
        </div>
      </div>
    </div>

    <div class="quiz-question-list">
      <QuizCard
        v-for="(question, index) in quiz.questions"
        :key="question.id"
        :question="question"
        :question-index="index"
        :selected-answer="localAnswers[question.id] ?? null"
        :revealed="submitted"
        @select="selectAnswer"
      />
    </div>

    <div class="quiz-actions">
      <button
        v-if="!submitted"
        class="secondary-button accent"
        type="button"
        :disabled="!allAnswered"
        @click="submitQuiz"
      >
        提交测验
      </button>
      <button
        v-if="submitted"
        class="secondary-button"
        type="button"
        @click="retryQuiz"
      >
        重新测验
      </button>
    </div>
  </section>
</template>
