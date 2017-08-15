const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router();
let User = require('../model/user')
const passport = require('passport')


router.get('/register', function (req, res) {
res.render('register')
})



router.post('/register',function (req,res) {
const name = req.body.name
const email = req.body.email
const password = req.body.password
const password2 = req.body.password2

	let newUser = new User({
		name:name,
		email:email,
		password:password
	})
	bcrypt.genSalt(10, function (err,salt) {
		bcrypt.hash(newUser.password, salt, function(err,hash) {
				if(err){
console.log(err)
	}
	newUser.password= hash;
	newUser.save(function (err) {
	if(err){
console.log(err)
return;
	}else{
		
		res.redirect('/users/login')
	}
})
		})
	})
})
router.get('/login', function (req, res) {
	res.render('login')// body...
})

router.post('/login',function(req,res,next){
	passport.authenticate('local', {
		successRedirect:'/',
		failureRedirect:'/users/login',
		failureFlash:true
	})(req,res,next)
})
router.get('/logout', function (req, res) {
	req.logout()
	res.redirect('/users/login')// body...
})

module.exports = router;