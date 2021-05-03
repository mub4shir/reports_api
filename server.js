const express = require("express")
require("dotenv").config() // Importing .env file
const morgan = require("morgan") // Morgan for logging

const connectDB = require("./config/db") // DB instance

// Connect to database
connectDB() // Connect to DB

// Route file
const reports = require("./route/reports")

// PORT
const PORT = process.env.PORT || 5000

const app = express() // express app

// Body parser
app.use(express.json()) // body parser so that we can use req.body and req.params

// Dev logging middleware

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"))
}

// Mount router
app.use("/reports", reports)

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`)
	// Close server and exit process
	server.close(() => process.exit(1))
})
