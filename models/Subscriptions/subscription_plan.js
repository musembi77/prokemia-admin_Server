const mongoose = require("mongoose");

const Subscription_PlanSchema = new mongoose.Schema({
	period: 			{ type:String },
	biling:  			{ type:String },
	price: 				{ type: Number},
	discount:   		{ type: Number},
	createdAt:			{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("subscription_plans",Subscription_PlanSchema);