const express = require('express')

const app = express()
const login = require('./routes/loginRoute')
const register = require('./routes/registerRoute')

app.use(express.json())

app.use('/api', login)
app.use('/api', register)

module.exports = app
