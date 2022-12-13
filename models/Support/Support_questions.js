const mongoose = require("mongoose");

const Support_Question_Schema = new mongoose.Schema({
	name: 			    { type: String },
	email:  			{ type: String },
	message: 			{ type: String},
	createdAt:			{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("support_questions",Support_Question_Schema); 