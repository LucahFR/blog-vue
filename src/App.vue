<template>
  <div id="app">
    <header class="app-header">
      <h1>Blog</h1>
      <nav>
        <router-link to="/">Início</router-link>
        <button class="btn-tema" @click="mudarTema">
          {{ temaEscuro ? '☀' : '☾' }}
        </button>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      temaEscuro: false
    }
  },
  methods: {
    // troca entre claro e escuro
    mudarTema() {
      this.temaEscuro = !this.temaEscuro
      if (this.temaEscuro) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('tema', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('tema', 'light')
      }
    }
  },
  mounted() {
    // ve se ja tem tema salvo
    var tema = localStorage.getItem('tema')
    if (tema == 'dark') {
      this.temaEscuro = true
      document.documentElement.classList.add('dark')
    }
  }
}
</script>

<style>
:root {
  --fundo: #f5f7fa;
  --cartao: #ffffff;
  --cartao2: #f0f2f5;
  --texto: #2c3e50;
  --texto2: #555555;
  --texto3: #8a97a6;
  --borda: #e0e0e0;
  --borda2: #eeeeee;
  --azul: #3498db;
  --azul2: #2980b9;
  --verde: #27ae60;
  --vermelho: #e74c3c;
  --tag: #eaf2f8;
  --tagTxt: #2980b9;
  --sombra: rgba(0, 0, 0, 0.08);
  --sombra2: rgba(0, 0, 0, 0.12);
  --overlay: rgba(0, 0, 0, 0.5);
}

html.dark {
  --fundo: #0d1117;
  --cartao: #161b22;
  --cartao2: #21262d;
  --texto: #e6edf3;
  --texto2: #adbac7;
  --texto3: #768390;
  --borda: #30363d;
  --borda2: #21262d;
  --azul: #58a6ff;
  --azul2: #79c0ff;
  --verde: #3fb950;
  --vermelho: #f85149;
  --tag: #1f6feb22;
  --tagTxt: #79c0ff;
  --sombra: rgba(0, 0, 0, 0.5);
  --sombra2: rgba(0, 0, 0, 0.7);
  --overlay: rgba(0, 0, 0, 0.8);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  background: var(--fundo);
  color: var(--texto);
}

body {
  font-family: 'Segoe UI', Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.6;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 2px solid var(--borda);
  margin-bottom: 2rem;
}

.app-header h1 {
  color: var(--texto);
}

.app-header nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-header nav a {
  text-decoration: none;
  color: var(--azul);
  font-weight: 600;
}

.app-header nav a:hover {
  color: var(--azul2);
}

.app-header nav a.router-link-active {
  color: var(--texto);
  border-bottom: 2px solid var(--texto);
}

