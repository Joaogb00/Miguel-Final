<template>
  <footer class="footer-rh">
    <div class="footer-content">

      <div class="footer-logo">
        <h2>Recursos Humanos <span class="highlight">Inteligente</span></h2>
        <p class="tagline">Gestão moderna, humana e estratégica.</p>
        <p class="frase-rh">“Pessoas são o centro de toda organização. Desenvolvê-las é nosso propósito.”</p>
      </div>

      <div class="footer-buttons">
        <router-link to="/dashboard" class="footer-btn btn-action">
          <i class="fas fa-chart-line"></i> Dashboard
        </router-link>

        <router-link to="/escala" class="footer-btn btn-action">
          <i class="fas fa-calendar-alt"></i> Escala
        </router-link>

        <router-link to="/" class="footer-btn btn-secondary">
          <i class="fas fa-home"></i> Início
        </router-link>
      </div>

    </div>

    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} RH Inteligente. Todos os direitos reservados. Cuidando do capital humano com tecnologia.</p>
    </div>
  </footer>
</template>

<script setup>
// Ícones do Font Awesome (Apenas para referência visual)
</script>

<style scoped>
/* ====================================
   1. Variáveis e Layout Geral
   ==================================== */
:root {
  --color-dark-bg: #1f2a44; /* Fundo Escuro Principal */
  --color-secondary-bg: #2b3a55; /* Fundo Secundário (para o bottom) */
  --color-primary-accent: #007bff; /* Azul de Destaque/Ação */
  --color-text-light: #e0e6ed; /* Texto Claro */
  --color-highlight: #ffc107; /* Amarelo/Dourado para destaque visual */
}

.footer-rh {
  background: var(--color-dark-bg);
  color: var(--color-text-light);
  padding: 40px 20px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.2);
}

/* Conteúdo principal - Alinhamento e Espaçamento */
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Mantém o alinhamento superior para botões */
  flex-wrap: wrap;
  max-width: 1200px;
  margin: auto;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  gap: 30px;
}

/* ====================================
   2. Logo e Textos
   ==================================== */
.footer-logo {
  max-width: 500px;
}

.footer-logo h2 {
  color: var(--color-text-light);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  border-bottom: 2px solid var(--color-primary-accent);
  padding-bottom: 5px;
  display: inline-block;
}

.footer-logo .highlight {
    color: var(--color-primary-accent);
}

.tagline {
  font-size: 0.95rem;
  opacity: 0.9;
  margin-bottom: 15px;
}

.frase-rh {
  font-style: italic;
  font-size: 0.9rem;
  color: var(--color-highlight);
  border-left: 3px solid var(--color-highlight);
  padding-left: 10px;
}

/* ====================================
   3. Botões de Navegação
   ==================================== */
.footer-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.footer-btn {
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 160px;
  justify-content: flex-start;
}

/* Botões de Ação (Dashboard, Escala) */
.btn-action {
  background: var(--color-primary-accent);
  color: var(--color-surface-white); /* Assumindo branco, mas pode ser qualquer cor clara */
}

.btn-action:hover {
  background: #0056b3;
  transform: translateX(4px);
}

/* Botão Secundário (Início) */
.btn-secondary {
  background: transparent;
  color: var(--color-text-light);
  border: 1px solid var(--color-text-light);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
  color: var(--color-primary-accent);
  border-color: var(--color-primary-accent);
}

/* ====================================
   4. Bottom Copyright
   ==================================== */
.footer-bottom {
  margin-top: 20px;
  text-align: center;
  font-size: 0.8rem;
  padding-top: 10px;
  color: rgba(255, 255, 255, 0.6);
}

/* Responsividade */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-logo {
    max-width: 100%;
    margin-bottom: 20px;
  }
  
  .footer-logo h2 {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  .frase-rh {
    border-left: none;
    padding-left: 0;
    margin-top: 15px;
  }

  .footer-buttons {
    width: 100%;
    align-items: center;
  }
  
  .footer-btn {
      width: 80%;
      max-width: 250px;
      justify-content: center;
  }
}
</style>