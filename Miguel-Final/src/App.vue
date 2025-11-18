<template>

<NavBar/>

<routerView/>
 <main class="content">
      <h2 class="slogan">
        Cuidar de pessoas é construir o futuro da organização.
      </h2>

      <!-- Botão que leva para a rota de cadastro -->
      <router-link to="/cadastro" class="main-btn">Fazer Cadastro</router-link>
    </main>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default{
    name: 'App',
    components:{
      NavBar
    }
  }
</script>

<style>



</style>