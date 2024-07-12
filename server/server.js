const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const compression = require('compression')
const router = require('./router')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://localhost/houseSell')


app.use(express.json())
app.use(cookieParser())
app.use(compression())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: ['http://localhost:5000/oauth', 'http://localhost:5173'],
    credentials: true
}))
app.use('/server/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router)



app.listen(5000)