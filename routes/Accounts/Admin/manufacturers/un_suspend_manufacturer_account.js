//modules import
const express = require("express");
const axios = require('axios')
//models imports
const Manufacturer = require('../../../../models/Manufacturer/Manufacturer.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 

	console.log(payload)
	if (!payload){
		return res.status(400).send("Bad Request")
	}

	const allowed_scope_roles = ['IT','Manager','Supervisor','Sales']
    if (!allowed_scope_roles.includes(payload.auth_role)){
        return res.status(401).send("You are not assigned the role to activate accounts, kindly contact the Administrator")
    }

	const id = payload._id //get the manufacturer id

	const existing_manufacturer = await Manufacturer.findOne({_id:id}) //checks if a manufacturer_Account already exists

	if (existing_manufacturer != null) //if there is a manufacturer_account
		try{
			const query = {_id:id};
	        const update = { $set: {
				suspension_status:  false,
	        }};
	        const options = { };
	        
	        await Manufacturer.updateOne( query, update, options).then((response)=>{
				const email_payload = {
	        		email : existing_manufacturer.email_of_company
	        	}
	        	axios.post("https://prokemiaemailsmsserver-production.up.railway.app/api/reactivate_account_email",email_payload)
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