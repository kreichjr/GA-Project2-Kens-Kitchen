const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipes')
const Ingredient = require('../models/ingredients')

async function makeIngredients(ingredientList) {
	const createdIngredientList = []
	
	for (const ingredient of ingredientList) {
		let ingredientId = await getIngredientId(ingredient)
		console.log('ingredientId', ingredientId)

		const newIngredient = {
			ingredient: await ingredientId,
			requiredQty: ingredient.qty
		}

		createdIngredientList.push(newIngredient)
	}

	return createdIngredientList
}

async function getIngredientId(ingredient){
	
	const foundIngredient = await Ingredient.findOne({name: ingredient.ingredient})
	
	if (foundIngredient) {
		return foundIngredient.id
	}

	return createNewIngredientAndGetId(ingredient)
}

async function createNewIngredientAndGetId(ingredient) {
	const newIngredient = {
		name: ingredient.ingredient,
		qty: 0,
		img: ""
	}

	const createdIngredient = await Ingredient.create(newIngredient)

	return createdIngredient.id
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
			path: "ingredients.ingredient",
			model: "Ingredient"
		})
		.exec((err, foundRecipe) => {
		if (err) return res.send(err)
		res.render('recipes/show.ejs', {recipe: foundRecipe})
	})
})

router.post('/', async (req, res) => {	

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

	newRecipe.ingredients = await makeIngredients(ingredientList)

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