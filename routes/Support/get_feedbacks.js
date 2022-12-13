//modules imports
const express = require("express");
//models imports
const Feedback = require("../../models/Support/Feedback.js");

const router = express.Router()

router.get("/",async(req,res)=>{
	try{
		const feedbacks = await Feedback.find();
		
		return res.status(200).send(feedbacks)
	}catch(err){
		console.log(err)
		return res.status(500).send("Error while fetching feedbacks")
	}
})

module.exports = router;