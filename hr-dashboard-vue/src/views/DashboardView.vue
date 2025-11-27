<template>
  <div v-if="mostrarNotificacao" class="notificacao">
    {{ notificacao }}
  </div>

  <div class="dashboard">
    <h2 class="titulo-topo">📊 Painel de Recursos Humanos</h2>

    <div class="cards">
      <div class="card">
        <h3>👥 Funcionários</h3>
        <p class="number">{{ funcionarios.length }}</p>
        <small>+{{ novosMes }} novos este mês</small>
        <canvas ref="funcionariosChart" width="260" height="100"></canvas>
      </div>

      <div class="card">
        <h3>💼 Departamentos</h3>
        <div v-for="(usuarios, dept) in funcionariosPorDepartamento" :key="dept" class="departamento">
          <strong>{{ dept }}:</strong>
          <span class="qtd-departamento">{{ usuarios.length }} funcionários</span>
          <span class="perc-departamento">({{ Math.round((usuarios.length / funcionarios.length) * 100) }}%)</span>
          <div class="mini-grafico">
            <div class="barra" :style="{ width: (usuarios.length / funcionarios.length) * 100 + '%' }"></div>
          </div>
          <div class="lista-nomes">
            <span v-for="u in usuarios" :key="u.email" class="nome-departamento">{{ u.nome }}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>💰 Salários por Cargo (RH)</h3>
        <div v-for="(s, cargo) in salariosPorCargo" :key="cargo" class="salario-item">
          <strong>{{ cargo }}:</strong>
          <span>R$ {{ s.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
          <small>({{ s.quantidade }} funcionário(s))</small>
        </div>
      </div>
    </div>

    <div class="table-section">
      <h3>🧾 Histórico de Funcionários</h3>
      <table v-if="funcionarios.length > 0">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Departamento</th>
            <th>Data de Admissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(f, index) in funcionarios" :key="index">
            <td>{{ f.nome }}</td>
            <td>{{ f.cargo }}</td>
            <td>
              <select v-model="f.departamento" @change="atualizarDepartamento(index)">
                <option v-for="dept in departamentos" :key="dept" :value="dept">{{ dept }}</option>
              </select>
            </td>
            <td>{{ f.admissao }}</td>
            <td class="acoes">
              <button class="edit-btn" @click="editarFuncionario(index)">✏️</button>
              <button class="delete-btn" @click="demitirFuncionario(index)">🗑️ Demitir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="vazio">Nenhum funcionário cadastrado ainda.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

const funcionarios = ref([]);
const novosMes = ref(0);
const departamentos = ["RH", "TI", "Vendas", "Marketing", "Financeiro"];
const cargosRH = [
  "Assistente de RH",
  "Analista de RH",
  "Coordenador de RH",
  "Gerente de RH",
  "Diretor de RH",
  "Especialista em Recrutamento",
  "Analista de Treinamento",
  "Analista de Departamento Pessoal"
];

const notificacao = ref("");
const mostrarNotificacao = ref(false);
const funcionariosChart = ref(null);
let chartInstance = null;

function exibirNotificacao(msg) {
  notificacao.value = msg;
  mostrarNotificacao.value = true;
  setTimeout(() => { mostrarNotificacao.value = false; }, 3000);
}

// Carregar dados do localStorage
onMounted(() => {
  const dados = JSON.parse(localStorage.getItem("usuarios") || "[]");
  funcionarios.value = dados;
  novosMes.value = Math.floor(Math.random() * 6) + 1;

  // Se algum funcionário não tiver cargo, atribuir aleatório do RH ou outro
  funcionarios.value.forEach(f => {
    if (!f.cargo) {
      f.cargo = f.departamento === "RH"
        ? cargosRH[Math.floor(Math.random() * cargosRH.length)]
        : "Funcionário";
    }
  });

  nextTick(() => renderChart());
});

// Atualizar gráfico quando funcionários mudarem
watch(funcionarios, () => { nextTick(() => renderChart()); });

// Demitir funcionário
function demitirFuncionario(index) {
  const nome = funcionarios.value[index].nome;
  if (confirm(`Tem certeza que deseja demitir ${nome}?`)) {
    funcionarios.value.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(funcionarios.value));
    exibirNotificacao(`Funcionário ${nome} foi demitido!`);
  }
}

// Editar funcionário
function editarFuncionario(index) {
  const funcionario = funcionarios.value[index];
  const novoNome = prompt("Novo nome:", funcionario.nome);
  if (novoNome && novoNome.trim() !== "") {
    funcionario.nome = novoNome.trim();
    localStorage.setItem("usuarios", JSON.stringify(funcionarios.value));
    exibirNotificacao("Funcionário atualizado com sucesso!");
  }
}

// Atualizar departamento
function atualizarDepartamento(index) {
  localStorage.setItem("usuarios", JSON.stringify(funcionarios.value));
  exibirNotificacao("Departamento atualizado com sucesso!");
}

// Agrupar funcionários por departamento
const funcionariosPorDepartamento = computed(() => {
  const grupos = {};
  funcionarios.value.forEach(f => {
    if (!grupos[f.departamento]) grupos[f.departamento] = [];
    grupos[f.departamento].push(f);
  });
  return grupos;
});

// Computed: salários apenas para RH
const salariosPorCargo = computed(() => {
  const salarioBase = {
    "Assistente de RH": 2500,
    "Analista de RH": 4500,
    "Coordenador de RH": 7500,
    "Gerente de RH": 12000,
    "Diretor de RH": 22000,
    "Especialista em Recrutamento": 5000,
    "Analista de Treinamento": 4000,
    "Analista de Departamento Pessoal": 4500
  };

  const result = {};
  funcionarios.value.forEach(f => {
    if (f.departamento === "RH") {
      if (!result[f.cargo]) result[f.cargo] = { salario: salarioBase[f.cargo] || 3000, quantidade: 0 };
      result[f.cargo].quantidade += 1;
    }
  });
  return result;
});

// Renderizar gráfico
function renderChart() {
  if (!funcionariosChart.value) return;
  const labels = Object.keys(funcionariosPorDepartamento.value);
  const data = labels.map(label => funcionariosPorDepartamento.value[label].length);

  if (chartInstance) {
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = data;
    chartInstance.update();
  } else {
    chartInstance = new Chart(funcionariosChart.value, {
      type: "bar",
      data: {
        labels,
        datasets: [{ label: "Número de funcionários", data, backgroundColor: "#007bff" }] // Alterada a cor do gráfico para combinar
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { precision:0 } } }
      }
    });
  }
}
</script>

