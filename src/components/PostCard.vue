<template>
  <article class="card">
    <div class="card-topo">
      <h3 :title="post.title">{{ tituloCurto }}</h3>
      <span v-if="post.isLocal" class="badge-novo">Novo</span>
    </div>

    <p class="card-corpo" :title="post.body">{{ corpoCurto }}</p>

    <div class="card-rodape">
      <div class="info">
        <span>👤 Autor #{{ post.userId }}</span>
        <span>❤️ {{ post.reactions.likes }}</span>
        <span>👎 {{ post.reactions.dislikes }}</span>
      </div>

      <div class="acoes">
        <button class="btn-comentar" @click="$emit('ver-comentarios', post.id)">
          💬 Comentários
        </button>
        <button
          v-if="post.isLocal"
          class="btn-apagar"
          title="Apagar"
          @click="$emit('apagar', post.id)"
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
    }
  },
  emits: ['ver-comentarios', 'apagar'],
  computed: {
    tituloCurto() {
      if (this.post.title.length > 60) {
        return this.post.title.substring(0, 60) + '...'
      }
      return this.post.title
    },
    corpoCurto() {
      if (this.post.body.length > 150) {
        return this.post.body.substring(0, 150) + '...'
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
      return this.todasTags.slice(0, 3)
    },
    tagsEscondidas() {
      return this.todasTags.length - 3
    },
    tagsTodas() {
      return this.todasTags.map(t => '#' + t).join(' ')
    }
  }
}
</script>