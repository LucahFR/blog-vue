import { createRouter, createWebHistory } from 'vue-router'
import PostList from '../components/PostList.vue'
import NewPostForm from '../components/NewPostForm.vue'

const routes = [
  { path: '/', name: 'PostList', component: PostList },
  { path: '/new', name: 'NewPost', component: NewPostForm }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})