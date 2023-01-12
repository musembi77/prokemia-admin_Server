const mongoose = require("mongoose");

const TechnologySchema = new mongoose.Schema({
	title: 			{ type: String},
	cover_image: 	{ type: String},
	description: 	{ type: String},
	//verification_status
	verification_status:		{ type: Boolean},
	createdAt:		{ type: Date, default: Date.now}
},{timestamps:true})

module.exports = mongoose.model("technologies",TechnologySchema)