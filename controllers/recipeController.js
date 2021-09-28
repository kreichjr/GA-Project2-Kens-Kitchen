const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipes')
const Ingredient = require('../models/ingredients')

router.get('/', (req, res) => {
	Recipe.find({}, (err, recipes) => {
		if (err) return res.send(err)
		res.render('recipes/index.ejs', {recipes})
	})
})

router.get('/new', (req, res) => {
	Ingredient.find({}, (err, ingredients) => {
		if (err) return res.send(err)
		res.render('recipes/new.ejs', {ingredients})
	})
})

module.exports = router