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
        :usuarios="usuarios"
        @abrir-post="abrirPost"
        @apagar="apagarPost"
      />
    </div>

    <Pagination
      :pagina="pagina"
      :total="totalPosts"
      :porPagina="15"
      @mudar-pagina="mudarPagina"
    />

    <div v-if="postSelecionado" class="modal" @click.self="fecharPost">
      <div class="modal-post">
        <button class="fechar" @click="fecharPost">X</button>

        <div class="post-conteudo">
          <h3>{{ postSelecionado.title }}</h3>

          <img
            class="post-imagem"
            :src="urlImagem(postSelecionado, 600, 300)"
            :alt="postSelecionado.title"
          >

          <div class="post-info">
            <span>👤 {{ nomeAutor(postSelecionado.userId) }}</span>
            <span>❤️ {{ postSelecionado.reactions.likes }}</span>
            <span>👎 {{ postSelecionado.reactions.dislikes }}</span>
          </div>

          <p class="post-texto">{{ postSelecionado.body }}</p>

          <div class="tags" v-if="postSelecionado.tags && postSelecionado.tags.length">
            <span v-for="t in postSelecionado.tags" :key="t" class="tag">#{{ t }}</span>
          </div>
        </div>

        <div class="comentarios-lado">
          <CommentList :postId="postSelecionado.id" />
        </div>
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
      usuarios: [],
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
    async carregarPosts() {
      this.carregando = true
      this.erro = ''
      try {
        const respPosts = await fetch('https://dummyjson.com/posts?limit=200')
        const dadosPosts = await respPosts.json()

        const respUsuarios = await fetch('https://dummyjson.com/users?limit=200')
        const dadosUsuarios = await respUsuarios.json()
        this.usuarios = dadosUsuarios.users

        const meus = this.pegarMeusPosts()
        this.todos = meus.concat(dadosPosts.posts)
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
    abrirPost(post) {
      this.postSelecionado = post
    },
    fecharPost() {
      this.postSelecionado = null
    },
    apagarPost(id) {
      var lista = this.pegarMeusPosts().filter(p => p.id !== id)
      localStorage.setItem('meus-posts', JSON.stringify(lista))
      this.todos = this.todos.filter(p => p.id !== id)
      if (this.postSelecionado && this.postSelecionado.id === id) {
        this.postSelecionado = null
      }
      this.filtrar()
    },
    nomeAutor(userId) {
      if (this.usuarios.length === 0) {
        return 'Anônimo'
      }
      var i = Math.abs(userId) % this.usuarios.length
      var u = this.usuarios[i]
      return u.firstName + ' ' + u.lastName
    },
    urlImagem(post, largura, altura) {
      var cores = ['1e293b', '334155', '1e3a8a', '3b0764', '14532d', '7c2d12']
      var cor = cores[Math.abs(post.id) % cores.length]
      var texto = post.title
      if (texto.length > 40) {
        texto = texto.substring(0, 40)
      }
      texto = encodeURIComponent(texto)
      return 'https://dummyjson.com/image/' + largura + 'x' + altura + '/' + cor + '/cbd5e1?text=' + texto + '&fontSize=28'
    }
  },
  mounted() {
    this.carregarPosts()
  }
}
</script>