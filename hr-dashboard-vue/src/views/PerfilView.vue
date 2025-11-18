<template>
  <div class="perfil-page" v-if="usuario">
    
    <!-- CARD DO PERFIL -->
    <div class="perfil-card">

      <!-- CABEÇALHO -->
      <div class="perfil-header">
        <div class="avatar">{{ usuario.nome.charAt(0).toUpperCase() }}</div>
        <h2>{{ usuario.nome }}</h2>
        <p class="cargo">{{ usuario.cargo }}</p>
      </div>

      <!-- DETALHES DO PERFIL -->
      <div class="info">
        <p><strong> E-mail:</strong> {{ usuario.email }}</p>
        <p><strong> Departamento:</strong> {{ usuario.departamento }}</p>
        <p><strong> Admissão:</strong> {{ usuario.admissao }}</p>

        <hr />

        <p><strong> Registro:</strong> {{ usuario.registro || "Não informado" }}</p>
        <p><strong> Telefone:</strong> {{ usuario.telefone || "Não cadastrado" }}</p>
        <p><strong> Status:</strong> Ativo</p>
        <p><strong> Nível de Acesso:</strong> {{ usuario.nivel || "Usuário" }}</p>
      </div>

      <!-- BOTÕES -->
      <div class="btn-group">

        <button @click="editarPerfil" class="edit-btn">
           Editar Perfil
        </button>

        <button @click="sair" class="logout-btn">
           Sair
        </button>
      </div>

      <!-- ÁREA EXCLUSIVA PARA GERENTE -->
      <div v-if="usuario.nivel === 'Gerente'" class="gerente-box">
        <h3>🔒 Área do Gerente</h3>
        <p>Gerencie colaboradores e permissões.</p>

        <button @click="removerFuncionario" class="danger-btn">
          ❌ Remover Funcionário
        </button>
      </div>

    </div>
  </div>

  <!-- QUANDO NÃO HÁ USUÁRIO LOGADO -->
  <div v-else class="no-user">
    <h2>Nenhum usuário logado </h2>
    <p>Faça login para visualizar seu perfil.</p>

    <router-link to="/login" class="login-link">
      Ir para Login
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const usuario = ref(null);

onMounted(() => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (usuarioLogado) usuario.value = usuarioLogado;
});

function sair() {
  localStorage.removeItem("usuarioLogado");
  usuario.value = null;
  return router.push("/login");
}

function editarPerfil() {
  alert("⚠️ Em breve você poderá editar o perfil!");
}

function removerFuncionario() {
  const confirmar = confirm(
    "⚠️ Tem certeza que deseja remover este funcionário? Essa ação não pode ser desfeita."
  );

  if (!confirmar) return;

  localStorage.removeItem("usuarioLogado");

  // Garanta que o componente não tente renderizar mais nada
  usuario.value = null;

  alert("❌ Funcionário removido com sucesso!");

  return router.push("/login");
}
</script>

<style scoped>
.perfil-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 86vh;
  font-family: "Poppins", sans-serif;
  padding: 20px;
}

.perfil-card {
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  width: 380px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  animation: fadeIn 0.6s ease;
}

.perfil-header {
  margin-bottom: 20px;
}

.avatar {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: #2b3a55;
  color: #fff;
  font-size: 34px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 10px;
}

.cargo {
  color: #f6c90e;
  font-weight: 600;
  font-size: 15px;
}

.info {
  text-align: left;
  font-size: 14px;
  background: #f8fafc;
  padding: 15px;
  border-radius: 10px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
}

.info p {
  margin: 6px 0;
  color: #333;
}

hr {
  border: none;
  height: 1px;
  background: #d9d9d9;
  margin: 12px 0;
}

.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.edit-btn {
  flex: 1;
  background: #f6c90e;
  color: #2b3a55;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.edit-btn:hover {
  background: #ffde57;
}

.logout-btn {
  flex: 1;
  background: #2b3a55;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

.logout-btn:hover {
  background: #1e2a3a;
}

/* Área do gerente */
.gerente-box {
  margin-top: 25px;
  background: #fff4f4;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ffb4b4;
  text-align: left;
}

.gerente-box h3 {
  margin-bottom: 8px;
  color: #c72525;
}

.danger-btn {
  width: 100%;
  background: #d62828;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.danger-btn:hover {
  background: #a31313;
}

.no-user {
  text-align: center;
  padding: 40px;
}

.login-link {
  display: inline-block;
  margin-top: 15px;
  color: #2b3a55;
  font-weight: bold;
  text-decoration: none;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
