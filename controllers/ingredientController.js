// Express Router Setup
const express = require('express')
const router = express.Router()


// Mongo Models and Seeds
const Ingredient = require('../models/ingredients')
const ingredientSeed = require('../models/ingredientSeed')


// Routes
router.get('/', (req, res) => {
	console.log(req.session)
	Ingredient.find({}, (err, foundIngredients) => {
		if (err) return res.send(err)
		res.render('ingredients/index.ejs', {ingredients: foundIngredients})
	})
})

router.get('/new', (req, res) => {
	res.render('ingredients/new.ejs')
})

router.get('/seed', (req, res) => {
	Ingredient.create(ingredientSeed, (err, createdIngredients) => {
		if (err) return res.send(err)
		res.redirect('/ingredients')
	})
})

router.get('/:id', (req, res) => {
	Ingredient.findById(req.params.id, (err, foundIngredient) => {
		if (err) return res.send(err)
		res.render('ingredients/show.ejs', {ingredient: foundIngredient})
	})
})

router.get('/:id/edit', (req, res) => {
	Ingredient.findById(req.params.id, (err, foundIngredient) => {
		if (err) return res.send(err)
		res.render('ingredients/edit.ejs', {ingredient: foundIngredient})
	})
})

router.post('/', (req, res) => {
	Ingredient.create(req.body, (err, newIngredient) => {
		if (err) return res.send(err)
		res.redirect('/ingredients')
	})
})

router.put('/:id', (req, res) => {
	Ingredient.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedIngredient) => {
		if (err) return res.send(err)
		res.redirect(`/ingredients/${req.params.id}`)
	})
})

router.delete('/:id', (req, res) => {
	Ingredient.findByIdAndDelete(req.params.id, (err, deletedIngredient) => {
		if (err) return res.send(err)
		res.redirect('/ingredients')
	})
})

module.exports = router