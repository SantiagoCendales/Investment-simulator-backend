const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT

const app = express()

dbConnection()

app.use(cors())

app.use( express.static('public'))

//Lectura y parseo del body
app.use( express.json() )

app.use('/api/auth', require('./routes/auth'))

app.use('/projects', require('./routes/project'))


app.listen(port, () => {
  console.log('Server run on port: ' + port)
})