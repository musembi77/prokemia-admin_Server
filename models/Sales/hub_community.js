const mongoose = require("mongoose");

const Hub_account_Schema = new mongoose.Schema({
	//account info
	user_name:					{ type: String},
	mobile:    					{ type: String},
	email:   					{ type: String},
	user_profile_image:			{ type: String},
	description:				{ type: String},
	user_salesperson_id: 		{ type: String},
	//settings
	allow_notifications:  		{ type: Boolean},
	login_status:				{ type: Boolean},
	//date
	createdAt:					{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("hub_accounts",Hub_account_Schema);
