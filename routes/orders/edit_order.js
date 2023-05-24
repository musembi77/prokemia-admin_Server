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
		sub_task: 'edit',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to edit this order, kindly contact the administrator or support for any issues");
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
                //client info
                name_of_client:             payload.name_of_client,
                company_name_of_client:     payload.company_name_of_client,
                mobile_of_client:           payload.mobile_of_client,
                email_of_client:            payload.email_of_client,
                location_of_client:         payload.location_of_client,
                //product info
                name_of_product:            payload.name_of_product,
                volume_of_items:            payload.volume_of_items,
                unit_price:                 payload.unit_price,
                total:                      payload.total,
                //payment_info
                delivery_terms:             payload.delivery_terms,
                delivery_date:              payload.delivery_date,
                payment_terms:              payload.payment_terms,
            }};
            const options = { };
            
            await Order.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
        }catch(err){
            return res.status(500).send("Could not edit this order, try again in a few minutes");
        }
    }
})

module.exports = router;