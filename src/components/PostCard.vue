<template>
  <article class="post-card">
    <h3>{{ post.title }}</h3>
    <p class="post-body">{{ truncatedBody }}</p>
    <div class="post-meta">
      <span>👤 {{ post.userId }}</span>
      <span>❤️ {{ post.reactions }}</span>
      <button @click="$emit('show-comments', post.id)">💬 Comentários</button>
    </div>
    <div class="tags" v-if="post.tags && post.tags.length">
      <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true }
})

defineEmits(['show-comments'])

const truncatedBody = computed(() =>
  props.post.body.length > 150 ? props.post.body.substring(0, 150) + '...' : props.post.body
)
</script>