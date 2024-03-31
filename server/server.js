const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { insertData, deleteData, updateData, searchData } = require("./database"); 

const app = express();
const PORT = 4000;

const banco = "catalogo";
const tabela = "veiculo"

app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

// Função para conectar ao MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Rota para receber os dados do formulário e inserir no MongoDB
app.post("/cadastrar", async (req, res) => {
  try {
    const { codigo, nome, carro, motor, ano } = req.body;
    // Chama a função para inserir dados no banco de dados
    await insertData(client, banco, "veiculo", { codigo, nome, carro, motor, ano });
    res.status(201).json({ message: "Dado inserido com sucesso." });
  } catch (error) {
    console.error("Erro ao inserir dado no MongoDB:", error);
    res.status(500).json({ message: "Erro ao inserir dado." });
  }
});

// Rota para receber os dados do formulário e deletar no MongoDB
app.post("/deletar", async (req, res) => {
  try {
    const { codigo } = req.body;

    // Chama a função para deletar dados no banco de dados
    await deleteData(client, banco, tabela, { codigo });
    res.status(201).json({ message: "Dado inserido com sucesso." });
  } catch (error) {
    console.error("Erro ao inserir dado no MongoDB:", error);
    res.status(500).json({ message: "Erro ao inserir dado." });
  }
});

app.get("/pesquisar", async (req, res) => {
  try {
    const query = {};

    // Verifique se cada parâmetro de consulta está presente e adicione-o à consulta
    if (req.query.codigo) query.codigo = req.query.codigo;
    if (req.query.nome) query.nome = req.query.nome;
    if (req.query.carro) query.carro = req.query.carro;
    if (req.query.motor) query.motor = req.query.motor;
    if (req.query.ano) query.ano = req.query.ano;

    // Remova campos vazios ou nulos da consulta
    Object.keys(query).forEach((key) => query[key] == null && delete query[key]);

    // Chama a função para resgatar dados no banco de dados
    const result = await searchData(client, banco, tabela, query);
    if (!result) {
      res.status(404).json({ message: "Nenhum resultado encontrado." });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Erro ao pesquisar dados no MongoDB:", error);
    res.status(500).json({ message: "Erro ao pesquisar dados." });
  }
});

// Rota para receber os dados do formulário e resgatar no MongoDB
app.put("/editar", async (req, res) => {
  try {
    const { codigo, nome, carro, motor, ano } = req.body;
    console.log("Dados recebidos no backend:", { codigo, nome, carro, motor, ano });
    // Chama a função para alterar dados no banco de dados
    await updateData(client, banco, tabela, { codigo }, { codigo, nome, carro, motor, ano });
    res.status(201).json({ message: "Dados alterados com sucesso." });
  } catch (error) {
    console.error("Erro ao inserir dado no MongoDB:", error);
    res.status(500).json({ message: "Erro ao inserir dado." });
  }
});

// Inicia a conexão com o MongoDB e o servidor
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});