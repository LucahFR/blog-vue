<template>
  <div>
    <div class="topo-posts">
      <h2>Posts</h2>
      <router-link to="/new" class="btn-novo">+ Novo Post</router-link>
    </div>

    <div class="barra-busca">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input v-model="busca" type="text" placeholder="Buscar posts..." @input="filtrar" />
    </div>

    <p v-if="carregando" class="aviso">Carregando...</p>
    <p v-else-if="erro" class="aviso">
      {{ erro }}
      <button @click="carregarPosts">Tentar novamente</button>
    </p>
    <p v-else-if="posts.length === 0" class="aviso">Nenhum post encontrado.</p>

    <div v-else class="grid">
      <PostCard
        v-for="p in posts"
        :key="p.id"
        :post="p"
        @ver-comentarios="abrirComentarios"
        @apagar="apagarPost"
      />
    </div>

    <Pagination
      :pagina="pagina"
      :total="totalPosts"
      :porPagina="15"
      @mudar-pagina="mudarPagina"
    />

    <div v-if="postSelecionado !== null" class="modal" @click.self="fecharComentarios">
      <div class="modal-conteudo">
        <button class="fechar" @click="fecharComentarios">X</button>
        <CommentList :postId="postSelecionado" />
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from './PostCard.vue'
import CommentList from './CommentList.vue'
import Pagination from './Pagination.vue'

export default {
  name: 'PostList',
  components: { PostCard, CommentList, Pagination },
  data() {
    return {
      posts: [],
      todos: [],
      carregando: false,
      erro: '',
      pagina: 1,
      totalPosts: 0,
      busca: '',
      postSelecionado: null,
      porPagina: 15
    }
  },
  methods: {
    // busca os posts na api
    async carregarPosts() {
      this.carregando = true
      this.erro = ''
      try {
        const resposta = await fetch('https://dummyjson.com/posts?limit=200')
        const dados = await resposta.json()
        const meus = this.pegarMeusPosts()
        this.todos = meus.concat(dados.posts)
        this.filtrar()
        console.log('posts carregados:', this.todos.length)
      } catch (e) {
        this.erro = 'Erro ao carregar posts'
        console.log(e)
      }
      this.carregando = false
    },
    pegarMeusPosts() {
      var salvos = localStorage.getItem('meus-posts')
      if (salvos) {
        return JSON.parse(salvos)
      }
      return []
    },
    filtrar() {
      var lista = this.todos
      if (this.busca) {
        lista = this.todos.filter(function (p) {
          return p.title.toLowerCase().includes(this.busca.toLowerCase())
        }.bind(this))
      }
      this.totalPosts = lista.length
      var inicio = (this.pagina - 1) * this.porPagina
      this.posts = lista.slice(inicio, inicio + this.porPagina)
    },
    mudarPagina(p) {
      this.pagina = p
      this.filtrar()
      window.scrollTo(0, 0)
    },
    abrirComentarios(id) {
      this.postSelecionado = id
    },
    fecharComentarios() {
      this.postSelecionado = null
    },
    apagarPost(id) {
      var lista = this.pegarMeusPosts().filter(p => p.id !== id)
      localStorage.setItem('meus-posts', JSON.stringify(lista))
      this.todos = this.todos.filter(p => p.id !== id)
      this.filtrar()
    }
  },
  mounted() {
    this.carregarPosts()
  }
}
</script>