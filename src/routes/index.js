const express = require('express')
const router = express.Router()
const userRoutes = require('./user')

// Rotas de exemplo
router.use('/users', userRoutes)

module.exports = router