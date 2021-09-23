// Express Router Setup
const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const User = require('../models/users')

// Express Routes
router.get("/register", (req, res) => {
	res.render('users/register.ejs')
})

router.get('/setMeAsAdmin', (req, res) => {
	if (req.session.currentUser) {
		User.findByIdAndUpdate(currentUser._id, {$set: {admin: true}}, {new: true}, (err, updatedUser) => {
			if (err) return res.send(err)
			res.redirect('/ingredients')
		})
	}
})

module.exports = router