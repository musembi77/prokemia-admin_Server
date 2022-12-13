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
	
	if (existing_admin != null)
		try{
			
			const new_Hub_account = await Hub_Community.create({
				user_name:					payload.user_name,
				mobile:						payload.mobile,
				email:						payload.email,
				description:				payload.description,
				user_image_profile:			payload.user_image_profile,
				allow_notifications:  		payload.allow_notifications,
				user_admin_id: 		id,
				login_status:      			true,
			})

			const query = {_id:id};
	        const update = { $set: {
				hub_access_status: true,
				hub_account_id: new_Hub_account._id
	        }};
	        const options = { };
	        
	        await Sales.updateOne( query, update, options).then(()=>{
				return res.status(200).send("success")
			})
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not create a new hub_access account at the moment");
		}
	else{
		return res.status(500).send("could not this account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;