// Express Router Setup
const express = require('express')
const router = express.Router()


// Mongo Models and Seeds
const Ingredient = require('../models/ingredients')
const ingredientSeed = require('../models/ingredientSeed')


// Routes
router.get('/', (req, res) => {
	res.send('You hit the index route!')
})

router.get('/new', (req, res) => {
	res.send('You hit the new route!')
})

router.get('/seed', (req, res) => {
	Ingredient.create(ingredientSeed, (err, createdIngredients) => {
		if (err) return res.send(err)
		res.redirect('/')
	})
	res.redirect('/ingredients')
})

router.get('/:id', (req, res) => {
	res.send('You hit the show route!')
})

router.get('/:id/edit', (req, res) => {
	res.send('You hit the edit route!')
})

router.post('/', (req, res) => {
	res.send('You hit the create route!')
})

router.put('/:id', (req, res) => {
	res.send('You hit the update route!')
})

router.delete('/:id', (req, res) => {
	res.send('You hit the delete route!')
})

module.exports = router