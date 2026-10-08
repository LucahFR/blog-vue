<template>
  <div class="new-post">
    <h2>Criar Novo Post</h2>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="title">Título</label>
        <input id="title" v-model="form.title" type="text" required placeholder="Título do post" />
      </div>
      <div class="form-group">
        <label for="body">Conteúdo</label>
        <textarea id="body" v-model="form.body" rows="6" required placeholder="Escreva seu post..."></textarea>
      </div>
      <div class="form-group">
        <label for="tags">Tags (separadas por vírgula)</label>
        <input id="tags" v-model="form.tagsInput" type="text" placeholder="vue, javascript, blog" />
      </div>
      <div class="form-group">
        <label for="userId">ID do Autor (simulado)</label>
        <input id="userId" v-model.number="form.userId" type="number" min="1" required />
      </div>

      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <div class="form-actions">
        <button type="submit" :disabled="submitting">
          {{ submitting ? 'Enviando...' : 'Publicar Post' }}
        </button>
        <router-link to="/" class="btn-cancel">Cancelar</router-link>
      </div>
    </form>

    <div v-if="createdPost" class="created-post">
      <h3>Post Criado (Simulado)</h3>
      <p><strong>ID:</strong> {{ createdPost.id }}</p>
      <p><strong>Título:</strong> {{ createdPost.title }}</p>
      <p><strong>Corpo:</strong> {{ createdPost.body }}</p>
      <p><strong>Tags:</strong> {{ createdPost.tags?.join(', ') || 'Nenhuma' }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { createPost } from '../services/api'

const form = reactive({
  title: '',
  body: '',
  tagsInput: '',
  userId: 1
})

const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const createdPost = ref(null)

async function submitPost() {
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''
  createdPost.value = null

  const tags = form.tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)

  const postData = {
    title: form.title,
    body: form.body,
    userId: form.userId,
    tags
  }

  try {
    const result = await createPost(postData)
    createdPost.value = result
    successMessage.value = 'Post criado com sucesso! (Simulação)'
    form.title = ''
    form.body = ''
    form.tagsInput = ''
    form.userId = 1
  } catch (err) {
    errorMessage.value = err.message || 'Erro ao criar post.'
  } finally {
    submitting.value = false
  }
}
</script>