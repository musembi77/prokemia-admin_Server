//modules imports
const express = require('express');
//models imports
const Order = require("../../models/Utils/Order.js");

let router = express.Router()

router.post("/",async (req,res)=>{
    //get payload
    const payload = req.body;
    //check if payload exists
    if(!payload){
        return res.send(400).send("Bad Request")
    }

    const allowed_scope_roles = ['IT','Manager','Supervisor','Sales']
    if (!allowed_scope_roles.includes(payload.auth_role)){
        return res.status(401).send("You are not assigned the role to delete orders, kindly contact the Administrator")
    }

    let id = payload._id //use id to find existing user
    try{
       const existing_order = await Order.findOne({_id:id})
		if(!existing_order){
			return res.status(400).send('This order does not exist or may have been deleted')
		}
		try{
			await Order.findOneAndDelete({_id:id}).then((response)=>{
				return res.status(200).send("Sucessfully deleted this account")
			})
		}catch(err){
			return res.status(500).send("Could not edit this order, try again in a few minutes");
		}
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this account at the moment")
    }
})

module.exports = router;