<template>
  <Headercadastrado/>
  <div class="page-container">
    <div class="perfil-page" v-if="usuario">

      <div class="perfil-card">

        <div class="perfil-header">
          <div class="avatar">
            <i class="fas fa-user-circle avatar-icon"></i>
          </div>
          <h2>{{ usuario.nome }}</h2>
          <p class="cargo">{{ usuario.cargo }}</p>
        </div>

        <div class="info-block">
          <h3>Informações Básicas</h3>
          <div class="info-grid">
            <p><strong><i class="fas fa-envelope icon-label"></i> E-mail:</strong> <span>{{ usuario.email }}</span></p>
            <p><strong><i class="fas fa-briefcase icon-label"></i> Departamento:</strong> <span>{{ usuario.departamento }}</span></p>
            <p><strong><i class="fas fa-calendar-check icon-label"></i> Admissão:</strong> <span>{{ usuario.admissao }}</span></p>
            
            <hr class="divider" />
            
            <p><strong><i class="fas fa-id-badge icon-label"></i> Registro:</strong> <span>{{ usuario.registro || "N/A" }}</span></p>
            <p><strong><i class="fas fa-phone icon-label"></i> Telefone:</strong> <span>{{ usuario.telefone || "N/C" }}</span></p>
            <p><strong><i class="fas fa-check-circle icon-label status-active"></i> Status:</strong> <span>Ativo</span></p>
            <p><strong><i class="fas fa-shield-alt icon-label"></i> Nível de Acesso:</strong> <span>{{ usuario.nivel || "Usuário" }}</span></p>
          </div>
        </div>

        <div class="btn-group">
          <button @click="editarPerfil" class="btn btn-primary edit-btn">
            <i class="fas fa-user-edit"></i> Editar Perfil
          </button>

          <button @click="sair" class="btn btn-secondary logout-btn">
            <i class="fas fa-sign-out-alt"></i> Sair
          </button>
        </div>

        <div v-if="usuario.nivel === 'Gerente'" class="gerente-box">
          <h3><i class="fas fa-user-secret"></i> Área Administrativa</h3>
          <p>Opções exclusivas para gestão e manutenção de colaboradores.</p>

          <button @click="removerFuncionario" class="btn danger-btn">
            <i class="fas fa-trash-alt"></i> Remover Funcionário
          </button>
        </div>

        <div v-if="feedbackMsg" :class="['feedback', feedbackType]">
            {{ feedbackMsg }}
        </div>
      </div>
    </div>

    <div v-else class="no-user">
      <i class="fas fa-exclamation-triangle empty-icon"></i>
      <h2>Acesso Negado</h2>
      <p>Você precisa estar logado para visualizar seu perfil.</p>

      <router-link to="/login" class="btn btn-primary login-link">
        Ir para Login
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// Importação do componente de cabeçalho
import Headercadastrado from "./pag_cadastrado/headercadastrado.vue";


const router = useRouter();
const usuario = ref(null);
const feedbackMsg = ref('');
const feedbackType = ref('');

// Função para exibir feedback no UI
function showFeedback(message, type = 'info') {
    feedbackMsg.value = message;
    feedbackType.value = type;
    setTimeout(() => {
        feedbackMsg.value = '';
        feedbackType.value = '';
    }, 3000);
}

onMounted(() => {
  // CORRIGIDO: Usando a chave correta 'usuario' que foi usada no login
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
  if (usuarioLogado) {
    usuario.value = usuarioLogado;
  }
});

function sair() {
  localStorage.removeItem("usuario");
  usuario.value = null;
  showFeedback('Você saiu da sua conta.', 'success');
  // Pequeno delay para a mensagem aparecer antes de redirecionar
  setTimeout(() => {
      router.push("/login");
  }, 500);
}

function editarPerfil() {
  // Usando feedback profissional no UI
  showFeedback("Em breve você poderá editar seu perfil!", 'warning');
}

