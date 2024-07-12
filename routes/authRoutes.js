const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Exemplo de rota protegida
router.get('/protected', authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;
