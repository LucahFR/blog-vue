<template>
  <div class="post-list">
    <div class="header-actions">
      <h2>Posts</h2>
      <router-link to="/new" class="btn-new">+ Novo Post</router-link>
    </div>

    <!-- Busca -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar posts por título..."
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">🔍</button>
    </div>

    <!-- Estado de carregamento -->
    <div v-if="loading" class="loading-state">Carregando posts...</div>

    <!-- Mensagem de erro -->
    <div v-else-if="error" class="error-state">
      {{ error }}
      <button @click="loadPosts">Tentar novamente</button>
    </div>

    <!-- Lista de posts -->
    <div v-else class="posts-grid">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @show-comments="openComments"
      />
    </div>

    <!-- Paginação -->
    <Pagination
      :currentPage="currentPage"
      :totalItems="totalPosts"
      :itemsPerPage="itemsPerPage"
      @update:currentPage="changePage"
    />

    <!-- Comentários -->
    <div v-if="selectedPostId" class="modal-overlay" @click.self="closeComments">
      <div class="modal-content">
        <button class="modal-close" @click="closeComments">✕</button>
        <CommentList :postId="selectedPostId" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import PostCard from './PostCard.vue'
import CommentList from './CommentList.vue'
import Pagination from './Pagination.vue'
import { fetchPosts } from '../services/api'

const posts = ref([])
const loading = ref(false)
const error = ref('')
const currentPage = ref(1)
const totalPosts = ref(0)
const itemsPerPage = 15
const searchQuery = ref('')
const selectedPostId = ref(null)

async function loadPosts() {
  loading.value = true
  error.value = ''
  try {
    const skip = (currentPage.value - 1) * itemsPerPage
    const data = await fetchPosts({
      limit: itemsPerPage,
      skip,
      search: searchQuery.value.trim()
    })
    posts.value = data.posts || []
    totalPosts.value = data.total || 0
  } catch (err) {
    error.value = err.message || 'Erro desconhecido'
  } finally {
    loading.value = false
  }
}

function changePage(page) {
  currentPage.value = page
  loadPosts()
}

function handleSearch() {
  currentPage.value = 1
  loadPosts()
}

function openComments(postId) {
  selectedPostId.value = postId
}

function closeComments() {
  selectedPostId.value = null
}

onMounted(loadPosts)

watch(currentPage, loadPosts)
</script>