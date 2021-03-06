const AuthenticationController = require("./controllers/AuthenticationController")
const SongSearchController = require("./controllers/SongSearchController")
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy")
const DictionaryController = require("./controllers/DictionaryController")
module.exports = {
	setRoutes : function(app) {
		console.log("Routes are setting up...\n\n")

		app.post("/register",
		AuthenticationControllerPolicy.register,
		AuthenticationController.register),
		
		app.post("/login", 
		AuthenticationController.login)

		app.post("/logout", 
		AuthenticationController.logout)

		app.post("/songSearch", 
		SongSearchController.songSearch)

		app.post("/songSearchId", 
		SongSearchController.songSearchId)

		app.post("/AZlistSearch", 
		SongSearchController.AZlistSearch)
		
		app.post("/editMeaning",
		DictionaryController.editMeaning)

	}
}