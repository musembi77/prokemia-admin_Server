const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
	//user info
	user_name:		{ type: String},
	user_image: 	{ type: String},
	//user role
	role:			{ type: String},
	//security
	user_password:  { type: String},
	access_token: 	{ type: String},
	login_status:	{ type: Boolean},
	hub_access_status: 	{type: Boolean},
	hub_account_id: 	{type: String},
	//date
	createdAt:		{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("admins",AdminSchema);
