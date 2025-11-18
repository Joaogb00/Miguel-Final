<template>
  <div class="cadastro-container">
    <h2>Cadastrar Usuário</h2>

    <form @submit.prevent="salvarCadastro" class="cadastro-form">
      <div class="form-group">
        <label for="nome">Nome Completo</label>
        <input
          id="nome"
          v-model="funcionario.nome"
          type="text"
          placeholder="Ex: Ana Souza"
          required
        />
      </div>

      <div class="form-group">
        <label for="cargo">Cargo</label>
        <!-- Alterado: agora é um select com opções de cargos -->
        <select id="cargo" v-model="funcionario.cargo" required>
          <option disabled value="">Selecione um cargo</option>
          <option>Assistente de RH</option>
          <option>Analista de RH</option>
          <option>Coordenador de RH</option>
          <option>Gerente de RH</option>
          <option>Recrutador</option>
          <option>Business Partner (BP)</option>
          <option>Especialista em Treinamento e Desenvolvimento</option>
          <option>Especialista em Benefícios</option>
          <option>Analista de Departamento Pessoal</option>
          <option>Estagiário de RH</option>
        </select>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="funcionario.email"
          type="email"
          placeholder="Ex: ana@empresa.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="telefone">Telefone</label>
        <input
          id="telefone"
          v-model="funcionario.telefone"
          type="tel"
          placeholder="(11) 99999-9999"
        />
      </div>

      <button type="submit" class="btn-salvar">Salvar</button>
    </form>

    <div v-if="mensagem" class="mensagem-sucesso">
      {{ mensagem }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CadastroRH",
  data() {
    return {
      funcionario: {
        nome: "",
        cargo: "",
        departamento: "",
        email: "",
        telefone: "",
      },
      mensagem: "",
    };
  },
  methods: {
    salvarCadastro() {
      console.log("Dados do funcionário:", this.funcionario);

      this.mensagem = "✅ Cadastro salvo com sucesso!";
      this.funcionario = {
        nome: "",
        cargo: "",
        departamento: "",
        email: "",
        telefone: "",
      };

      setTimeout(() => {
        this.mensagem = "";
      }, 3000);
    },
  },
};
</script>

<style scoped>
.cadastro-container {
  max-width: 450px;
  background-color: rgba(34, 116, 209, 0.85);
  margin: 60px auto;
  padding: 35px 30px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.cadastro-container:hover {
  transform: translateY(-3px);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.6rem;
  color: #2c3e50;
  font-weight: 600;
}

.cadastro-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #34495e;
  font-size: 0.95rem;
}

input,
select {
  padding: 10px 12px;
  border: 1.5px solid #dcdfe6;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
}

input:focus,
select:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.btn-salvar {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 16px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-salvar:hover {
  background-color: #2980b9;
  transform: scale(1.02);
}

.mensagem-sucesso {
  margin-top: 20px;
  text-align: center;
  color: #27ae60;
  font-weight: 600;
  font-size: 1rem;
  background-color: #eafaf1;
  padding: 10px;
  border-radius: 6px;
}

@media (max-width: 500px) {
  .cadastro-container {
    margin: 20px;
    padding: 25px;
  }

  h2 {
    font-size: 1.3rem;
  }
}
</style>
