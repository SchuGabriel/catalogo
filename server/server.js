const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const cors = require('cors'); // Importe o pacote cors
const config = require('../config/config');
const Veiculo = require('../models/Veiculo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()); // Use o CORS para permitir requisições de origens diferentes

// Inicialize o Sequelize com as credenciais do banco de dados
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect
  }
);

// Inicialize o modelo Veiculo com Sequelize
Veiculo.init(sequelize);

sequelize.authenticate() // Verifica a conexão com o banco de dados
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync(); // Sincroniza os modelos com o banco de dados
  })
  .then(() => {
    console.log('Modelo Veiculo sincronizado com o banco de dados.');
  })
  .catch(err => {
    console.error('Erro ao conectar e sincronizar com o banco de dados:', err);
  });

// Rota para cadastrar um veículo
app.post('/api/veiculos/cadastrar', async (req, res) => {
  try {
    const { codigo, nome, carro, motor, ano } = req.body;

    // Criação do veículo no banco de dados usando o modelo Veiculo
    const novoVeiculo = await Veiculo.create({
      codigo,
      nome,
      carro,
      motor,
      ano
    });

    res.status(201).json(novoVeiculo);
  } catch (error) {
    console.error('Erro ao cadastrar o veículo:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar o veículo. Tente novamente.' });
  }
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
