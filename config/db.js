const mongoose = require("mongoose")

// Connect to remote MongoDB
const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})

	console.log(`MongoDB Connected: ${conn.connection.host}`)
}

// Export the DB instance
module.exports = connectDB
