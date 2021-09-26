const mongoose = require('mongoose')
const { Schema, model } = mongoose

const recipeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	ingredients: [{
		ingredient: {
			type: Schema.Types.ObjectId,
			ref: 'Ingredient'
		},
		requiredQty: Number
	}],
	steps: {
		type: String,
		required: true
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {timestamps: true})

module.exports = model('Recipe', recipeSchema)