<template>
  <!-- Notificação no topo -->
  <div v-if="mostrarNotificacao" class="notificacao">
    {{ notificacao }}
  </div>

  <div class="dashboard">
    <h2 class="titulo-topo">📊 Painel de Recursos Humanos</h2>

    <!-- Cards de resumo -->
    <div class="cards">
      <!-- Card Funcionários -->
      <div class="card">
        <h3>👥 Funcionários</h3>
        <p class="number">{{ funcionarios.length }}</p>
        <small>+{{ novosMes }} novos este mês</small>
        <canvas ref="funcionariosChart" width="260" height="100"></canvas>
      </div>

      <!-- Card Departamentos -->
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

      <!-- Card Salários por Cargo (RH apenas) -->
      <div class="card">
        <h3>💰 Salários por Cargo (RH)</h3>
        <div v-for="(s, cargo) in salariosPorCargo" :key="cargo" class="salario-item">
          <strong>{{ cargo }}:</strong>
          <span>R$ {{ s.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
          <small>({{ s.quantidade }} funcionário(s))</small>
        </div>
      </div>
    </div>

    <!-- Histórico de funcionários -->
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
        datasets: [{ label: "Número de funcionários", data, backgroundColor: "#f6c90e" }]
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
.notificacao {
  position: fixed;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  background: #2b3a55;
  color: #fff;
  padding: 12px 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  font-size: 15px;
  font-weight: 600;
  z-index: 9999;
  animation: slideDown 0.3s ease;
}
@keyframes slideDown {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

.dashboard { max-width: 1100px; margin: 10px auto; padding: 40px; min-height: 100vh; font-family: "Poppins", sans-serif; animation: fadeIn 0.6s ease; }
.titulo-topo { margin-top: 0; margin-bottom: 30px; font-size: 32px; color: #1f2a44; text-align: center; font-weight: 700; }

.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 25px; margin-bottom: 40px; }
.card { background: linear-gradient(90deg, #2b3a55, #3b4a6a); border-radius: 14px; padding: 25px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15); text-align: center; color: #fff; transition: transform 0.25s ease; }
.card h3 { font-size: 20px; margin-bottom: 12px; color: #f6c90e; }
.number { font-size: 34px; font-weight: 700; }
small { color: #e3e7ee; }
.card:hover { background: #ffffff; color: #2b3a55; transform: translateY(-8px); }
.card:hover h3, .card:hover .number { color: #2b3a55; }
.card:hover small { color: #555; }

.departamento, .salario-item { margin-top: 12px; text-align: left; }
.qtd-departamento, .perc-departamento { display: inline-block; font-size: 12px; margin-left: 5px; color: #f6c90e; }
.mini-grafico { background: rgba(255,255,255,0.2); border-radius: 6px; height: 10px; margin: 6px 0; overflow: hidden; }
.barra { height: 100%; background: #f6c90e; border-radius: 6px 0 0 6px; }
.lista-nomes { margin-top: 5px; display: flex; flex-wrap: wrap; gap: 5px; }
.nome-departamento { display: inline-block; background: rgba(246,201,14,0.2); color: #f6c90e; padding: 2px 6px; border-radius: 6px; font-size: 13px; }

.table-section { background: #ffffff; border-radius: 14px; padding: 20px 25px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15); margin-top: 10px; color: #2b3a55; }
.table-section h3 { margin: 0 0 15px 0; font-size: 22px; font-weight: 700; }
table { width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 12px; }
th { background: #2b3a55; color: white; padding: 14px 12px; font-weight: 600; font-size: 15px; }
td { padding: 14px 12px; color: #2b3a55; transition: background 0.25s; }
tbody tr:hover td { background: #f0f4ff; }
tbody tr td { border-bottom: 1px solid #dce1eb; }
tbody tr:last-child td { border-bottom: none; }
.vazio { text-align: center; color: #2b3a55; margin-top: 20px; font-size: 15px; }
select { padding: 4px 8px; border-radius: 6px; border: 1px solid #d1d5db; cursor: pointer; }

.acoes { display: flex; gap: 12px; justify-content: center; }
.edit-btn { background: #ffffff; border: 1px solid #3b82f6; color: #1e40af; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 16px; transition: all 0.25s ease; }
.edit-btn:hover { background: #e0f0ff; transform: scale(1.1); }
.delete-btn { background: #ef4444; color: #fff; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; transition: all 0.25s ease; }
.delete-btn:hover { background: #b91c1c; transform: scale(1.1); box-shadow: 0 4px 12px rgba(0,0,0,0.25); }

@media (max-width: 850px) { .dashboard { padding: 20px; } th, td { padding: 10px 14px; } }
</style>
