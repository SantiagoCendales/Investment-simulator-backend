const express = require('express')
const { dbConnection } = require('./database/config')
require('dotenv').config()

const port = process.env.PORT

const app = express()

dbConnection()

app.use( express.static('public'))

//Lectura y parseo del body
app.use( express.json() )

app.use('/api/auth', require('./routes/auth'))


app.listen(port, () => {
  console.log('Servidor corriendo ' + port)
})