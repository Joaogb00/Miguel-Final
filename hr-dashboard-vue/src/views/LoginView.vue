<template>
  <div class="page">

    <div class="login-card">
      <h2>Bem-vindo</h2>
      <p class="subtitle">Acesse sua conta do painel RH</p>

      <form class="form" @submit.prevent="login">
        <!-- Campo Email -->
        <div class="input-group">
          <span class="icon">📧</span>
          <input v-model="email" type="email" placeholder="E-mail" required />
        </div>

        <!-- Campo Senha com botão mostrar -->
        <div class="input-group">
          <span class="icon">🔒</span>
          <input 
            :type="mostrarSenha ? 'text' : 'password'"
            v-model="password"
            placeholder="Senha"
            required
          />

          <button
            type="button"
            class="show-pass"
            @click="mostrarSenha = !mostrarSenha"
          >
            {{ mostrarSenha ? "🙈" : "👁️" }}
          </button>
        </div>

        <button type="submit" class="btn-login">
          Entrar
        </button>
      </form>

      <!-- Link adicional -->
      <p class="forgot-pass">
        <router-link to="/recuperar">Esqueci minha senha</router-link>
      </p>

      <p class="register-link">
        Não tem conta?
        <router-link to="/register">Criar conta</router-link>
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const mostrarSenha = ref(false)

function login() {
  // Pega lista de usuários cadastrados
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  // Procura o usuário
  const usuarioEncontrado = usuarios.find(
    u => u.email === email.value && u.senha === password.value
  );

  if (!usuarioEncontrado) {
    alert("Usuário ou senha incorretos.");
    return;
  }

  // 👉 Salva o usuário logado corretamente
  localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

  // 👉 Redireciona para o dashboard
  router.push("/dashboard");
}
</script>

<style scoped>
/* Fundo com animação suave */
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: 300% 300%;
  animation: gradient 7s ease infinite;
  padding: 20px;
  font-family: "Poppins", sans-serif;
}

/* Card moderno */
.login-card {
  width: 340px;
  padding: 40px 35px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  color: #fff;
  text-align: center;
  animation: fadeIn 0.6s ease;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;
}

/* Hover suave */
.login-card:hover {
  transform: scale(1.02);
}

/* Títulos */
h2 {
  margin-bottom: 6px;
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  margin-bottom: 25px;
  opacity: 0.8;
  font-size: 14px;
}

/* INPUTS */
.input-group {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  padding: 12px 14px;
  border-radius: 12px;
  margin-bottom: 16px;
  transition: background 0.25s ease;
}

.input-group:focus-within {
  background: rgba(255, 255, 255, 0.22);
}

.icon {
  margin-right: 10px;
  font-size: 18px;
}

input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 15px;
}

/* Mostrar senha */
.show-pass {
  background: none;
  border: none;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  opacity: 0.8;
  transition: opacity 0.25s;
}
.show-pass:hover {
  opacity: 1;
}

/* Botão login */
.btn-login {
  width: 100%;
  background: linear-gradient(90deg, #f6c90e, #ffd857);
  color: #1f2a44;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
}

.btn-login:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(246, 201, 14, 0.35);
}

/* Links */
.register-link,
.forgot-pass {
  margin-top: 15px;
  font-size: 14px;
}

.register-link a,
.forgot-pass a {
  text-decoration: none;
  color: #f6c90e;
  font-weight: 600;
}

.register-link a:hover,
.forgot-pass a:hover {
  opacity: 0.75;
}

/* Animações */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
