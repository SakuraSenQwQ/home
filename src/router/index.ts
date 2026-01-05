import { createRouter, createWebHistory } from 'vue-router'
import P_Home from '@/page/p_Home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{path:'/',component:P_Home}],
})

export default router
