import { createRouter, createWebHistory } from 'vue-router'
import PostsView from '../views/PostsView.vue'
import CommentsView from '../views/CommentsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PostsView
    },
    {
      path: '/comments/:post_id',
      props: true,
      name: 'comments',
      component: CommentsView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

export default router
