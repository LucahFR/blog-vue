<template>
  <div class="comentarios">
    <h4>Comentários ({{ comments.length }})</h4>

    <p v-if="carregando">Carregando...</p>
    <p v-else-if="comments.length === 0">Nenhum comentário.</p>

    <ul v-else>
      <li v-for="c in comments" :key="c.id" class="comentario">
        <div class="comentario-topo">
          <strong>{{ c.user.username }}</strong>
          <span>{{ c.likes }} likes</span>
        </div>
        <p>{{ c.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      carregando: false
    }
  },
  methods: {
    async carregarComentarios() {
      if (this.postId < 0) {
        this.comments = []
        return
      }
      this.carregando = true
      try {
        const resposta = await fetch('https://dummyjson.com/comments/post/' + this.postId)
        const dados = await resposta.json()
        this.comments = dados.comments
      } catch (e) {
        console.log('erro:', e)
        this.comments = []
      }
      this.carregando = false
    }
  },
  mounted() {
    this.carregarComentarios()
  }
}
</script>