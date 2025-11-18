<template>
  <div class="page">
    <h2 class="title-anim">Cadastrar Usuário</h2>

    <form class="form form-anim" @submit.prevent="register">

      <input 
        type="text" 
        placeholder="Nome completo" 
        v-model="name" 
        required 
      />

      <input 
        type="email" 
        placeholder="E-mail" 
        v-model="email" 
        required 
      />

      <!-- TELEFONE -->
      <input 
        type="tel" 
        placeholder="Telefone (ex: 11 99999-9999)" 
        v-model="phone" 
        required 
      />

      <input 
        type="password" 
        placeholder="Senha" 
        v-model="password" 
        required 
      />

      <select v-model="role" required>
        <option disabled value="">Selecione o cargo</option>
        <option>Analista de RH</option>
        <option>Recrutador</option>
        <option>Assistente de RH</option>
        <option>Coordenador de RH</option>
        <option>Gerente de RH</option>
        <option>Estagiário de RH</option>
        <option>Especialista em Treinamento</option>
        <option>Business Partner (BP)</option>
      </select>

      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const phone = ref('') // ← novo campo
const password = ref('')
const role = ref('')

function register() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  const novoUsuario = {
    nome: name.value,
    email: email.value,
    telefone: phone.value, // ← salvo!
    senha: password.value,
    cargo: role.value,

    departamento: "RH",
    admissao: new Date().toLocaleDateString(),
    nivel: "Usuário"
  };

  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // salva como logado
  localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));

  router.push("/login");
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding-top: 120px;
  color: #2b3a55;
  font-family: "Poppins", sans-serif;
}

.title-anim {
  margin-bottom: 25px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0;
  animation: slideDown 0.8s ease forwards;
}

.form-anim {
  opacity: 0;
  animation: fadeUp 1.2s ease forwards;
}

.form {
  background: #fff;
  color: #333;
  padding: 35px;
  border-radius: 15px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-top: 4px solid #2b3a55;
}

input,
select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
}

input:focus,
select:focus {
  border-color: #2b3a55;
  box-shadow: 0 0 6px rgba(43, 58, 85, 0.3);
}

button {
  background: #2b3a55;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(43, 58, 85, 0.3);
}

button:hover {
  background: #f6c90e;
  color: #2b3a55;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(246, 201, 14, 0.4);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-100px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 400px) {
  .form {
    width: 90%;
  }
}
</style>
