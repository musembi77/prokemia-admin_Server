const mongoose = require("mongoose");

const Admin_scope_Schema = new mongoose.Schema({
	//user info
	title:		{ type: String},
	description: 	{ type: String},
	tier:     {type : String},
	//date
	createdAt:		{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("admins",Admin_scope_Schema);
