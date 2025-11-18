<template>
  <div class="escala-container">
    <h2>📅 Escala de Funcionários</h2>

    <button class="gerar-btn" @click="gerarNovaEscala">
      🔄 Gerar nova escala
    </button>

    <table>
      <thead>
        <tr>
          <th>Funcionário</th>
          <th v-for="dia in diasSemana" :key="dia">{{ dia }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(f, index) in funcionarios" :key="index">
          <td class="nome-funcionario">{{ f.nome }}</td>
          <td v-for="dia in diasSemana" :key="dia">
            <span :class="getTurno(f, dia)">
              {{ f.escala[dia] || '-' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
const turnos = ['Manhã', 'Tarde', 'Folga'];

const funcionarios = ref([]);

// Função para gerar nova escala aleatória
function gerarNovaEscala() {
  funcionarios.value = funcionarios.value.map(func => {
    const novaEscala = {};
    diasSemana.forEach(dia => {
      novaEscala[dia] = turnos[Math.floor(Math.random() * turnos.length)];
    });
    return { ...func, escala: novaEscala };
  });

  localStorage.setItem("escala", JSON.stringify(funcionarios.value));
}

// Função para atualizar escala incluindo novos cadastros
function atualizarEscala() {
  const todosUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const escalaSalva = JSON.parse(localStorage.getItem('escala') || 'null');

  // Se já existe escala salva, preserva e adiciona novos funcionários
  if (escalaSalva) {
    const novosUsuarios = todosUsuarios.filter(u => !escalaSalva.some(e => e.email === u.email));
    const novosComEscala = novosUsuarios.map(u => {
      const escala = {};
      diasSemana.forEach(d => { escala[d] = turnos[Math.floor(Math.random() * turnos.length)]; });
      return { ...u, escala };
    });
    funcionarios.value = [...escalaSalva, ...novosComEscala];
  } else {
    funcionarios.value = todosUsuarios.map(u => {
      const escala = {};
      diasSemana.forEach(d => { escala[d] = turnos[Math.floor(Math.random() * turnos.length)]; });
      return { ...u, escala };
    });
  }

  localStorage.setItem("escala", JSON.stringify(funcionarios.value));
}

onMounted(() => {
  atualizarEscala();
});

// Retorna a classe do turno para estilização
function getTurno(func, dia) {
  const t = func.escala[dia];
  if (t === 'Manhã') return 'manha';
  if (t === 'Tarde') return 'tarde';
  if (t === 'Folga') return 'folga';
  return '';
}
</script>

<style scoped>
.escala-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 35px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
  font-family: "Poppins", sans-serif;
}

h2 {
  margin-bottom: 25px;
  color: #222;
  font-size: 28px;
  text-align: center;
  font-weight: 700;
}

.gerar-btn {
  margin-bottom: 20px;
  padding: 10px 18px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: 0.3s;
}
.gerar-btn:hover {
  background: #3730a3;
  transform: translateY(-2px);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}
thead th {
  background: #111827;
  color: white;
  padding: 14px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  position: sticky;
  top: 0;
}
tbody tr { background: #f9fafb; transition: 0.2s; }
tbody tr:hover { background: #f3f4f6; transform: scale(1.01); }
td, th { padding: 12px; text-align: center; }

.nome-funcionario {
  color: #111827;
  font-weight: 700;
}

td span {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 13px;
  min-width: 75px;
  transition: 0.3s;
}
td span:hover { transform: scale(1.08); }
.manha { background: #fde047; color: #1f2937; }
.tarde { background: #3b82f6; color: white; }
.folga { background: #ef4444; color: white; }

tbody tr:nth-child(odd) { background: #f3f4f6; }

@media (max-width: 850px) {
  td span { min-width: 55px; padding: 5px 8px; font-size: 11px; }
  .escala-container { padding: 20px; }
  h2 { font-size: 23px; }
  th, td { font-size: 11px; padding: 6px; }
}
</style>
