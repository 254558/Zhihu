// server/index.js
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const articleRoutes = require('./routes/articles')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/articles', articleRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on http://localhost:${process.env.PORT}`)
    })
  })
  .catch(console.error)