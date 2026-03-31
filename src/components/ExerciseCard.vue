<script setup lang="ts">
import type { CourseExercise } from '../types/course'

defineProps<{
  exercise: CourseExercise
  completed: boolean
}>()

const emit = defineEmits<{
  toggle: [exerciseId: string]
}>()
</script>

<template>
  <article class="exercise-card" :class="{ completed }">
    <div class="exercise-top">
      <label class="exercise-toggle">
        <input
          :checked="completed"
          type="checkbox"
          @change="emit('toggle', exercise.id)"
        />
        <strong>{{ exercise.title }}</strong>
      </label>
      <span class="exercise-state">{{ completed ? '已完成' : '待完成' }}</span>
    </div>

    <p class="exercise-intro">{{ exercise.intro }}</p>

    <div class="file-tags">
      <span v-for="file in exercise.files" :key="file">{{ file }}</span>
    </div>

    <div class="exercise-columns">
      <div>
        <h3>你要做什么</h3>
        <ol class="ordered-list">
          <li v-for="step in exercise.steps" :key="step">{{ step }}</li>
        </ol>
      </div>
      <div>
        <h3>如何验证</h3>
        <ul class="simple-list">
          <li v-for="item in exercise.verify" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </article>
</template>
