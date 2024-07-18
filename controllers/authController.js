const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const generateToken = (user) => {
    console.log('JWT_SECRET inside generateToken:', process.env.JWT_SECRET); // Verificação
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.json({ token: generateToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Erro ao registrar:', error);
        res.status(500).json({ message: 'Erro ao registrar', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Tentando login com Email: ${email}, Password: ${password}`);
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        console.log(`Usuário encontrado: ${user.email}`);
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            console.log('Senha inválida');
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        console.log('Senha válida');
        res.json({ token: generateToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
};
