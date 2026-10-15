<template>
  <div class="form-novo">
    <h2>Criar Novo Post</h2>
    <form @submit.prevent="criarPost">
      <div class="campo">
        <label for="titulo">Título</label>
        <input id="titulo" v-model="titulo" type="text" required maxlength="100" />
      </div>
      <div class="campo">
        <label for="corpo">Conteúdo</label>
        <textarea id="corpo" v-model="corpo" rows="6" required maxlength="500"></textarea>
      </div>
      <div class="campo">
        <label for="tags">Tags</label>
        <input id="tags" v-model="tags" type="text" placeholder="vue, javascript, blog" maxlength="80" />
      </div>

      <p v-if="mensagemSucesso" class="mensagem-sucesso">{{ mensagemSucesso }}</p>
      <p v-if="mensagemErro" class="mensagem-erro">{{ mensagemErro }}</p>

      <div class="botoes">
        <button type="submit" class="btn-publicar" :disabled="enviando">
          {{ enviando ? 'Enviando...' : 'Publicar' }}
        </button>
        <router-link to="/" class="btn-cancelar">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewPostForm',
  data() {
    return {
      titulo: '',
      corpo: '',
      tags: '',
      enviando: false,
      mensagemSucesso: '',
      mensagemErro: ''
    }
  },
  methods: {
    async criarPost() {
      this.enviando = true
      this.mensagemSucesso = ''
      this.mensagemErro = ''

      var listaTags = this.tags.split(',')
      var tagsLimpa = []
      for (var i = 0; i < listaTags.length; i++) {
        var t = listaTags[i].trim()
        if (t.length > 0 && tagsLimpa.length < 5) {
          tagsLimpa.push(t.substring(0, 20))
        }
      }

      //coloca id aleatorio quando cria post (teste pessoas)
      var idAleatorio = Math.floor(Math.random() * 30) + 1

      try {
        const resposta = await fetch('https://dummyjson.com/posts/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: this.titulo,
            body: this.corpo,
            userId: idAleatorio,
            tags: tagsLimpa
          })
        })
        const criado = await resposta.json()

        const novoPost = {
          id: -Date.now(),
          title: this.titulo,
          body: this.corpo,
          userId: idAleatorio,
          tags: tagsLimpa,
          reactions: { likes: 0, dislikes: 0 },
          isLocal: true
        }

        var meus = localStorage.getItem('meus-posts')
        var lista = meus ? JSON.parse(meus) : []
        lista.unshift(novoPost)
        localStorage.setItem('meus-posts', JSON.stringify(lista))

        this.mensagemSucesso = 'Post criado!'
        console.log('criado:', criado)

        setTimeout(() => {
          this.$router.push('/')
        }, 800)
      } catch (e) {
        this.mensagemErro = 'Erro ao criar post'
        console.log(e)
      }
      this.enviando = false
    }
  }
}
</script>