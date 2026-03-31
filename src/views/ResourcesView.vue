<script setup lang="ts">
import type { LearningPhaseMeta, LearningResource } from '../types/course'

defineProps<{
  resources: LearningResource[]
  phases: LearningPhaseMeta[]
}>()
</script>

<template>
  <section class="view-stack">
    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">Resource Map</p>
          <h2>资料不是越多越好，关键是知道什么时候看什么</h2>
        </div>
      </div>

      <div class="phase-roadmap compact">
        <article v-for="phase in phases" :key="phase.id" class="phase-card" :class="'phase-' + phase.id">
          <span class="phase-badge" :class="phase.id">{{ phase.chapterRange }}</span>
          <h3>{{ phase.title }}</h3>
          <p class="phase-focus">{{ phase.focus }}</p>
          <p class="workspace-summary">{{ phase.description }}</p>
        </article>
      </div>
    </section>

    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">Reading Rules</p>
          <h2>推荐使用方式</h2>
        </div>
      </div>

      <div class="starter-grid">
        <article class="info-card">
          <h3>查资料顺序</h3>
          <ul class="simple-list">
            <li>Vue 语法问题先查 Vue 官方文档。</li>
            <li>HTML、CSS、DOM 和 Fetch 优先查 MDN。</li>
            <li>类型问题优先查 TypeScript Handbook。</li>
            <li>每次查完都回到当前项目做一个最小实验。</li>
          </ul>
        </article>
        <article class="info-card">
          <h3>笔记比收藏更重要</h3>
          <p class="workspace-summary">
            每次学习后写三句话就够了：今天改了什么、真正理解了什么、还有哪里不稳定。这样的笔记比只保存链接更能沉淀能力。
          </p>
        </article>
      </div>
    </section>

    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">Links</p>
          <h2>推荐资料</h2>
        </div>
      </div>

      <div class="resource-grid">
        <article v-for="resource in resources" :key="resource.name" class="resource-card">
          <p class="resource-type">{{ resource.type }}</p>
          <h3>{{ resource.name }}</h3>
          <p>{{ resource.note }}</p>
          <a :href="resource.link" target="_blank" rel="noreferrer">{{ resource.link }}</a>
        </article>
      </div>
    </section>
  </section>
</template>
