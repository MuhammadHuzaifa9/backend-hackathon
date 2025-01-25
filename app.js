const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config({path:"./config.env"})
const app = express()
const morgan = require('morgan')
const Router = require('./Routes/Routes')
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/hackathon' , Router)

module.exports = app

