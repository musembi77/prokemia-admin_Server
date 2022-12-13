const mongoose = require("mongoose");

const mailing_list_Schema = new mongoose.Schema({
	name: 			    { type: String },
	email:  			{ type: String },
	mobile:  			{ type: String },
	createdAt:			{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("landing_page_mailing_list",mailing_list_Schema);