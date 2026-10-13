<template>
  <div class="paginacao" v-if="totalPaginas > 1">
    <button :disabled="pagina === 1" @click="mudar(pagina - 1)">Anterior</button>
    <span>{{ pagina }} / {{ totalPaginas }}</span>
    <button :disabled="pagina === totalPaginas" @click="mudar(pagina + 1)">Próxima</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagina: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    porPagina: {
      type: Number,
      default: 15
    }
  },
  emits: ['mudar-pagina'],
  computed: {
    totalPaginas() {
      return Math.ceil(this.total / this.porPagina)
    }
  },
  methods: {
    mudar(p) {
      if (p >= 1 && p <= this.totalPaginas) {
        this.$emit('mudar-pagina', p)
      }
    }
  }
}
</script>