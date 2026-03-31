<script setup lang="ts">
import type { LearningResource } from '../types/course'

defineProps<{
  resources: LearningResource[]
}>()
</script>

<template>
  <section class="view-stack">
    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">Resources</p>
          <h2>资料不用多，关键是知道什么时候看什么</h2>
        </div>
      </div>

      <div class="starter-grid">
        <article class="info-card">
          <h3>资料使用建议</h3>
          <ul class="simple-list">
            <li>遇到 Vue 语法问题，先查 Vue 官方文档，不要先搜零散答案。</li>
            <li>遇到 HTML、CSS、DOM、事件等基础问题，优先查 MDN。</li>
            <li>不要同时追很多视频和文章，先把一个概念在当前项目里练出来。</li>
          </ul>
        </article>

        <article class="info-card">
          <h3>笔记比囤资料更重要</h3>
          <p class="workspace-summary">
            每次学习后写 3 句话就够了：今天改了什么、理解了什么、还有什么没搞懂。这样比收藏更多链接更有效。
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
