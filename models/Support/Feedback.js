const mongoose = require("mongoose");

const Feedback_Schema = new mongoose.Schema({
	name: 			    { type: String },
	email:  			{ type: String },
	feedback: 			{ type: String},
    rate:               { type: Number},
},{timestamps:true})

module.exports = mongoose.model("Feedbacks",Feedback_Schema);