<template>
  <header class="header">
    <div class="logo-area">
      <i class="fas fa-users-cog logo-icon"></i>
      <h1>RH <span class="highlight">Inteligente</span></h1>
    </div>

    <nav class="nav" :class="{ open: menuOpen }">
      <router-link to="/home" active-class="active" @click="menuOpen = false">
        <i class="fas fa-home"></i> Início
      </router-link>
      <router-link to="/dashboard" active-class="active" @click="menuOpen = false">
        <i class="fas fa-chart-line"></i> Dashboard
      </router-link>
      <router-link to="/escala" active-class="active" @click="menuOpen = false">
        <i class="fas fa-calendar-alt"></i> Escala
      </router-link>
      
      <div class="access-links">
        <router-link to="/perfil" active-class="active" @click="menuOpen = false">
          <i class="fas fa-user-circle"></i> Perfil
        </router-link>
        <router-link to="/login" active-class="active" @click="menuOpen = false">
          <i class="fas fa-sign-in-alt"></i> Entrar
        </router-link>
        <router-link to="/register" active-class="active" @click="menuOpen = false">
          <i class="fas fa-user-plus"></i> Cadastrar
        </router-link>
      </div>

    </nav>

    <div class="menu-btn" @click="menuOpen = !menuOpen" :class="{ 'is-open': menuOpen }">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style scoped>
/* ====================================
   1. Variáveis & Header principal
   ==================================== */
:root {
  --color-dark-bg: #1f2a44; /* Fundo Escuro Principal */
  --color-primary-accent: #007bff; /* Azul de Ação/Destaque */
  --color-text-light: #e0e6ed; /* Texto Claro */
  --shadow-header: 0 4px 15px rgba(0, 0, 0, 0.35);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Degradê sutil de azul escuro */
  background: var(--color-dark-bg);
  color: var(--color-text-light);
  padding: 0 30px; 
  box-shadow: var(--shadow-header);
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 70px; /* Altura padrão mais clean */
}

/* ====================================
   2. Logo
   ==================================== */
.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
    font-size: 1.8rem;
    color: var(--color-primary-accent);
}

h1 {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-text-light);
}

.highlight {
  color: var(--color-primary-accent);
}

/* ====================================
   3. Navegação Desktop
   ==================================== */
.nav {
  display: flex;
  gap: 25px;
  align-items: center;
  transition: all 0.3s ease;
}

.nav a {
  color: var(--color-text-light);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 10px 0;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav a i {
    font-size: 0.9em;
}

/* Sublinhado na rota ativa/hover */
.nav a::after {
  content: "";
  position: absolute;
  bottom: 0; 
  left: 0;
  width: 0;
  height: 3px;
  background: var(--color-primary-accent);
  transition: width 0.3s ease;
}

.nav a:hover::after,
.nav a.active::after {
  width: 100%;
}

.nav a:hover, .active {
  color: var(--color-primary-accent);
}

.access-links {
    display: flex;
    gap: 15px;
    padding-left: 20px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
}

/* ====================================
   4. Menu Responsivo (Mobile)
   ==================================== */
.menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.bar {
  display: block;
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Animação do Hamburguer para X */
.menu-btn.is-open .bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-btn.is-open .bar:nth-child(2) {
  opacity: 0;
}

.menu-btn.is-open .bar:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Estilo do Menu Aberto */
@media (max-width: 992px) {
  .header {
    padding: 0 20px;
  }
  
  .nav {
    display: none; /* Escondido por padrão no mobile */
  }

  .menu-btn {
    display: flex;
  }
  
  .nav.open {
    display: flex;
    position: absolute;
    /* Usando a altura real do header (70px) */
    top: 70px; 
    right: 0;
    background: var(--color-dark-bg);
    flex-direction: column;
    width: 250px;
    padding: 20px;
    box-shadow: -2px 5px 15px rgba(0, 0, 0, 0.4);
    transform: translateX(100%); /* Inicialmente fora da tela */
    opacity: 0;
    pointer-events: none;
    border-radius: 0 0 0 10px;
  }

  .nav.open {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
  }

  .nav a {
    padding: 12px 10px;
    font-size: 1.1rem;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav a::after {
    display: none; /* Remove sublinhado para lista vertical */
  }
  
  /* Agrupamento em mobile */
  .access-links {
    flex-direction: column;
    border-left: none;
    padding-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    margin-top: 10px;
    padding-top: 10px;
    gap: 0;
  }
}
</style>