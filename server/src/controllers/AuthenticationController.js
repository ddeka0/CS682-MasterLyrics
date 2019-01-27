const {User} = require("../models")
const session = require("express-session")
module.exports = {
	register : async function(req,res) {
		console.log(req.body)
		let msg = `Register request for ${req.body.email} found`
		console.log(msg)
		try {
			const user = await User.create(req.body) 
			res.send(user.toJSON())
		}catch(err) {
			// email already exits
			res.status(400).send( {
				error : "This email is alread in use"
			})
		}
	},
	login : async function(req,res) {
		console.log("===================================")
		console.log("inside the login function\n\n",req.body)
		console.log(">>>>>>>>>>>session object : ",req.session)
		const userId = req.session.userId
		console.log(">>>>>>>>>>>session Id = ",userId)
		if(!userId) {
			const { userId } = req.session	
			let msg = `Login request for ${req.body.email} found`
			console.log(msg)
			try {
				const {email,password} = req.body
				const user = await User.findOne({
					where: {
						email: email
					}
				})
				if(!user) {
					return res.status(403).send({
						error:"The login information was wrong"
					})
				}
				const isPasswordValid = password === user.password
				if(!isPasswordValid) {
					return res.status(403).send({
						error:"The login information was wrong"
					})
				}
				/* create session */
				req.session.userId = user.id + 1
				console.log(`session created for ${user.email} with sessionId = ${req.session.userId}`)
				//req.session.save()
				const userJson = user.toJSON()
				res.send({
					msg: "The use was found OK !!",
					user: userJson
				})
				console.log("^^^^^^^^^^^session object : ",req.session)
			}catch(err) {
				// email already exits
				res.status(500).send( {
					error : "This email is alread in use"
				})
			}
		}else {
			console.log(`user ${req.body.email} is already logged in`)
			res.send({
				status: "Session is already created !!"
			})
		}

	}
}
