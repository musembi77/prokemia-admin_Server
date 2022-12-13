//modules imports
const express = require("express");
//models imports
const Subscription_Plan = require("../../models/Subscriptions/subscription_plan.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.send(401).send("Bad Request")

    const id = payload._id
    try{
        const existing_subscription_plan = await Subscription_Plan.findOne({_id:id})
        if (!existing_subscription_plan)
        	return res.status(400).send("could not find this plan")

		await Subscription_Plan.findOneAndDelete({_id:id} ).then((response)=>{
			return res.status(200).send("Sucessfully deleted")
		})
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this plan at the moment")
    }
})

module.exports = router;