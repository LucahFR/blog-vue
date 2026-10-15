<template>
  <article class="card" @click="$emit('abrir-post', post)">
    <div class="card-topo">
      <h3 :title="post.title">{{ tituloCurto }}</h3>
      <span v-if="post.isLocal" class="badge-novo">Novo</span>
    </div>

    <img
      class="card-imagem"
      :src="urlImagem(post, 600, 500)"
      :alt="post.title"
      loading="lazy"
    >

    <p class="card-corpo" :title="post.body">{{ corpoCurto }}</p>

    <div class="card-rodape">
      <div class="info">
        <span>👤 {{ nomeAutor }}</span>
        <span>❤️ {{ post.reactions.likes }}</span>
        <span>👎 {{ post.reactions.dislikes }}</span>
      </div>

      <div class="acoes">
        <button class="btn-comentar" @click.stop="$emit('abrir-post', post)">
          💬 Comentários
        </button>
        <button
          v-if="post.isLocal"
          class="btn-apagar"
          title="Apagar"
          @click.stop="$emit('apagar', post.id)"
        >
          X
        </button>
      </div>
    </div>

    <div class="tags" v-if="tagsMostrar.length">
      <span v-for="t in tagsMostrar" :key="t" class="tag" :title="t">{{ t }}</span>
      <span v-if="tagsEscondidas > 0" class="tag tag-mais" :title="tagsTodas">+{{ tagsEscondidas }}</span>
    </div>
  </article>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true
    },
    usuarios: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  emits: ['abrir-post', 'apagar'],
  computed: {
    tituloCurto() {
      if (this.post.title.length > 55) {
        return this.post.title.substring(0, 55).trim() + '...'
      }
      return this.post.title
    },
    corpoCurto() {
      if (this.post.body.length > 130) {
        return this.post.body.substring(0, 130).trim() + '...'
      }
      return this.post.body
    },
    todasTags() {
      if (!this.post.tags) {
        return []
      }
      return this.post.tags
    },
    tagsMostrar() {
      return this.todasTags.slice(0, 3).map(function (t) {
        if (t.length > 12) {
          return t.substring(0, 12) + '...'
        }
        return t
      })
    },
    tagsEscondidas() {
      return this.todasTags.length - 3
    },
    tagsTodas() {
      return this.todasTags.map(t => '#' + t).join(' ')
    },
    nomeAutor() {
      if (this.usuarios.length === 0) {
        return 'Anônimo'
      }
      var i = Math.abs(this.post.userId) % this.usuarios.length
      var u = this.usuarios[i]
      return u.firstName + ' ' + u.lastName
    }
  },
  methods: {
    //imagem do dummyjson
    urlImagem(post, largura, altura) {
      var cores = ['1e293b', '334155', '1e3a8a', '3b0764', '14532d', '7c2d12']
      var cor = cores[Math.abs(post.id) % cores.length]
      var texto = post.title
      if (texto.length > 30) {
        texto = texto.substring(0, 30)
      }
      texto = encodeURIComponent(texto)
      return 'https://dummyjson.com/image/' + largura + 'x' + altura + '/' + cor + '/e2e8f0?text=' + texto + '&fontSize=22'
    }
  }
}
</script>