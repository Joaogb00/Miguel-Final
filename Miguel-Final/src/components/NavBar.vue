<template>
  <div class="page">
    <header class="header">
      <div class="logo">
        <h1>Recursos Humanos</h1>
      </div>

      <nav class="links">
        <router-link to="/teste">Sobre</router-link>
        <router-link to="/escalas">Escalas</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/cadastro">Cadastro</router-link>
      </nav>
    </header>

   
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
/* Seu CSS permanece igual */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", Arial, Helvetica, sans-serif;
}

.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(34, 116, 209, 0.85);
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.3);
  height: 80px;
  padding: 0 40px;
}

.logo h1 {
  color: #f1f1f1;
  font-size: 24px;
}

.links {
  display: flex;
  gap: 25px;
  align-items: center;
}

.links a {
  text-decoration: none;
  color: #fffdfd;
  font-weight: 600;
  transition: color 0.3s ease;
  cursor: pointer;
}

.links a:hover {
  color: #86b8e9;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a, #234b9a);
  color: white;
  text-align: center;
  padding: 0 20px;
}

.slogan {
  font-size: 32px;
  font-weight: 600;
  max-width: 700px;
  line-height: 1.4;
  margin-bottom: 35px;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  animation: fadeIn 2s ease forwards;
  background: linear-gradient(90deg, #6ab7ff, #a8e8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.main-btn {
  background-color: #2274d1;
  color: white;
  padding: 14px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.main-btn:hover {
  background-color: #2a8df7;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
