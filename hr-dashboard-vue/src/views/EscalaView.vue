<template>
  <div class="escala-container">
    <header class="escala-header">
      <h2>📅 Gestão de Escala de Trabalho</h2>

      <button class="btn-primary generar-btn" @click="gerarNovaEscala">
        <i class="fas fa-redo-alt"></i> Gerar Nova Escala Semanal
      </button>
    </header>

    <div class="table-wrapper">
      <table class="escala-table">
        <thead>
          <tr>
            <th class="sticky-col">Funcionário</th>
            <th v-for="dia in diasSemana" :key="dia">{{ dia }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(f, index) in funcionarios" :key="index">
            <td class="sticky-col nome-funcionario">{{ f.nome }}</td>
            <td v-for="dia in diasSemana" :key="dia">
              <span :class="getTurno(f, dia)" class="turno-tag">
                {{ f.escala[dia] || '-' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="funcionarios.length === 0" class="empty-state">
        Nenhum funcionário cadastrado para exibir a escala.
      </div>
    </div>
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
    const usuariosAtuais = escalaSalva.filter(e => todosUsuarios.some(u => u.email === e.email)); // Remove usuários demitidos

    const novosComEscala = novosUsuarios.map(u => {
      const escala = {};
      diasSemana.forEach(d => { escala[d] = turnos[Math.floor(Math.random() * turnos.length)]; });
      return { ...u, escala };
    });
    
    // Atualiza nomes/cargos e combina
    const combinados = usuariosAtuais.map(e => {
        const usuarioOriginal = todosUsuarios.find(u => u.email === e.email);
        if (usuarioOriginal) {
            // Atualiza o nome, mantendo a escala
            return { ...usuarioOriginal, escala: e.escala }; 
        }
        return e;
    });

    funcionarios.value = [...combinados, ...novosComEscala];

  } else {
    // Primeira inicialização
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
/* ====================================
   1. Variáveis & Layout Geral
   ==================================== */
:root {
  --color-primary: #007bff; /* Azul profissional */
  --color-background-light: #f4f6f9;
  --color-surface-white: #ffffff;
  --color-text-dark: #212529;
  --color-text-light: #6c757d;
  --shadow-default: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.escala-container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 30px;
  background-color: var(--color-surface-white);
  border-radius: 12px;
  box-shadow: var(--shadow-default);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--color-text-dark);
}

.escala-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
}

h2 {
  color: var(--color-text-dark);
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
}

/* ====================================
   2. Botão de Ação
   ==================================== */
.btn-primary {
  padding: 10px 18px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn-primary:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

/* ====================================
   3. Tabela (Design Clean e Responsivo)
   ==================================== */

.table-wrapper {
  overflow-x: auto; /* Permite scroll horizontal em telas pequenas */
  border: 1px solid #dee2e6;
  border-radius: 8px;
}

.escala-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px; /* Garante que a tabela não fique muito esmagada */
}

/* Cabeçalho */
thead th {
  background: #f8f9fa; /* Fundo mais suave */
  color: var(--color-text-dark);
  padding: 12px 15px;
  font-size: 0.85rem;
  text-transform: uppercase;
  font-weight: 700;
  border-bottom: 2px solid #dee2e6;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Coluna Fixa (Funcionário) */
.sticky-col {
  position: sticky;
  left: 0;
  background-color: var(--color-surface-white);
  z-index: 11;
  text-align: left !important;
  padding-left: 20px !important;
  border-right: 1px solid #e9ecef;
}
thead .sticky-col {
  background-color: #f8f9fa;
  border-right: 2px solid #dee2e6;
}

/* Corpo da Tabela */
tbody tr {
  transition: background 0.2s;
}
tbody tr:hover {
  background: #e9f0ff;
}

td {
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
  font-size: 0.95rem;
  font-weight: 500;
}
tbody tr:last-child td {
  border-bottom: none;
}

.nome-funcionario {
  color: var(--color-text-dark);
  font-weight: 600;
}

/* Tags de Turno (Melhor contraste e clareza) */
.turno-tag {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8rem;
  min-width: 70px;
  transition: transform 0.2s ease;
  white-space: nowrap;
}
.turno-tag:hover {
  transform: scale(1.05);
}

.manha {
  background: #fff3cd; /* Amarelo suave */
  color: #856404;
  border: 1px solid #ffeeba;
}
.tarde {
  background: #d4edda; /* Verde suave */
  color: #155724;
  border: 1px solid #c3e6cb;
}
.folga {
  background: #f8d7da; /* Vermelho suave (indicador de ausência) */
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: var(--color-text-light);
  font-size: 1.1rem;
  border-top: 1px solid #e9ecef;
}

/* Responsividade */
@media (max-width: 850px) {
  .escala-container {
    padding: 20px;
  }
  .escala-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .btn-primary {
    margin-top: 15px;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 500px) {
  .turno-tag {
    min-width: 50px;
    padding: 5px 8px;
    font-size: 0.75rem;
  }
  h2 {
    font-size: 1.5rem;
  }
}
</style>