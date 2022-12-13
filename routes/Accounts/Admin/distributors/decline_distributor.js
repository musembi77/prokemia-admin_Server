//this endpoint will email distributor to notify them that their account has been declined.
//modules imports
const express = require("express");
//models imports
const Distributor = require('../../../../models/Distributor/Distributor.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	//get payload
	const payload = req.body; 

	//check if payload exists
	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id //use id to find existing user account

	const existing_distributor = await Distributor.findOne({_id:id}) //find user account

	if (existing_distributor != null)
		try{
			const query = {_id:id};
	        const update = { $set: {
				verification_status:    false,
	        }};
	        const options = { };
	        
	        await Distributor.updateOne( query, update, options).then((response)=>{
				return res.status(200).send("successfully edited the profile")
			})
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not edit profile at the moment");
		}
	else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;