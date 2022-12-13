const mongoose = require("mongoose");

const ExpertConsultationSchema = new mongoose.Schema({
	name:			{ type: String},
	industry:		{ type: String},
	technology:   	{ type: String},
	email:			{ type: String},
	mobile:			{ type: String},
	uid:			{ type: String},
	//verification_status
	verification_status:		{ type: Boolean},
	createdAt:		{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("experts",ExpertConsultationSchema);
