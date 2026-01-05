import { createRouter, createWebHistory } from 'vue-router'
import V_main from '@/view/V_main.vue'
import V_sponsor from '@/view/V_sponsor.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{path:'/',component:V_main},{path:'/sponsor',component:V_sponsor}],
  scrollBehavior(){
    return {top:0,left:0}
  }
})

export default router
