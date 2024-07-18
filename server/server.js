require('dotenv').config({ path: '../.env' });

const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Inicialize o Sequelize com as credenciais do banco de dados
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

// Importar os modelos corretamente e inicializá-los com a instância do Sequelize
const Veiculo = require('../models/Veiculo')(sequelize);
const User = require('../models/user')(sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao conectar e sincronizar com o banco de dados:', err);
  });

// Rota de autenticação
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    // Verificação de senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Erro ao autenticar o usuário:', error);
    res.status(500).json({ message: 'Erro ao autenticar o usuário. Tente novamente.' });
  }
});

// Rota para cadastrar um veículo
app.post('/api/veiculos/cadastrar', async (req, res) => {
  try {
    const { codigo, nome, carro, motor, ano } = req.body;

    const novoVeiculo = await Veiculo.create({
      codigo,
      nome,
      carro,
      motor,
      ano,
    });

    res.status(201).json(novoVeiculo);
  } catch (error) {
    console.error('Erro ao cadastrar o veículo:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar o veículo. Tente novamente.' });
  }
});

// Rota para pesquisar veículos
app.get('/api/veiculos/pesquisar', async (req, res) => {
  try {
    const { codigo, nome, carro, motor, ano } = req.query;
    const where = {};

    if (codigo) where.codigo = codigo;
    if (nome) where.nome = nome;
    if (carro) where.carro = carro;
    if (motor) where.motor = motor;
    if (ano) where.ano = ano;

    const veiculos = await Veiculo.findAll({ where });

    if (veiculos.length === 0) {
      res.json({ message: 'Nenhum veículo encontrado.' });
    } else {
      res.json(veiculos);
    }
  } catch (error) {
    console.error('Erro ao pesquisar veículos:', error);
    res.status(500).json({ erro: 'Erro ao pesquisar veículos. Tente novamente.' });
  }
});

// Rota para editar um veículo
app.put('/api/veiculos/editar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, carro, motor, ano } = req.body;

    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return res.status(404).json({ erro: 'Veículo não encontrado.' });
    }

    // Atualiza os campos do veículo com os novos dados
    veiculo.nome = nome;
    veiculo.carro = carro;
    veiculo.motor = motor;
    veiculo.ano = ano;

    // Salva as alterações no banco de dados
    await veiculo.save();

    res.json({ message: 'Veículo atualizado com sucesso', veiculo });
  } catch (error) {
    console.error('Erro ao editar veículo:', error);
    res.status(500).json({ erro: 'Erro ao editar veículo. Tente novamente.' });
  }
});


// Rota para deletar um veículo
app.post('/api/veiculos/deletar', async (req, res) => {
  try {
    const { codigo } = req.body;

    if (!codigo) {
      return res.status(400).json({ erro: 'Código do veículo é necessário.' });
    }

    const veiculo = await Veiculo.findOne({ where: { codigo } });

    if (!veiculo) {
      return res.status(404).json({ erro: 'Veículo não encontrado.' });
    }

    await veiculo.destroy();
    res.json({ message: 'Veículo deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar veículo:', error);
    res.status(500).json({ erro: 'Erro ao deletar veículo. Tente novamente.' });
  }
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
