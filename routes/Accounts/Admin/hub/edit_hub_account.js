const express = require("express");

const Admin = require("../../../../models/Admin/Admin.js");
const Hub_Community = require("../../../../models/Sales/hub_community.js");

const router = express.Router();

router.post('/',async(req,res)=>{
	//get payload
	const payload = req.body;  
	//check if payload exists
	if (!payload)
		return res.status(400).send("Bad Request")
	
	//use the id to find existing user_account
	const id = payload._id //get the admin id
	const existing_admin = await Admin.findOne({_id:id})

	if (existing_admin.hub_access_status === true)
		return res.status(400).send("hub account already exists")

	const hub_account_id = existing_admin.hub_account_id //get the admuin user id
	if (existing_admin.hub_access_status === true)
		try{
			const query = {_id:hub_account_id};
	        const update = { $set: {
	            user_name:					payload.user_name,
				user_image_profile:			payload.user_image_profile,
				allow_notifications:  		payload.allow_notifications,
				mobile:						payload.mobile,
				email:						payload.email,
				description:				payload.description,
				login_status:				payload.login_status,
	        }};
	        const options = { };
	        
	        await Hub_Community.updateOne( query, update, options).then((response)=>{
				return res.status(200).send(response)
				//return res.status(200).send("successfully edited this account")
			})	
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not edit profile at the moment");
		}
	else{
		return res.status(500).send("could not find this hub account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;