require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const methodOverride = require('method-override')

const mongoose = require('mongoose')
const db = mongoose.connection
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, ()=> {
	console.log('Connected to MongoDB')
})

db.on('error', (err) => {console.log('Error!', err)})
db.on('connected', () => {console.log('Successful Connection to MongoDB')})
db.on('disconnected', () => {console.log('Discnnected from MongoDB')})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})