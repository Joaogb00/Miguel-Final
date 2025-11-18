<template>
  <header class="header">
    <div class="logo-area">
      <h1>Human <span>Resources</span></h1>
    </div>

    <nav class="nav" :class="{ open: menuOpen }">

    
      <router-link to="/home" active-class="active">Inicio</router-link>
       <router-link to="/escala" active-class="active">Escala</router-link>
      <router-link to="/dashboard" active-class="active">Dashboard</router-link>
      <router-link to="/login" active-class="active">Entrar</router-link>
      <router-link to="/register" active-class="active">Cadastrar</router-link>
      <router-link to="/perfil" active-class="active">Perfil</router-link>

    </nav>

    <!-- Botão hamburguer responsivo -->
    <div class="menu-btn" @click="menuOpen = !menuOpen">
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style scoped>
/* --- Header principal --- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #2b3a55, #3b4a6a);
  color: white;
  padding: 2rem 3rem; /* ← AUMENTADO */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: "Poppins", sans-serif;
  height: 90px; /* ← ALTURA MAIOR */
}


/* --- Logo --- */
.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
}

h1 {
  font-size: 24px; /* ← aumentado */
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
}

h1 span {
  color: #f6c90e;
}

/* --- Navegação --- */
.nav {
  display: flex;
  gap: 30px;
  transition: all 0.3s ease;
}

.nav a {
  color: #f8fafc;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px; /* ← levemente maior */
  position: relative;
  transition: all 0.3s ease;
}

.nav a::after {
  content: "";
  position: absolute;
  bottom: -6px; /* ← ajustado para header maior */
  left: 0;
  width: 0;
  height: 2px;
  background: #f6c90e;
  transition: width 0.3s ease;
}

.nav a:hover::after,
.nav a.active::after {
  width: 100%;
}

.nav a:hover {
  color: #f6c90e;
}

/* --- Rota ativa --- */
.active {
  color: #f6c90e;
  font-weight: 600;
}

/* --- Botão de menu (mobile) --- */
.menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  gap: 6px;
}

.menu-btn span {
  display: block;
  width: 26px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-btn span.open:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.menu-btn span.open:nth-child(2) {
  opacity: 0;
}

.menu-btn span.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* --- Responsivo --- */
@media (max-width: 850px) {
  .nav {
    position: absolute;
    top: 85px; /* ← ajustado para header maior */
    right: 0;
    background: #2b3a55;
    flex-direction: column;
    width: 220px;
    padding: 25px;
    border-radius: 0 0 0 10px;
    box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-20px);
    opacity: 0;
    pointer-events: none;
  }

  .nav.open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .nav a {
    padding: 12px 0;
    font-size: 17px;
  }

  .menu-btn {
    display: flex;
  }
}
</style>
