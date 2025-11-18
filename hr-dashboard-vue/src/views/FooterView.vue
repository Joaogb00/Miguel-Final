<template>
  <footer class="footer-rh">
    <div class="footer-content">

      <div class="footer-logo">
        <h2>Human resources</h2>
        <p>Gestão moderna, humana e estratégica.</p>
        <p class="frase-rh">“Pessoas são o centro de toda organização. Desenvolvê-las é nosso propósito.”</p>
      </div>

      <div class="footer-buttons">
        <router-link to="/dashboard" class="footer-btn">
          📊 Dashboard
        </router-link>

        <router-link to="/escala" class="footer-btn">
          📅 Escala
        </router-link>

        <router-link to="/" class="footer-btn">
          🏠 Início
        </router-link>
      </div>

    </div>

    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} RH Inteligente — Cuidando do capital humano com tecnologia.</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer-rh {
  background: #2b3a55;
  color: #fff;
  padding: 50px 20px 25px; /* mais alto */
  font-family: "Poppins", sans-serif;
}

/* conteúdo principal */
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: auto;
  gap: 40px; /* mais espaço */
}

/* logo e frase */
.footer-logo h2 {
  color: #f6c90e;
  margin-bottom: 8px;
  font-size: 26px;
}

.footer-logo p {
  font-size: 15px;
  opacity: 0.9;
}

.footer-rh {
  background: #2b3a55;
  color: #fff;
  padding: 25px 20px; /* DIMINUÍDO */
  font-family: "Poppins", sans-serif;
}

/* conteúdo */
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center; /* alinhado */
  flex-wrap: wrap;
  max-width: 1100px;
  margin: auto;
  gap: 20px; /* menor */
}

/* logo mais compacto */
.footer-logo h2 {
  color: #f6c90e;
  font-size: 22px; /* menor */
  margin-bottom: 4px;
}

.footer-logo p {
  font-size: 13px; /* menor */
  opacity: 0.85;
}

.footer-rh {
  background: #2b3a55;
  color: #fff;
  padding: 12px 20px; /* MUITO menor */
  font-family: "Poppins", sans-serif;
}

/* conteúdo ultra compacto */
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: auto;
  gap: 10px;
}

/* logo reduzido */
.footer-logo h2 {
  color: #f6c90e;
  font-size: 18px; /* menor */
  margin: 0;
}

.footer-logo p,
.frase-rh {
  display: none; /* REMOVE textos extras p/ ficar pequeno */
}

/* botões bem pequenos */
.footer-buttons {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.footer-btn {
  padding: 6px 12px; /* menor */
  background: #f6c90e;
  color: #1f2a44;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  font-size: 13px;
  transition: 0.2s ease;
}

.footer-btn:hover {
  background: #ffe27a;
  transform: scale(1.02);
}

/* parte inferior extremamente discreta */
.footer-bottom {
  margin-top: 10px;
  text-align: center;
  font-size: 11px; /* bem pequeno */
  padding-top: 6px;
  border-top: 1px solid rgba(255,255,255,0.15);
}

/* MOBILE */
@media (max-width: 820px) {
  .footer-content {
    flex-direction: column;
    gap: 8px;
  }

  .footer-buttons {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .footer-btn {
    width: auto;
  }
}

</style>
