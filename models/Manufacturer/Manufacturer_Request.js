const mongoose = require("mongoose");

const Request_Schema = new mongoose.Schema({
	industry: 			{ type: String},
	technology: 		{ type: String},
	region:				{ type: String},
	name_of_requester: 	{ type: String},
	description: 		{ type: String},
	id_of_requester:	{ type: String},
	complete_request:   { type: Boolean}
},{timestamps:true})

module.exports = mongoose.model("requests",Request_Schema)