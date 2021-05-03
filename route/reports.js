const express = require("express")

const { createReport, getAggregatedReport } = require("../controller/reports")

const router = express.Router()

router.route("/").post(createReport)
router.route("/:id").get(getAggregatedReport)

module.exports = router
