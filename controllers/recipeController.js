const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipes')

router.get('/', (req, res) => {
	Recipe.find({}, (err, recipes) => {
		if (err) return res.send(err)
		res.render('recipes/index.ejs', {recipes})
	})
})

router.get('/new', (req, res) => {
	res.render('recipes/new.ejs')
})

module.exports = router