<script setup lang="ts">
import { computed } from 'vue'
import type { QuizQuestion } from '../types/course'

const props = defineProps<{
  question: QuizQuestion
  questionIndex: number
  selectedAnswer: number | number[] | null
  revealed: boolean
}>()

const emit = defineEmits<{
  select: [questionId: string, answer: number | number[]]
}>()

const isMultipleChoice = computed(() => props.question.type === 'multiple-choice')

const typeLabel = computed(() => {
  const map: Record<string, string> = {
    'single-choice': '单选',
    'multiple-choice': '多选',
    'true-false': '判断',
    'code-output': '代码预测',
  }
  return map[props.question.type] ?? '单选'
})

const isCorrect = computed(() => {
  if (props.selectedAnswer === null) return false
  const correct = props.question.correctAnswer
  if (Array.isArray(correct)) {
    if (!Array.isArray(props.selectedAnswer)) return false
    const sel = props.selectedAnswer
    return correct.length === sel.length
      && correct.every((v) => sel.includes(v))
  }
  return props.selectedAnswer === correct
})

function isOptionSelected(index: number) {
  if (props.selectedAnswer === null) return false
  if (Array.isArray(props.selectedAnswer)) return props.selectedAnswer.includes(index)
  return props.selectedAnswer === index
}

function isOptionCorrect(index: number) {
  const correct = props.question.correctAnswer
  if (Array.isArray(correct)) return correct.includes(index)
  return correct === index
}

function toggleOption(index: number) {
  if (props.revealed) return

  if (isMultipleChoice.value) {
    const current = Array.isArray(props.selectedAnswer) ? [...props.selectedAnswer] : []
    const pos = current.indexOf(index)
    if (pos >= 0) {
      current.splice(pos, 1)
    } else {
      current.push(index)
    }
    emit('select', props.question.id, current)
  } else {
    emit('select', props.question.id, index)
  }
}

const optionLetters = 'ABCDEFGH'.split('')
</script>

<template>
  <article
    class="quiz-card"
    :class="{
      revealed,
      correct: revealed && isCorrect,
      wrong: revealed && !isCorrect,
    }"
  >
    <div class="quiz-question-header">
      <span class="quiz-question-number">{{ questionIndex + 1 }}</span>
      <span class="quiz-question-text">{{ question.question }}</span>
      <span class="quiz-question-type" :class="question.type">{{ typeLabel }}</span>
    </div>

    <div v-if="question.codeSnippet" class="quiz-code-snippet">
      <pre><code>{{ question.codeSnippet }}</code></pre>
    </div>

    <div class="quiz-options">
      <div
        v-for="(option, index) in question.options"
        :key="index"
        class="quiz-option"
        :class="{
          selected: isOptionSelected(index),
          correct: revealed && isOptionCorrect(index),
          wrong: revealed && isOptionSelected(index) && !isOptionCorrect(index),
          disabled: revealed,
        }"
        @click="toggleOption(index)"
      >
        <span
          class="quiz-option-indicator"
          :class="{ checkbox: isMultipleChoice }"
        />
        <span class="quiz-option-label">{{ optionLetters[index] }}.</span>
        <span>{{ option }}</span>
      </div>
    </div>

    <div v-if="revealed" class="quiz-explanation">
      <strong>解析：</strong>{{ question.explanation }}
    </div>
  </article>
</template>
