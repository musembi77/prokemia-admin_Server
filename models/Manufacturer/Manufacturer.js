const mongoose = require("mongoose");

const ManufacturerSchema = new mongoose.Schema({
	//account information
	first_name: 			{ type:String },
	last_name:  			{ type:String },
	position:				{type:String},
	profile_photo_url: 			{ type:String},
	//company user information - tells us of the company infomation
	email_of_company:		{type: String,unique:true}, //email of salesperson in the company
	mobile_of_company:		{ type: String},
	company_name: 			{ type: String},
	address_of_company:		{ type: String},
	description:			{ type:String},
	//Key_contact_of_company
	//Search-results
	//security - logins and authentications
	password:   			{ type: String},
	access_token: 			{ type: String},
	//listing_status - check if user has listed a product
	listing_status: 		{type: Boolean},
	sponsored_products:		{type: Number},
	//sales people in the company
	experts:				[{
								name: String,
								mobile: String,
								role:   String,
								description:   String,
								email: String
							}],
	//list of manufacturers representing
	distributors: 			[{
								name: String,
								email: String,
								mobile: String,
								industry: String
							}],
	//list of categories ventured / interested in
	industries: 			[{type: String}],
	technologies:			[{type: String}],
	//subscription information
	subscription: 			{ type: Boolean},
	subscription_plan: 		{ type: String},
	//verification_status
	valid_email_status: { type: Boolean},
	verification_status:		{ type: Boolean},
	suspension_status:  { type: Boolean},
	//date of joining
	joined_in:					{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("manufacturers",ManufacturerSchema);