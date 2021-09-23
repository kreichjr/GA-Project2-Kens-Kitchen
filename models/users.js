const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	recipes: [{
		type: Schema.Types.ObjectId,
		ref: 'Ingredient',
		default: []
	}]
})