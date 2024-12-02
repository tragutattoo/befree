require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando em https://localhost:${PORT}`)
})

const connectDB = require('./src/config/db')
connectDB()