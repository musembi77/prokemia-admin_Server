const mongoose = require("mongoose");

const RevenueSchema = new mongoose.Schema({
	revenue: 			{ type: Number},
	createdAt:			{ type: Date, default: Date.now}
},{timestamps:true})

module.exports = mongoose.model("industries",RevenueSchema)