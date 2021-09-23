// Dotenv Setup
require('dotenv').config()


// Express Variables
const express = require('express')
const app = express()
const PORT = process.env.PORT
const methodOverride = require('method-override')


// Session Variables
const session = require('express-session')
const SESSION_SECRET = process.env.SESSION_SECRET


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
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use((req, res, next) => {
	res.locals.currentUser = req.session.currentUser
	next()
})
app.use((req, res, next) => {
	res.locals.message = req.session.message
	req.session.message = ''
	next()
})

// Helper Functions for EJS
app.locals.util = require('./public/js/app.js')


// Controllers
const ingredientController = require('./controllers/ingredientController')
app.use('/ingredients', ingredientController)

const userController = require('./controllers/userController')
app.use('/users', userController)


// App Start
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})