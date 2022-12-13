//modules imports
const express = require('express');
//models imports
const Order = require("../../models/Utils/Order.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload)
		return res.send(401).send("Bad Request")

	try{
		const new_Order = await Order.create({
			name_of_client:				payload.name_of_client,
			email_of_client:			payload.email_of_client,
			name_of_product:  			payload.name_of_product,
			volume_of_items:			payload.volume_of_items,
			unit_price: 				payload.unit_price,
			creator_id:					payload.creator_id,
			total: 						payload.total,
			status: 					"pending",
		})
		
		return res.status(200).send("successfully created your order")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not create your order")
	}
})

module.exports = router;