<style scoped>
/* ====================================
   1. Variáveis & Tipografia
   ==================================== */
:root {
  --color-primary-blue: #007bff; /* Cor de Ação/Destaque */
  --color-secondary-grey: #6c757d; /* Cor Secundária */
  --color-background-light: #f4f6f9; /* Fundo Suave */
  --color-surface-white: #ffffff; /* Superfícies (Cards, Tabelas) */
  --color-text-dark: #212529; /* Texto Principal */
  --color-accent-green: #28a745; /* Cor de Crescimento/Sucesso */
  --color-warning-yellow: #ffc107; /* Cor de Aviso/Gráfico */
  --shadow-default: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Usando uma fonte limpa e moderna */
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--color-background-light);
  color: var(--color-text-dark);
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ====================================
   2. Notificação (Clean)
   ==================================== */
.notificacao {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary-blue);
  color: var(--color-surface-white);
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: var(--shadow-default);
  font-size: 1rem;
  font-weight: 500;
  z-index: 9999;
  animation: slideDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Animação mais suave */
}

@keyframes slideDown {
  from { opacity: 0; transform: translate(-50%, -30px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

/* ====================================
   3. Título Principal
   ==================================== */
.titulo-topo {
  margin-top: 0;
  margin-bottom: 40px;
  font-size: 2.2rem;
  color: var(--color-text-dark);
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
}

/* ====================================
   4. Cards de Resumo (Elevation)
   ==================================== */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.card {
  background: var(--color-surface-white);
  border-radius: 12px;
  padding: 30px;
  box-shadow: var(--shadow-default);
  transition: all 0.3s ease;
  border-left: 5px solid var(--color-primary-blue); /* Destaque lateral */
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.card h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: var(--color-secondary-grey);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 5px;
}

small {
  color: var(--color-accent-green);
  font-weight: 600;
  display: block;
}

/* Gráfico de Funcionários */
canvas {
    max-width: 100%;
    margin-top: 15px;
}

/* Conteúdo interno dos Cards (Departamentos/Salários) */
.departamento, .salario-item {
  margin-top: 15px;
  padding: 10px 0;
  border-bottom: 1px dashed #e9ecef;
  text-align: left;
  font-size: 0.95rem;
}
.card:last-child .departamento, .card:last-child .salario-item {
  border-bottom: none;
}

.qtd-departamento, .perc-departamento {
  display: inline-block;
  font-size: 0.85rem;
  margin-left: 5px;
  color: var(--color-secondary-grey);
}

/* Mini Gráfico de Barras */
.mini-grafico {
  background: #e9ecef;
  border-radius: 4px;
  height: 8px;
  margin: 5px 0 8px 0;
  overflow: hidden;
}
.barra {
  height: 100%;
  background: var(--color-primary-blue);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.lista-nomes {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 50px; /* Limita a altura para ser mais clean */
  overflow: hidden;
}
.nome-departamento {
  display: inline-block;
  background: #f8f9fa;
  color: var(--color-secondary-grey);
  padding: 3px 8px;
  border-radius: 15px;
  font-size: 0.75rem;
  border: 1px solid #dee2e6;
}

.salario-item strong {
    color: var(--color-primary-blue);
    font-weight: 600;
}
.salario-item span {
    font-weight: 700;
    margin-left: 10px;
    color: var(--color-text-dark);
}
.salario-item small {
    display: inline;
    color: var(--color-secondary-grey);
    font-weight: 400;
    margin-left: 5px;
}

/* ====================================
   5. Tabela de Funcionários (Clean Grid)
   ==================================== */
.table-section {
  background: var(--color-surface-white);
  border-radius: 12px;
  padding: 25px;
  box-shadow: var(--shadow-default);
  margin-top: 25px;
}
.table-section h3 {
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-dark);
}

table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 10px;
}

/* Estilo do cabeçalho */
th {
  background: var(--color-primary-blue);
  color: var(--color-surface-white);
  padding: 12px 18px;
  font-weight: 600;
  font-size: 0.95rem;
  text-align: left;
}
th:last-child {
    text-align: center; /* Centralizar ações */
}

/* Estilo das linhas */
td {
  padding: 12px 18px;
  color: var(--color-text-dark);
  transition: background 0.3s;
  font-size: 0.95rem;
}
tbody tr:hover td {
  background: #e9f0ff;
}
tbody tr td {
  border-bottom: 1px solid #e9ecef;
}
tbody tr:last-child td {
  border-bottom: none;
}
.vazio {
  text-align: center;
  color: var(--color-secondary-grey);
  margin-top: 20px;
  padding: 10px;
  border: 1px dashed #dee2e6;
  border-radius: 8px;
}

/* Estilo do Select (Dropdown) */
select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  cursor: pointer;
  background-color: var(--color-surface-white);
  font-size: 0.9rem;
  transition: border-color 0.3s;
}
select:focus {
    outline: none;
    border-color: var(--color-primary-blue);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* ====================================
   6. Botões de Ação (Ícones e Cor)
   ==================================== */
.acoes {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.edit-btn, .delete-btn {
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.25s ease;
  font-weight: 500;
}

/* Botão Editar */
.edit-btn {
  background: #f1f3f5;
  color: var(--color-secondary-grey);
}
.edit-btn:hover {
  background: var(--color-warning-yellow);
  color: var(--color-text-dark);
  transform: translateY(-2px);
}

/* Botão Demitir */
.delete-btn {
  background: #dc3545; /* Vermelho padrão para ação destrutiva */
  color: #fff;
}
.delete-btn:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(220, 53, 69, 0.5);
}

/* Responsividade */
@media (max-width: 992px) {
  .dashboard {
    padding: 20px;
  }
}
@media (max-width: 768px) {
    .titulo-topo {
        text-align: center;
        font-size: 1.8rem;
    }
    .table-section {
        overflow-x: auto; /* Permite scroll horizontal em telas pequenas */
    }
    table {
        min-width: 650px; /* Garante que a tabela não quebre */
    }
}
</style>