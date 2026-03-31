<script setup lang="ts">
import { computed } from 'vue'
import ExerciseCard from '../components/ExerciseCard.vue'
import type { CourseChapter } from '../types/course'

type ActiveTab = 'goals' | 'docs' | 'exercises'

const props = defineProps<{
  chapter: CourseChapter
  activeTab: ActiveTab
  completedExercises: Record<string, boolean>
  chapterNotes: Record<string, string>
}>()

const emit = defineEmits<{
  changeTab: [tab: ActiveTab]
  toggleExercise: [exerciseId: string]
  updateNote: [value: string]
}>()

const chapterCompletion = computed(() => {
  const count = props.chapter.exercises.filter((exercise) => props.completedExercises[exercise.id]).length

  return {
    count,
    total: props.chapter.exercises.length,
  }
})

const currentChapterNote = computed({
  get: () => props.chapterNotes[props.chapter.id] ?? '',
  set: (value: string) => emit('updateNote', value),
})
</script>

<template>
  <section class="workspace">
    <section class="panel workspace-intro">
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
          <h3>这一章建议怎么开始</h3>
          <ol class="ordered-list">
            <li v-for="step in chapter.starterSteps" :key="step">{{ step }}</li>
          </ol>
        </article>
        <article class="info-card">
          <h3>完成标准</h3>
          <p class="workspace-summary">{{ chapter.milestone }}</p>
          <ul class="simple-list">
            <li v-for="outcome in chapter.outcomes" :key="outcome">{{ outcome }}</li>
          </ul>
        </article>
      </div>

      <div class="tabs">
        <button
          class="tab-button"
          :class="{ active: activeTab === 'goals' }"
          type="button"
          @click="emit('changeTab', 'goals')"
        >
          学习目标
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'docs' }"
          type="button"
          @click="emit('changeTab', 'docs')"
        >
          学习内容
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'exercises' }"
          type="button"
          @click="emit('changeTab', 'exercises')"
        >
          项目练习
        </button>
      </div>
    </section>

    <section v-if="activeTab === 'goals'" class="panel">
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
          <h3>学完以后你应该能做到</h3>
          <ul class="simple-list">
            <li v-for="outcome in chapter.outcomes" :key="outcome">{{ outcome }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section v-if="activeTab === 'docs'" class="panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">Docs</p>
          <h2>学习内容</h2>
        </div>
      </div>

      <div class="doc-stack">
        <article v-for="section in chapter.docs" :key="section.title" class="doc-card">
          <h3>{{ section.title }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.bullets?.length" class="simple-list">
            <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <div v-if="section.code?.length" class="code-blocks">
            <div v-for="block in section.code" :key="block.content" class="code-block">
              <span v-if="block.title" class="code-block-title">{{ block.title }}</span>
              <pre><code>{{ block.content }}</code></pre>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section v-if="activeTab === 'exercises'" class="panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">Exercises</p>
          <h2>跟着项目动手练</h2>
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
          <span>会自动保存在浏览器本地</span>
        </div>
        <textarea
          v-model="currentChapterNote"
          placeholder="记录今天理解了什么、哪里还没明白、下一步准备改哪个文件。"
        />
      </div>
    </section>
  </section>
</template>
