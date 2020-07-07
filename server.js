const express = require('express')
const mongoose = require('mongoose')

const keys = require('./config/keys')
const app = express();
const dbURI = keys.dbURI
const PORT = process.env.PORT || 5000

const conn = async () => {
  await mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true})
  console.log('connected to db')
  app.listen(PORT, console.log(`server listening on port ${PORT}`))
}

conn()

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))