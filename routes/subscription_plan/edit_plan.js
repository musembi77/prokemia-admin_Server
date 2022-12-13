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
    //console.log(id)
    
    const existing_subscription_plan = await Subscription_Plan.findOne({_id:id})
    
    //console.log(existingproduct)
    if(!existing_subscription_plan){
        return res.status(400).send('This plan does not exist or may have been deleted')
    }
    // const id = existingproduct._id
    //console.log(id)
    try{
        const query = {_id:id};
        const update = { $set: {
        	period:    	payload.period,
			biling:     payload.biling,
			price: 	   	payload.price,
			discount:   payload.discount,
        }};
        const options = { };
        
        await Subscription_Plan.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
    }catch(err){
        return res.status(500).send("Could not edit this plan, try again in a few minutes");
    }
})

module.exports = router;