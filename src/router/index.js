import { createRouter, createWebHistory } from 'vue-router'
import PostList from '../components/PostList.vue'
import NewPostForm from '../components/NewPostForm.vue'

const routes = [
  { path: '/', component: PostList },
  { path: '/new', component: NewPostForm }
]

export default createRouter({
  history: createWebHistory(),
  routes
})