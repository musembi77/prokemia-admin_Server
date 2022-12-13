//modules import
const express = require("express");
//models import
const Sales = require('../../../../models/Sales/SalesPerson.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	//get_payload
	const payload = req.body; 

	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id //get the salesperson id
	const existing_salesperson = await Sales.findOne({_id:id})

	if (existing_salesperson != null)
		try{
			const query = {_id:id};
	        const update = { $set: {
	            verification_status:    false,
	        }};
	        const options = { };
	        
	        await Sales.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})	
    	}catch(err){
		console.log(err)
		return res.status(500).send("could not verify the profile at the moment");
	}
	else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;