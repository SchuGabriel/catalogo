const express = require('express');
const Veiculo = require('../models/Veiculo');

const router = express.Router();

// Rota para cadastrar um veículo
router.post('/cadastrar', async (req, res) => {
    try {
        const { codigo, nome, carro, motor, ano } = req.body;

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

// Rota para pesquisar veículos
router.get('/pesquisar', async (req, res) => {
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

// Rota para deletar um veículo
router.post('/deletar', async (req, res) => {
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

module.exports = router;
