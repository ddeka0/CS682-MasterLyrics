module.exports = (sequelize, DataTypes)=> {
	var table = sequelize.define("User",{
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: {
			type: DataTypes.STRING
		}
	})
	console.log("======= User table created =======")
	return table
}