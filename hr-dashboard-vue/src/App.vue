<template>
  <div class="app-container">

    <!-- Imagem só na primeira tela -->
    <div v-if="route.path === '/'" class="background-image"></div>

    <!-- Header -->
  
    <HeaderBar />


      

    <!-- Conteúdo principal -->
    <div class="content">
      <main class="main-content">
        <router-view />

      </main>
    </div>

  </div>
  <FooterView />
</template>

<script setup>
import HeaderBar from './components/HeaderBar.vue'
import { useRoute } from 'vue-router'
import FooterView from './views/FooterView.vue';

const route = useRoute()
</script>

<style scoped>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Container geral da página */
.app-container {
  position: relative;
  min-height: 100vh;
  background: #e5e5e5; /* Cinza suave */
  overflow: hidden;
}



/* Área do conteúdo */
.content {
  display: flex;
  min-height: calc(100vh - 60px); /* considera altura do header */
  background: #e5e5e5; /* fundo cinza */
}

/* Conteúdo principal */
.main-content {
  flex: 1;
  padding: 20px;
}
</style>
