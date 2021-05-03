function computeCumulativeAvg(commodities) {
	let sum = 0
	let avg
	let users = []
	for (let i = 0; i < commodities.length; ++i) {
		let val = parseFloat(parseInt(commodities[i].price) / parseInt(commodities[i].convFctr)).toFixed(2)
		users.push(commodities[i]?.userID)
		sum = eval(sum) + eval(val)
	}
	avg = (sum / commodities.length).toFixed(2)
	return { users, avg }
}

module.exports = computeCumulativeAvg
