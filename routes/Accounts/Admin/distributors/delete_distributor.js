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
	if (!payload)
		return res.status(400).send("Bad Request")

	//check if an admin user is authorised
	const verify_role_payload = {
		task:'distributors',
		sub_task: 'delete',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to delete this distributor, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id //use id to find existing user account

		const existing_distributor = await Distributor.findOne({_id:id}) //find user account
		
		try{
			if (!existing_distributor)
				return res.status(400).send("could not find this account")
	
			await Distributor.findOneAndDelete({_id:id} ).then((response)=>{
				return res.status(200).send("Sucessfully deleted")
			})
		}catch(err){
			console.log(err);
			return res.status(500).send("could not delete this user at the moment")
		}
	}

})

module.exports = router;