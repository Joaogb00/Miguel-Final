<template>
  <div class="page-container">
    <div class="register-card">
      <div class="header">
        <i class="fas fa-user-plus header-icon"></i>
        <h2>Novo Cadastro RH</h2>
        <p class="subtitle">Preencha seus dados para acessar a plataforma.</p>
      </div>

      <form class="form" @submit.prevent="register">
        <div v-if="feedbackMsg" :class="['feedback', feedbackType]">
          <i :class="getFeedbackIcon"></i> {{ feedbackMsg }}
        </div>

        <div class="input-group">
          <i class="fas fa-user icon"></i>
          <input 
            type="text" 
            placeholder="Nome Completo" 
            v-model="name" 
            required 
          />
        </div>

        <div class="input-group">
          <i class="fas fa-envelope icon"></i>
          <input 
            type="email" 
            placeholder="E-mail Corporativo" 
            v-model="email" 
            required 
          />
        </div>

        <div class="input-group">
          <i class="fas fa-phone icon"></i>
          <input 
            type="tel" 
            placeholder="Telefone (ex: 11 99999-9999)" 
            v-model="phone" 
            required 
          />
        </div>

        <div class="input-group">
          <i class="fas fa-lock icon"></i>
          <input 
            type="password" 
            placeholder="Crie uma Senha" 
            v-model="password" 
            required 
          />
        </div>

        <div class="input-group">
          <i class="fas fa-briefcase icon"></i>
          <select v-model="role" required>
            <option disabled value="">Selecione seu Cargo</option>
            <option>Analista de RH</option>
            <option>Recrutador</option>
            <option>Assistente de RH</option>
            <option>Coordenador de RH</option>
            <option>Gerente de RH</option>
            <option>Estagiário de RH</option>
            <option>Especialista em Treinamento</option>
            <option>Business Partner (BP)</option>
          </select>
        </div>

        <button type="submit" class="btn-register">
          <i class="fas fa-save"></i> Finalizar Cadastro
        </button>
      </form>

      <p class="login-link-footer">
          Já possui uma conta? <router-link to="/login">Faça Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const role = ref('')
const feedbackMsg = ref('');
const feedbackType = ref('');

const getFeedbackIcon = computed(() => {
    if (feedbackType.value === 'success') return 'fas fa-check-circle';
    if (feedbackType.value === 'error') return 'fas fa-exclamation-circle';
    return '';
});

function showFeedback(message, type = 'info') {
    feedbackMsg.value = message;
    feedbackType.value = type;
    setTimeout(() => {
        feedbackMsg.value = '';
        feedbackType.value = '';
    }, 4000);
}

function register() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  // Verifica se o email já está em uso
  if (usuarios.some(u => u.email === email.value)) {
      showFeedback('Este e-mail já está cadastrado. Tente fazer login.', 'error');
      return;
  }
  
  const novoUsuario = {
    nome: name.value,
    email: email.value,
    telefone: phone.value,
    senha: password.value,
    cargo: role.value,
    departamento: "RH",
    admissao: new Date().toLocaleDateString('pt-BR'),
    nivel: role.value.includes('Gerente') ? 'Gerente' : 'Usuário' // Define nível baseado no cargo
  };

  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  showFeedback('Cadastro realizado com sucesso! Redirecionando para o login...', 'success');
  
  // CORRIGIDO: Não salva como logado, mas redireciona para o login
  setTimeout(() => {
    console.log("")
      router.push("/login");
      
  }, 2000); 
}
</script>

<style scoped>
/* ====================================
   1. Variáveis & Fundo
   ==================================== */
:root {
  --color-primary-blue: #007bff;
  --color-secondary-grey: #6c757d;
  --color-background-light: #f4f6f9;
  --color-surface-white: #ffffff;
  --color-text-dark: #212529;
  --color-success: #28a745;
  --color-error: #dc3545;
  --shadow-default: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-background-light);
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* ====================================
   2. Card de Registro
   ==================================== */
.register-card {
  width: 100%;
  max-width: 400px;
  background: var(--color-surface-white);
  padding: 40px;
  border-radius: 12px;
  box-shadow: var(--shadow-default);
  text-align: center;
  border-top: 5px solid var(--color-primary-blue);
  animation: fadeIn 0.8s ease-out;
}

.header {
  margin-bottom: 30px;
}

.header-icon {
  font-size: 3rem;
  color: var(--color-primary-blue);
  margin-bottom: 10px;
}

h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 5px;
}

.subtitle {
  font-size: 0.95rem;
  color: var(--color-secondary-grey);
}

/* ====================================
   3. Formulário e Inputs
   ==================================== */
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 0 15px;
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-group:focus-within {
  border-color: var(--color-primary-blue);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
  background: var(--color-surface-white);
}

.icon {
  margin-right: 12px;
  font-size: 1rem;
  color: #adb5bd;
}

input,
select {
  flex: 1;
  padding: 12px 0;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--color-text-dark);
  outline: none;
}
select {
    appearance: none; /* Remove estilo nativo */
    cursor: pointer;
}

input::placeholder, select:disabled {
    color: #adb5bd;
}


/* ====================================
   4. Botão de Cadastro
   ==================================== */
.btn-register {
  background: var(--color-primary-blue);
  color: var(--color-surface-white);
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-register:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 123, 255, 0.3);
}

/* ====================================
   5. Feedback/Notificações
   ==================================== */
.feedback {
    padding: 12px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.95rem;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: slideDown 0.3s ease;
    margin-bottom: 5px;
}
.feedback.success {
    background: #d4edda;
    color: var(--color-success);
    border: 1px solid #c3e6cb;
}
.feedback.error {
    background: #f8d7da;
    color: var(--color-error);
    border: 1px solid #f5c6cb;
}

/* ====================================
   6. Link de Login
   ==================================== */
.login-link-footer {
    margin-top: 20px;
    font-size: 0.9rem;
    color: var(--color-secondary-grey);
}

.login-link-footer a {
    color: var(--color-primary-blue);
    font-weight: 600;
    text-decoration: none;
}

.login-link-footer a:hover {
    text-decoration: underline;
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Responsividade */
@media (max-width: 450px) {
  .register-card {
    padding: 30px 20px;
  }
}
</style>