const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

// Middlewares globais
app.use(cors());
app.use(express.json())

// Rotas Principais
app.use('/api', routes)

module.exports = app