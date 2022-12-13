const mongoose = require("mongoose");

const VacancySchema = new mongoose.Schema({
	//vacancy info
	title:			{ type: String},
	description:	{ type: String},
	requirements:  	{ type: String},
	valid_till: 	{ type: Date},
	status: 		{ type: String},
	//lister info
	company: 		{ type: String},
	link:			{ type: String},
	//date
	createdAt:		{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("vacancies",VacancySchema);
