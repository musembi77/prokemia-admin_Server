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
			//creater info
			creator_id:					payload.creator_id,
			creator_name:				payload.creator_name,
			email_of_creator: 			payload.email_of_creator,
			mobile_of_creator: 			payload.mobile_of_creator,
			//client info
			name_of_client:				payload.name_of_client,
			company_name_of_client:     payload.company_name_of_client,
			mobile_of_client: 			payload.mobile_of_client,
			email_of_client:			payload.email_of_client,
			location_of_client:			payload.location_of_client,
			//product info
			name_of_product:  			payload.name_of_product,
			volume_of_items:			payload.volume_of_items,
			unit_price: 				payload.unit_price,
			total: 						payload.total,
			//payment_info
			delivery_terms: 			'',
			delivery_date: 				'',
			payment_terms: 				'',
			order_notification_status:  false,
			order_status: 				"pending", //ie pending, dispatched
		})
		
		return res.status(200).send("successfully created your order")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not create your order")
	}
})

module.exports = router;