.btn-tema {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--borda);
  background: var(--cartao);
  color: var(--texto);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-tema:hover {
  background: var(--cartao2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
  align-items: start;
}

.card {
  background: var(--cartao);
  border: 1px solid var(--borda2);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px var(--sombra);
  display: flex;
  flex-direction: column;
}

.card:hover {
  box-shadow: 0 4px 12px var(--sombra2);
}

.card-topo {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.card h3 {
  color: var(--texto);
  font-size: 1.05rem;
  line-height: 1.35;
  max-height: 2.7em;
  overflow: hidden;
  word-break: break-word;
}

.card-corpo {
  color: var(--texto2);
  margin-bottom: 1rem;
  line-height: 1.5;
  max-height: 6em;
  overflow: hidden;
  word-break: break-word;
}

.badge-novo {
  background: var(--verde);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
}

.card-rodape {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: var(--texto3);
  border-top: 1px solid var(--borda2);
  padding-top: 0.75rem;
}

.info {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
}

.info span {
  color: var(--texto3);
  white-space: nowrap;
}

.acoes {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-comentar {
  padding: 0.4rem 0.8rem;
  background: var(--azul);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: inherit;
}

.btn-comentar:hover {
  background: var(--azul2);
}

.btn-apagar {
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  color: var(--vermelho);
  border: 1px solid var(--vermelho);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
}

.btn-apagar:hover {
  background: var(--vermelho);
  color: #fff;
}

.tags {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  max-height: 30px;
  overflow: hidden;
}

.tag {
  background: var(--tag);
  color: var(--tagTxt);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag-mais {
  background: var(--cartao2);
  color: var(--texto3);
  font-weight: 600;
}

.barra-busca {
  position: relative;
  margin-bottom: 1rem;
}

.barra-busca input {
  width: 100%;
  padding: 0.7rem 1rem 0.7rem 2.6rem;
  border: 1px solid var(--borda);
  background: var(--cartao);
  color: var(--texto);
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
}

.barra-busca input::placeholder {
  color: var(--texto3);
}

.barra-busca input:focus {
  outline: none;
  border-color: var(--azul);
}

.barra-busca svg {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--texto3);
  width: 18px;
  height: 18px;
}

.paginacao {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.paginacao button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--borda);
  background: var(--cartao);
  color: var(--texto);
  border-radius: 6px;
  cursor: pointer;
}

.paginacao button:hover:not(:disabled) {
  background: var(--cartao2);
}

.paginacao button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.paginacao span {
  color: var(--texto2);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--overlay);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-post {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  background: var(--cartao);
  color: var(--texto);
  border: 1px solid var(--borda);
  border-radius: 8px;
  width: 100%;
  max-width: 1000px;
  height: 85vh;
  max-height: 700px;
  overflow: hidden;
  position: relative;
}

.fechar {
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
  background: var(--cartao);
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: var(--texto2);
  z-index: 5;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fechar:hover {
  background: var(--cartao2);
  color: var(--texto);
}

.post-conteudo {
  padding: 2rem;
  overflow-y: auto;
  border-right: 1px solid var(--borda2);
  min-width: 0;
}

.post-conteudo h3 {
  color: var(--texto);
  font-size: 1.3rem;
  margin-bottom: 1rem;
  padding-right: 40px;
}

.post-info {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: var(--texto3);
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--borda2);
}

.post-texto {
  color: var(--texto2);
  line-height: 1.7;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.comentarios-lado {
  padding: 1.5rem;
  overflow-y: auto;
  min-width: 0;
}

@media (max-width: 700px) {
  .modal-post {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    height: 90vh;
  }
  .post-conteudo {
    border-right: none;
    border-bottom: 1px solid var(--borda2);
  }
}

.fechar {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: var(--texto2);
}

.fechar:hover {
  color: var(--texto);
}

.form-novo {
  max-width: 600px;
  margin: 0 auto;
  background: var(--cartao);
  border: 1px solid var(--borda2);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--sombra);
}

.form-novo h2 {
  color: var(--texto);
  margin-bottom: 1rem;
}

.campo {
  margin-bottom: 1rem;
}

.campo label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: var(--texto);
}

.card-imagem {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin: 0.5rem 0 1rem 0;
  display: block;
  background: var(--cartao2);
}

.post-imagem {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: block;
  background: var(--cartao2);
}

.campo input,
.campo textarea {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--borda);
  background: var(--cartao2);
  color: var(--texto);
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 50px;
  max-height: 400px;
}

.campo input::placeholder,
.campo textarea::placeholder {
  color: var(--texto3);
}

.campo input:focus,
.campo textarea:focus {
  outline: none;
  border-color: var(--azul);
}

.botoes {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-publicar {
  padding: 0.6rem 1.2rem;
  background: var(--verde);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-family: inherit;
}

.btn-publicar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancelar {
  padding: 0.6rem 1.2rem;
  background: var(--vermelho);
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
}

.mensagem-sucesso {
  color: var(--verde);
  margin-top: 1rem;
}

.mensagem-erro {
  color: var(--vermelho);
  margin-top: 1rem;
}

.topo-posts {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  gap: 1rem;
}

.topo-posts h2 {
  color: var(--texto);
}

.btn-novo {
  background: var(--azul);
  color: #fff;
  padding: 0.55rem 1.1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
}

.btn-novo:hover {
  background: var(--azul2);
}

.aviso {
  text-align: center;
  padding: 2rem;
  color: var(--texto3);
}

.comentarios h4 {
  color: var(--texto);
  margin-bottom: 0.5rem;
}

.comentarios ul {
  list-style: none;
  margin-top: 1rem;
}

.comentario {
  border-bottom: 1px solid var(--borda2);
  padding: 0.75rem 0;
}

.comentario p {
  color: var(--texto2);
  margin-top: 0.25rem;
}

.comentario-topo {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--texto2);
}

.comentario-topo strong {
  color: var(--texto);
}
</style>