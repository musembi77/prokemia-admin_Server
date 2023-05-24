//this endpoint will email distributor to notify them that their account has been declined.
//modules imports
const express = require("express");
//models imports
const Distributor = require('../../../../models/Distributor/Distributor.js');
const Role_Verifier = require("../../../../controllers/role_verifier.js");

const router = express.Router();

router.post('/',async(req,res)=>{
	//get payload
	const payload = req.body; 

	//check if payload exists
	if (!payload){
		return res.status(400).send("Bad Request")
	}

	//check if an admin user is authorised
	const verify_role_payload = {
		task:'distributors',
		sub_task: 'un_subscribe',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to un-subscribe this distributor, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id //use id to find existing user account
	
		const existing_distributor = await Distributor.findOne({_id:id}) //find user account
	
		if (existing_distributor != null)
			try{
				const query = {_id:id};
				const update = { $set: {
					subscription:    false,
				}};
				const options = { };
				
				await Distributor.updateOne( query, update, options).then((response)=>{
					return res.status(200).send("successfully subscribed this account.")
				})
			}catch(err){
				console.log(err)
				return res.status(500).send("could not un-subscribe this profile at the moment");
			}
		else{
			return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
		}
	}
})

module.exports = router;