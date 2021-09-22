// Dotenv Setup
require('dotenv').config()


// Express Variables
const express = require('express')
const app = express()
const PORT = process.env.PORT
const methodOverride = require('method-override')


// Mongoose Variables
const mongoose = require('mongoose')
const db = mongoose.connection
const mongoURI = process.env.MONGODB_URI


// Mongoose Connection
mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, ()=> {
	console.log('Connected to MongoDB')
})

db.on('error', (err) => {console.log('Error!', err)})
db.on('connected', () => {console.log('Successful Connection to MongoDB')})
db.on('disconnected', () => {console.log('Discnnected from MongoDB')})


// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static('public'))


// Controllers
const ingredientController = require('./controllers/ingredientController')
app.use('/ingredients', ingredientController)


// App Start
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})