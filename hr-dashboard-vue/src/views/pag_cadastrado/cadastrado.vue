<template>
    <Headercadastrado/>
  <div class="landing-page">
    <header class="hero-header">
      <nav class="top-nav">
        </nav>
    </header>
    <main class="hero-section">
      <div class="content-container">
        <h1 class="main-title">
          
          <span class="highlight">Gestão de Talentos</span>
        </h1>
        
        <p class="tagline">
          Automatize e otimize a administração de Recursos Humanos,
          liberando sua equipe para focar no crescimento estratégico.
        </p>

        <div class="action-buttons">
          <router-link to="/dashboard" class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i> Minha Dashboard
          </router-link>
          
        </div>
      </div>

      <div class="visual-accent"></div>
    </main>
  </div>
</template>

<script>
import Headercadastrado from './headercadastrado.vue';

export default{
    name:'cadastrado',
    components:{
        Headercadastrado
    }
}
// Se você quiser usar ícones, certifique-se de ter o Font Awesome (fas) instalado.
// Ex: npm install @fortawesome/fontawesome-free
</script>

<style scoped>
/* ====================================
   1. Variáveis & Animações Keyframes
   ==================================== */

/* Definindo cores e espaçamentos globais */
:root {
  --color-primary: #007bff; /* Azul vibrante para ação */
  --color-secondary: #6c757d; /* Cinza para elementos secundários */
  --color-text: #343a40; /* Texto escuro */
  --color-background: #f8f9fa; /* Fundo claro */
  --color-white: #ffffff;
  --max-width: 1200px;
}

/* Animação de Fade In (entrada suave) */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Animação de Fade In Ligeiro (para elementos secundários) */
@keyframes fadeInLight {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ====================================
   2. Layout Principal
   ==================================== */

.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  font-family: 'Arial', sans-serif; /* Use uma fonte mais profissional, se disponível */
  color: var(--color-text);
  overflow: hidden; /* Garantir que a animação não cause scroll */
}

/* ====================================
   3. Seção Hero (Conteúdo principal)
   ==================================== */

.hero-section {
  width: 90%;
  max-width: var(--max-width);
  padding: 80px 20px;
  text-align: center;
}

.content-container {
  max-width: 700px;
  margin: 0 auto;
}

/* Título */
.main-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
  color: var(--color-text);
  
  /* Aplica a animação com um pequeno atraso */
  animation: fadeIn 0.8s ease-out 0.2s forwards;
  opacity: 0; /* Inicia invisível */
}

.highlight {
  color: var(--color-primary);
  display: block; /* Quebra a linha ou destaca mais */
}

/* Subtítulo/Tagline */
.tagline {
  font-size: 1.25rem;
  margin-bottom: 40px;
  color: var(--color-secondary);
  
  /* Aplica a animação com atraso maior */
  animation: fadeIn 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

/* ====================================
   4. Botões de Ação
   ==================================== */

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  
  /* Aplica a animação com o maior atraso */
  animation: fadeIn 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

.btn {
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px; /* Cantos mais suaves */
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: 2px solid var(--color-primary);
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3); /* Sombra sutil */
}

.btn-primary:hover {
  background-color: #0056b3; /* Um pouco mais escuro no hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 123, 255, 0.4);
}

.btn-secondary {
  background-color: var(--color-white);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-secondary:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-2px);
}

/* ====================================
   5. Detalhes Visuais
   ==================================== */

.visual-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 123, 255, 0.15) 0%, transparent 70%);
  z-index: -1;
  /* Animação de fundo para não parecer estático */
  animation: fadeInLight 2s ease-out forwards;
  opacity: 0;
}

/* Ajuste para telas menores */
@media (max-width: 600px) {
  .main-title {
    font-size: 2.2rem;
  }
  .tagline {
    font-size: 1rem;
  }
  .action-buttons {
    flex-direction: column;
    gap: 15px;
  }
  .btn {
    width: 100%;
  }
}
</style>