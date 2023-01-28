//modules import
const express = require("express");
const axios = require("axios")

//models imports
const Distributor = require('../../../../models/Distributor/Distributor.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 

	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id //get the distributor id

	const existing_distributor = await Distributor.findOne({_id:id}) //checks if a distributor_Account already exists

	if (existing_distributor != null) //if there is a distributor_account
		try{
			const query = {_id:id};
	        const update = { $set: {
				suspension_status:  true,
	        }};
	        const options = { };
	        
	        await Distributor.updateOne( query, update, options).then((response)=>{
	        	const email_payload = {
	        		email : existing_distributor.email_of_company
	        	}
	        	axios.post("https://prokemiaemailsmsserver-production.up.railway.app/api/suspend_account_email",email_payload)
				return res.status(200).send("success")
			})	
    	}catch(err){
		console.log(err)
		return res.status(500).send("could not suspend profile at the moment");
	}
	else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;