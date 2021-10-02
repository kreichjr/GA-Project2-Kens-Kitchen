const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipes')
const Ingredient = require('../models/ingredients')

function getIngredientId(obj) {

	Ingredient.findOne({name: obj.ingredient}, (err, foundIngredient) => {
		if (err) return console.log(err)
		if (foundIngredient) return foundIngredient.id
		console.log("found ingredient and adding to list")
		console.log(foundIngredient.id)
		return createNewIngredientAndGetId(obj)
	})	
}

async function createNewIngredientAndGetId(obj) {
	const newIngredient = {
		name: obj.ingredient,
		qty: 0,
		img: ""
	}

	Ingredient.create(newIngredient, (err, createdIngredient) => {
		if (err) return console.log(err)
		console.log("made new ingredient and returning id")
		console.log(createdIngredient.id)
		return createdIngredient.id
	})
}

router.get('/', (req, res) => {
	Recipe.find({})
		.populate({
			path: "createdBy",
			model: "User",
			select: "username"
		}).populate({
			path: "ingredients",
			model: "Ingredient"
		})
		.exec((err, recipes) => {
		if (err) return res.send(err)
		res.render('recipes/index.ejs', {recipes})
	})
})

router.get('/new', (req, res) => {
	if (!req.session.currentUser) {
		req.session.message = "You must be logged in to create a recipe."
		res.redirect('/users/signin')
	}
	Ingredient.find({}, (err, ingredients) => {
		if (err) return res.send(err)
		res.render('recipes/new.ejs', {ingredients})
	})
})

router.get('/:id', (req, res) => {
	Recipe.findById(req.params.id)
		.populate({
			path: "createdBy",
			model: "User",
			select: "username"
		})
		.populate({
			path: "ingredients",
			model: "Ingredient"
		})
		.exec((err, foundRecipe) => {
		if (err) return res.send(err)
		res.render('recipes/show.ejs', {recipe: foundRecipe})
	})
})

router.post('/', (req, res) => {	

	const ingredientList = []

	const newRecipe = {
		name: req.body.name,
		ingredients: [],
		steps: req.body.steps,
		createdBy: req.session.currentUser._id
	}
	
	if (Array.isArray(req.body.ingredients)) {
		req.body.ingredients.forEach((ingredient) => {
			ingredientList.push(JSON.parse(ingredient))
		})
	} else {
		ingredientList.push(JSON.parse(req.body.ingredients))
	}

	ingredientList.forEach((ingredient) => {
		const newIngredient = {
			ingredient: getIngredientId(ingredient),
			requiredQty: ingredient.qty
		}
		console.log("NEW INGREDIENT: ", newIngredient)
		newRecipe.ingredients.push(newIngredient)
	})

	

	Recipe.create(newRecipe, (err, createdRecipe) => {
		if (err) return res.send(err)
		res.redirect('/recipes')
	})

})

router.delete('/:id', (req, res) => {
	Recipe.findByIdAndDelete(req.params.id, (err, deletedRecipe) => {
		if (err) return res.send(err)
		res.redirect('/recipes')
	})
})

module.exports = router