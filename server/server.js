// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o pacote cors
const authRoutes = require('../routes/authRoutes');

const app = express();

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(bodyParser.json());

// Middleware para habilitar o CORS
app.use(cors());

// Rotas para autenticação
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
