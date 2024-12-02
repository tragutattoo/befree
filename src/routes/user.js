const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const UserController = require('../controllers/user')

// Rotas de exemplo
router.get('/', UserController.getAllUsers)

router.post('/', [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('email')
        .notEmpty().withMessage('E-mail é obrigatório')
        .isEmail().withMessage('E-mail inválido').normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Senha é obrigatória')
        .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
],
    UserController.createUser
)

router.post('/login', [
    body('email').isEmail().withMessage('E-mail inválido').normalizeEmail(),
    body('password').notEmpty().withMessage('Senha é obrigatória'),
],
    UserController.login
)

module.exports = router