function removerFuncionario() {
  const nomeFuncionario = usuario.value.nome;
  
  // Mantendo o confirm nativo por ser uma ação de alto risco
  const confirmar = confirm(
    `ATENÇÃO: Você tem certeza que deseja remover ${nomeFuncionario}? Essa ação não pode ser desfeita.`
  );

  if (!confirmar) return;

  // Lógica de remoção real de funcionário (simulação)
  // 1. Remover o usuário da lista geral de 'usuarios' no localStorage
  const todosUsuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const novaLista = todosUsuarios.filter(u => u.email !== usuario.value.email);
  localStorage.setItem("usuarios", JSON.stringify(novaLista));

  // 2. Limpar a sessão do usuário atual
  localStorage.removeItem("usuario");

  showFeedback(`Funcionário ${nomeFuncionario} removido com sucesso!`, 'success');

  // Garanta que o componente não tente renderizar mais nada
  usuario.value = null; 

  setTimeout(() => {
      router.push("/login");
  }, 1000);
}
</script>

<style scoped>
/* ====================================
    1. Variáveis & Layout Geral
    ==================================== */
:root {
  --color-primary-blue: #007bff;
  --color-secondary-grey: #6c757d;
  --color-accent-yellow: #ffc107;
  --color-background-light: #f4f6f9;
  --color-surface-white: #ffffff;
  --color-text-dark: #212529;
  --color-danger: #dc3545;
  --shadow-default: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.page-container {
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background-light);
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* ====================================
    2. Card de Perfil
    ==================================== */
.perfil-card {
  background: var(--color-surface-white);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  text-align: center;
  box-shadow: var(--shadow-default);
  animation: fadeIn 0.6s ease;
  border-top: 4px solid var(--color-primary-blue);
}

.perfil-header {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
}

/* Avatar com Ícone */
.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: var(--color-primary-blue);
  color: var(--color-surface-white);
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
}

.cargo {
  color: var(--color-secondary-grey);
  font-weight: 500;
  font-size: 1rem;
}

/* ====================================
    3. Bloco de Informações
    ==================================== */
.info-block {
  text-align: left;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.info-block h3 {
    font-size: 1.1rem;
    color: var(--color-text-dark);
    margin-top: 0;
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px dashed #e9ecef;
}

.info-grid p {
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dotted #dee2e6;
  padding-bottom: 5px;
}

.info-grid p:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.info-grid strong {
  font-weight: 600;
  color: var(--color-text-dark);
  display: flex;
  align-items: center;
  gap: 8px;
}
.info-grid span {
    font-weight: 500;
    color: var(--color-secondary-grey);
}

.icon-label {
    color: var(--color-primary-blue);
    font-size: 0.9em;
}
.status-active {
    color: #28a745; /* Verde para status ativo */
}

.divider {
  border: none;
  height: 1px;
  background: #d9d9d9;
  margin: 15px 0;
}

/* ====================================
    4. Botões e Ações
    ==================================== */
.btn-group {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.btn {
  flex: 1;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: var(--color-primary-blue);
  color: var(--color-surface-white);
}

.btn-primary:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
}

.btn-secondary {
  background: #f1f3f5;
  color: var(--color-text-dark);
  border: 1px solid #ced4da;
}

.btn-secondary:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

/* Área do gerente */
.gerente-box {
  margin-top: 20px;
  background: #fff0f0; /* Fundo mais suave para perigo */
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
  text-align: left;
}

.gerente-box h3 {
  margin-bottom: 8px;
  color: var(--color-danger);
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.danger-btn {
  width: 100%;
  background: var(--color-danger);
  color: var(--color-surface-white);
  margin-top: 15px;
}

.danger-btn:hover {
  background: #bd2130;
  box-shadow: 0 4px 10px rgba(220, 53, 69, 0.4);
}

/* ====================================
    5. Feedback/Notificações
    ==================================== */
.feedback {
    margin-top: 20px;
    padding: 10px;
    border-radius: 6px;
    font-weight: 600;
    animation: slideUp 0.3s ease;
}
.feedback.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}
.feedback.warning {
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeeba;
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* ====================================
    6. Estado Vazio (No User)
    ==================================== */
.no-user {
  text-align: center;
  padding: 40px;
  max-width: 400px;
  background: var(--color-surface-white);
  border-radius: 12px;
  box-shadow: var(--shadow-default);
}

.empty-icon {
    font-size: 3rem;
    color: var(--color-accent-yellow);
    margin-bottom: 15px;
}

.no-user h2 {
    font-size: 1.5rem;
    color: var(--color-text-dark);
    margin-bottom: 10px;
}

.no-user p {
    color: var(--color-secondary-grey);
    margin-bottom: 20px;
}

.login-link {
    text-decoration: none;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 500px) {
    .perfil-card {
        padding: 20px;
    }
    .btn-group {
        flex-direction: column;
        gap: 10px;
    }
}
</style>