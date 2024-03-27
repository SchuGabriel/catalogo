const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { insertData, deleteData, updateData } = require("./database"); 

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
    const { codigo, carro, motor, anoDe, anoAte } = req.body;
    // Chama a função para inserir dados no banco de dados
    await insertData(client, banco, "veiculo", { codigo, carro, motor, anoDe, anoAte });
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

// Rota para receber os dados do formulário e resgatar no MongoDB
app.get("/consultar", async (req, res) => {
  try {
    const { codigo } = req.body;

    // Chama a função para deletar dados no banco de dados
    const result = await searchData(client, banco, tabela, { codigo });
    res.json(result);
    res.status(201).json({ message: "Dado inserido com sucesso." });
  } catch (error) {
    console.error("Erro ao inserir dado no MongoDB:", error);
    res.status(500).json({ message: "Erro ao inserir dado." });
  }
});

// Rota para receber os dados do formulário e resgatar no MongoDB
app.put("/editar", async (req, res) => {
  try {
    const { codigo, carro, motor, anoDe, anoAte } = req.body;

    // Chama a função para alterar dados no banco de dados
    const result = await updateData(client, banco, tabela, { codigo }, { codigo, carro, motor, anoDe, anoAte });
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