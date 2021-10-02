const mongoose = require('mongoose')

const {Schema, model} = mongoose

let ingredientSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	qty: {
		type: Number,
		required: true,
		min: 0,
		default: 0
	},
	img: {
		type: String
	}
}, {timestamps: true})

const Ingredient = model('Ingredient', ingredientSchema)

module.exports = Ingredient