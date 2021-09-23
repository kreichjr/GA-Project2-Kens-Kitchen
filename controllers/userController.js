// Express Router Setup
const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const User = require('../models/users')

// Express Routes
router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})

router.post('/register', (req, res) => {
	if (req.body.password !== req.body.verifyPassword) {
		req.session.message = 'Password and Verify Password do not match'
		res.redirect('/users/register')
		return
	}
	const salt = bcrypt.genSaltSync(10)
	req.body.password = bcrypt.hashSync(req.body.password, salt)

	User.findOne({username: req.body.username}, (err, userExists) => {
		if (err) return res.send(err)
		if (userExists) {
			req.session.message = 'User already exists'
			res.redirect('/users/register')
			return
		}
		delete req.body.verifyPassword
		User.create(req.body, (err, createdUser) => {
			if (err) return res.send(err)
			req.session.currentUser = createdUser
			res.redirect('/ingredients')
		})
	})
})

router.get('/signin', (req, res) => {
	res.render('users/signin.ejs')
})

router.post('/signin', (req, res) => {
	User.findOne({username: req.body.username}, (err, foundUser) => {
		if (err) return res.send(err)
		if (!foundUser) {
			req.session.message = 'Invalid Username or Password'
			res.redirect('/users/signin')
			return
		}
		const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
		if (!validLogin) {
			req.session.message = 'Invalid Username or Password'
			res.redirect('/users/signin')
			return
		}
		req.session.currentUser = foundUser
		res.redirect('/ingredients')
	})
})

router.get('/signout', (req, res) => {
	req.session.destroy()
	res.redirect('/ingredients')
})

router.get('/setMeAsAdmin', (req, res) => {
	if (req.session.currentUser) {
		req.session.currentUser.admin = true
		User.findByIdAndUpdate(req.session.currentUser._id, req.session.currentUser, {new: true}, (err, updatedUser) => {
			if (err) return res.send(err)
			console.log('UPDATED USER: ', updatedUser)
			res.redirect('/ingredients')
		})
	}
})

router.get('/dropUsers', (req, res) => {
	User.collection.drop()
	res.redirect('/ingredients')
})

module.exports = router