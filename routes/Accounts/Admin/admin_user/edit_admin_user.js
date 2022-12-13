//modules imports
const express = require('express');
//models imports
const Admin = require('../../../../models/Admin/Admin.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 

	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id

	const existing_admin = await Admin.findOne({_id:id})

	if (existing_admin != null)
		try{
	        const query = {_id:id};
	        const update = { $set: {
	            user_name:		payload.user_name,
				role:			payload.role,
				user_image:     payload.user_image,
				login_status:	payload.user_image,
	        }};
	        const options = { };
	        
	        await Admin.updateOne( query, update, options).then((response)=>{
				return res.status(200).send("success")
			})
	    }catch(err){
	        return res.status(500).send("Could not edit this account, try again in a few minutes");
	    }
	else{
		return res.status(500).send("could not find this account at the moment");
	}
})

module.exports = router;