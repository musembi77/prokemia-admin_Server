//modules imports
const express = require('express');
//models imports
const Order = require("../../models/Utils/Order.js");
const Role_Verifier = require("../../controllers/role_verifier.js");

let router = express.Router()

router.post("/",async (req,res)=>{
    const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

    //check if an admin user is authorised
	const verify_role_payload = {
		task:'orders',
		sub_task: 'approve',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to approve this order, kindly contact the administrator or support for any issues");
	}else{
        const id = payload._id
        //console.log(id)
        
        const existing_order = await Order.findOne({_id:id})
        
        //console.log(existing_order)
        if(!existing_order){
            return res.status(400).send('This order does not exist or may have been deleted')
        }
        try{
            const query = {_id:id};
            const update = { $set: {
                order_status: 				"completed",
            }};
            const options = { };
            
            await Order.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
        }catch(err){
            return res.status(500).send("Could not edit this order, try again in a few minutes");
        }
    }
})

module.exports = router;