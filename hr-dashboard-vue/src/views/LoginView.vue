<template>
  <div class="page">
    <div class="login-card">
      <div class="header">
        <i class="fas fa-users-cog"></i>
        <h2>Acesso ao Painel RH</h2>
        <p class="subtitle">Insira suas credenciais para continuar.</p>
      </div>

      <form class="form" @submit.prevent="login">
        <!-- Notificação de Erro -->
        <div v-if="erroMensagem" class="alert-error">
          <i class="fas fa-exclamation-circle"></i> {{ erroMensagem }}
        </div>

        <!-- Campo Email -->
        <div class="input-group">
          <i class="fas fa-envelope icon"></i>
          <input v-model="email" type="email" placeholder="E-mail Corporativo" required />
        </div>

        <!-- Campo Senha com botão mostrar -->
        <div class="input-group password-group">
          <i class="fas fa-lock icon"></i>
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
            title="Mostrar Senha"
          >
            <i :class="mostrarSenha ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>

        <button type="submit" class="btn-login">
          <i class="fas fa-sign-in-alt"></i> Entrar
        </button>
      </form>

      <!-- Links adicionais -->
      <div class="links-footer">
        <p class="forgot-pass">
          <router-link to="/recuperar">Esqueceu sua senha?</router-link>
        </p>
        <p class="register-link">
          Ainda não é cadastrado?
          <router-link to="/register">Crie sua conta aqui</router-link>
        </p>
      </div>
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
const erroMensagem = ref('')

function login() {
  erroMensagem.value = ''; // Limpa erro anterior

  // Pega lista de usuários cadastrados
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  // Procura o usuário
  const usuarioEncontrado = usuarios.find(
    u => u.email === email.value && u.senha === password.value
  );

  if (!usuarioEncontrado) {
    // Altera a mensagem de erro no UI, em vez de usar alert()
    erroMensagem.value = "Usuário ou senha inválidos. Tente novamente.";
    return;
  }

  // 👉 Salva o usuário logado corretamente
  localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

  // 👉 Redireciona para o dashboard
  router.push("/cadastrado");
}
</script>

<style scoped>
/* ====================================
   1. Variáveis & Fundo
   ==================================== */
:root {
  --color-primary-blue: #007bff; /* Cor de Ação/Destaque */
  --color-accent-yellow: #ffc107; /* Amarelo Secundário/Sucesso */
  --color-text-dark: #212529; /* Texto Principal */
  --color-surface-white: #ffffff; /* Fundo do Card */
  --color-error: #dc3545; /* Cor de Erro */
  --shadow-default: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Fundo corporativo com degradê suave */
  background: linear-gradient(135deg, #e9f0ff 0%, #ffffff 50%, #f4f6f9 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: auto; /* Garante que funcione bem em telas pequenas */
}

/* ====================================
   2. Card de Login
   ==================================== */
.login-card {
  width: 100%;
  max-width: 380px;
  padding: 40px;
  background: var(--color-surface-white);
  border-radius: 12px;
  color: var(--color-text-dark);
  text-align: center;
  box-shadow: var(--shadow-default);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 5px solid var(--color-primary-blue);
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.header {
  margin-bottom: 30px;
}

.header .fa-users-cog {
  font-size: 3rem;
  color: var(--color-primary-blue);
  margin-bottom: 15px;
}

h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: var(--color-text-dark);
}

.subtitle {
  opacity: 0.7;
  font-size: 0.95rem;
  color: #6c757d;
}

/* ====================================
   3. Campos de Formulário
   ==================================== */
.input-group {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-group:focus-within {
  border-color: var(--color-primary-blue);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
  background: var(--color-surface-white);
}

.icon {
  margin-right: 12px;
  font-size: 1.1rem;
  color: #6c757d;
  transition: color 0.3s;
}
.input-group:focus-within .icon {
    color: var(--color-primary-blue);
}

input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-text-dark);
  font-size: 1rem;
  padding: 0;
}
input::placeholder {
    color: #adb5bd;
}

/* Botão Mostrar Senha */
.password-group {
  position: relative;
}

.show-pass {
  background: none;
  border: none;
  color: #6c757d;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  opacity: 0.8;
  transition: opacity 0.25s, color 0.3s;
}
.show-pass:hover {
  opacity: 1;
  color: var(--color-primary-blue);
}

/* ====================================
   4. Botão de Login
   ==================================== */
.btn-login {
  width: 100%;
  background: var(--color-primary-blue);
  color: var(--color-surface-white);
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.25s ease, transform 0.25s ease;
}

.btn-login:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.4);
}

/* ====================================
   5. Mensagem de Erro
   ==================================== */
.alert-error {
  background: #f8d7da;
  color: var(--color-error);
  border: 1px solid #f5c6cb;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ====================================
   6. Links
   ==================================== */
.links-footer {
    margin-top: 25px;
    padding-top: 15px;
    border-top: 1px dashed #e9ecef;
}
.register-link,
.forgot-pass {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #6c757d;
}

.register-link a,
.forgot-pass a {
  text-decoration: none;
  color: var(--color-primary-blue);
  font-weight: 600;
}

.register-link a:hover,
.forgot-pass a:hover {
  text-decoration: underline;
  opacity: 0.8;
}

/* Responsividade */
@media (max-width: 450px) {
  .login-card {
    padding: 30px 20px;
  }
}
</style>