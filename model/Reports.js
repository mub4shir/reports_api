const mongoose = require("mongoose")

// Report Model
const ReportsSchema = mongoose.Schema({
	reportID: String,
	userID: String,
	marketID: String,
	marketName: String,
	cmdtyID: String,
	marketType: String,
	cmdtyName: String,
	priceUnit: String,
	convFctr: Number,
	price: Number
})

module.exports = mongoose.model("Reports", ReportsSchema)
