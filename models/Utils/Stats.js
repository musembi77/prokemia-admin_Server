const mongoose = require("mongoose");

const RequestsSchema = new mongoose.Schema({
	quotations: 	{ type: Number},
	// search: 		[
	// 					{ 
	// 						query: String,
	// 						date: Date
	// 					}
	// 				],
	samples:		{ type: Number},
	formulations: 	{ type: Number},
},{timestamps:true})

module.exports = mongoose.model("requests",RequestsSchema)