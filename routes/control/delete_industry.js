const express = require('express');
const Industry = require("../../models/Utils/Industry.js");
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
		task:'industries',
		sub_task: 'delete',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to delete this industry, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id
		//console.log(id)
	
		try{
			const industry = await Industry.findOne({_id:id});
			if (!industry)
				return res.status(400).send("could not find this industry as it does not exist or may have been deleted")
			await Industry.findOneAndDelete({_id:id} ).then((response)=>{
				return res.status(200).send("Sucessfully deleted")
			})
		}catch(err){
			console.log(err);
			return res.status(500).send("could not delete this industry at the moment")
		}
	}
})

module.exports = router;