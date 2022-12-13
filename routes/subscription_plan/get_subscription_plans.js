//modules imports
const express = require("express");
//models imports
const Subscription_Plan = require("../../models/Subscriptions/subscription_plan.js");

const router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const plans = await Subscription_Plan.find();
        return res.status(200).json(plans)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;