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
		sub_task: 'delete',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to delete this order, kindly contact the administrator or support for any issues");
	}else{
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
    }

})

module.exports = router;