import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  { path: '/',
    name:  'login',
   component: () => import('../components/Login.vue')
  },
  { path: '/cadastro',
    name:  'cadastro',
   component: () => import('../components/views/Cadastro.vue')
  },
  { path: '/escalas',
    name:  'escalas',
   component: () => import('../components/views/Escalas.vue')
  },
  { path: '/dashboard',
    name:  'dashboard',
   component: () => import('../components/views/Dashboard.vue')
  },
  
],
})

export default router
