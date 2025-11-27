import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import PerfilView from '../views/PerfilView.vue';
import HomeView from '../views/HomeView.vue';
import EscalaView from '../views/EscalaView.vue';
import Cadastrado from '../views/pag_cadastrado/cadastrado.vue';

const routes = [
  { path: '/', redirect: '/home' },       // ⭐ AGORA REDIRECIONA PARA O HOME
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView },
  { path: '/perfil', name: '/Perfil', component: PerfilView },
  { path: '/home', name: '/Home', component: HomeView },
  { path: '/escala', name: '/Escala', component: EscalaView },
  { path: '/cadastrado', name: '/cadastrado', component: Cadastrado}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
