<template>
  <div id="app">
    <header class="app-header">
      <h1>Blog</h1>
      <nav>
        <router-link to="/">Início</router-link>
        <router-link to="/new">Novo Post</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Avenir, Helvetica, Arial, sans-serif;
  background: #f5f7fa;
  color: #2c3e50;
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
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 2rem;
}

.app-header nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: #3498db;
  font-weight: 600;
}

.app-header nav a.router-link-active {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.post-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.post-card h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.post-body {
  color: #555;
  flex: 1;
  margin-bottom: 1rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #777;
  border-top: 1px solid #eee;
  padding-top: 0.75rem;
}

.post-meta button {
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  font-size: 0.85rem;
}

.tags {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  background: #eaf2f8;
  color: #2980b9;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

/* Paginação */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Busca */
.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-bar input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar button {
  padding: 0.6rem 1rem;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Comentários */
.comment-list ul {
  list-style: none;
  margin-top: 1rem;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding: 0.75rem 0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #555;
}

/* Formulário */
.new-post {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.form-actions button {
  padding: 0.6rem 1.2rem;
  background: #27ae60;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  padding: 0.6rem 1.2rem;
  background: #e74c3c;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  display: inline-block;
}

.success-message {
  color: #27ae60;
  margin-top: 1rem;
}

.error-message {
  color: #e74c3c;
  margin-top: 1rem;
}

.created-post {
  margin-top: 2rem;
  padding: 1rem;
  background: #eafaf1;
  border-radius: 4px;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-new {
  background: #3498db;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 2rem;
  color: #777;
}

.error-state button {
  margin-left: 1rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
}
</style>