const mongoose = require("mongoose");

const Order_Schema = new mongoose.Schema({
	//creater info
	creator_id:					{ type: String},
	//client info
	name_of_client:				{ type: String},
	email_of_client:			{ type: String},
	//product info
	name_of_product:  			{ type: String},
	volume_of_items:			{ type: Number},
	unit_price: 				{ type: Number},
	total: 						{ type: Number},
	order_status: 				{ type: String}, //ie pending, dispatched
	//date
	createdAt:					{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("orders",Order_Schema);