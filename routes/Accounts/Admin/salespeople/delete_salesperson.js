//modules imports
const express = require('express');

//models import
const Sales = require('../../../../models/Sales/SalesPerson.js');
const Role_Verifier = require("../../../../controllers/role_verifier.js");

let router = express.Router()

router.post('/',async (req,res,next)=>{
    //get_payload
	const payload = req.body; 

	if (!payload){
		return res.status(400).send("Bad Request")
	}

	 //check if an admin user is authorised
	 const verify_role_payload = {
		task:'salespeople',
		sub_task: 'delete',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to delete this account, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id //get the salesperson id
		const existing_salesperson = await Sales.findOne({_id:id})
		
		try{
			if (!existing_salesperson)
				return res.status(400).send("could not find this account")
	
			await Sales.findOneAndDelete({_id:id} ).then((response)=>{
				return res.status(200).send("Sucessfully deleted")
			})
		}catch(err){
			console.log(err);
			return res.status(500).send("could not delete this user at the moment")
		}
	}

})

module.exports = router;