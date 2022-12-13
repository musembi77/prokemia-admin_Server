//modules imports
const express = require("express");
//models imports
const Subscription_Plan = require("../../models/Subscriptions/subscription_plan.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.send(401).send("Bad Request")

	try{
		const newSubscription_Plan = await Subscription_Plan.create({
			period:    	payload.period,
			biling:     payload.biling,
			price: 	   	payload.price,
			discount:   payload.discount,
		})
		
		return res.status(200).send("successfully added a new plan")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not add a new plan")
	}
})

module.exports = router;