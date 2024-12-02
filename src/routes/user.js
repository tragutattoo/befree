const {authenticate} = require('../middlewares/auth')
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const UserController = require('../controllers/user')
const upload = require('../middlewares/upload')

// Rotas de exemplo
router.get('/', UserController.getAllUsers)

router.post('/', 
    upload.single('profilePicture'),
    [
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

router.get('/profile', authenticate, (req, res) => {
    return res.status(200).json({ message: 'Perfil do usuário', user: req.user });
});

module.exports = router