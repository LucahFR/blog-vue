<template>
  <div class="comment-list">
    <h4>Comentários ({{ comments.length }})</h4>
    <div v-if="loading" class="loading">Carregando comentários...</div>
    <div v-else-if="comments.length === 0" class="empty">Nenhum comentário ainda.</div>
    <ul v-else>
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <strong>{{ comment.user.username }}</strong>
          <span>❤️ {{ comment.likes }}</span>
        </div>
        <p>{{ comment.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { fetchCommentsByPostId } from '../services/api'

const props = defineProps({
  postId: { type: Number, required: true }
})

const comments = ref([])
const loading = ref(false)

watch(
  () => props.postId,
  async (newId) => {
    if (!newId) return
    loading.value = true
    try {
      const data = await fetchCommentsByPostId(newId)
      comments.value = data.comments || []
    } catch (err) {
      console.error(err)
      comments.value = []
    } finally {
      loading.value = false
    }
  },
  { immediate: true }
)
</script>