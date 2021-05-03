const Report = require("../model/Reports") // Import reports model
const computeCumulativeAvg = require("../utils/functions") // Import the cumulativeAvg function from utils/functions

// Creates / Updates a report based on userID
exports.createReport = async (req, res) => {
	let userID
	let marketID
	let marketName
	let cmdtyID
	let marketType
	let cmdtyName
	let priceUnit
	let convFctr
	let price

	// Checks for data in req.body
	if (!req.body.reportDetails || !req.body.reportDetails.userID) {
		return res.status(400).send({ message: "Please fill in the report details" })
	}
	if (req.body.reportDetails.userID) {
		userID = req.body.reportDetails.userID
	}
	if (req.body.reportDetails.marketID) {
		marketID = req.body.reportDetails.marketID
	}
	if (req.body.reportDetails.marketName) {
		marketName = req.body.reportDetails.marketName
	}
	if (req.body.reportDetails.cmdtyID) {
		cmdtyID = req.body.reportDetails.cmdtyID
	}
	if (req.body.reportDetails.marketType) {
		marketType = req.body.reportDetails.marketType
	}
	if (req.body.reportDetails.cmdtyName) {
		cmdtyName = req.body.reportDetails.cmdtyName
	}
	if (req.body.reportDetails.priceUnit) {
		priceUnit = req.body.reportDetails.priceUnit
	}
	if (req.body.reportDetails.convFctr !== undefined) {
		convFctr = req.body.reportDetails.convFctr
	}
	if (req.body.reportDetails.price !== undefined) {
		price = req.body.reportDetails.price
	}
	try {
		// Fetch a report based on userID
		const report = await Report.findOne({
			userID: userID
		})
		if (!price) {
			price = report.toJSON().price
		}
		if (!convFctr) {
			convFctr = report.toJSON().convFctr
		}
		// Check if the report already exists
		if (report) {
			// Update the report if it already exists
			await report.update({
				userID: userID ? userID : commodity.toJSON().userID,
				marketID: marketID ? marketID : commodity.toJSON().marketID,
				marketName: marketName ? marketName : commodity.toJSON().marketName,
				marketType: marketType ? marketType : commodity.toJSON().marketType,
				cmdtyName: cmdtyName ? cmdtyName : commodity.toJSON().cmdtyName,
				priceUnit: priceUnit ? priceUnit : commodity.toJSON().priceUnit,
				convFctr: convFctr,
				price: price
			})
		} else {
			// Create the report if it is not already present in the DB
			await Report.create({
				reportID: `${marketID}-${cmdtyID}`,
				userID: userID ? userID : null,
				marketID: marketID ? marketID : null,
				marketName: marketName ? marketName : null,
				cmdtyID: cmdtyID ? cmdtyID : null,
				marketType: marketType ? marketType : null,
				cmdtyName: cmdtyName ? cmdtyName : null,
				priceUnit: priceUnit ? priceUnit : null,
				convFctr: convFctr,
				price: price
			})
		}

		// Send the report id in the response
		return res.status(201).json({
			status: "success",
			reportID: `${marketID}-${cmdtyID}`
		})
	} catch (error) {
		console.log(error)
		return res.status(401).json({
			error: "The request was badly formatted!"
		})
	}
}

// Generates the report based on query parameter sent
exports.getAggregatedReport = async (req, res) => {
	const { id } = req.params
	// If report if is not supplied as a query parameter, throw an error
	if (!id) {
		return res.status(400).send({ message: "Please specify a report id" })
	}

	try {
		// Find the reports based on reportID
		const reports = await Report.find({
			reportID: id
		})

		// Check if such a report is present
		if (reports) {
			// Compute the cumulative average and return the average and users corresponding to the reports
			var { users, avg } = computeCumulativeAvg(reports)
		} else {
			// If no such report is present in the DB, throw an error
			throw new Error("No report present with the given id")
		}
		// Make the result object
		let result = {
			_id: `${reports[0]?.marketID}-${reports[0]?.cmdtyID}`,
			cmdtyName: reports[0]?.cmdtyName,
			cmdtyID: reports[0]?.cmdtyID,
			marketID: reports[0]?.marketID,
			marketName: reports[0]?.marketName,
			users: users,
			timestamp: Math.floor(new Date().getTime() / 1000),
			priceUnit: "Kg",
			price: Math.floor(avg)
		}
		// Send the result object as a response
		return res.status(200).json(result)
	} catch (error) {
		// Throw an error if something went wrong
		console.log(error)
		return res.status(400).json({
			error: "The request was badly formatted!"
		})
	}
}
