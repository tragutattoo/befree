require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const roleRoutes = require('./routes/role');

const app = express()

// Middlewares globais
app.use(cors());
app.use(express.json())

// Rotas Principais
app.use('/api', routes)
app.use('/api/roles', roleRoutes);

module.exports = app