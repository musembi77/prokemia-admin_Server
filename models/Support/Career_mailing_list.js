const mongoose = require("mongoose");

const Career_mailing_list_Schema = new mongoose.Schema({
	name: 			    { type: String },
	email:  			{ type: String },
	createdAt:			{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("mailing_list",Career_mailing_list_Schema);