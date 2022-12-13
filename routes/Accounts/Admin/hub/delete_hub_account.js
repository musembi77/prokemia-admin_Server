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

    try{
        if (!existing_admin)
        	res.status(200).send("could not find this admin account")

        const hub_account_id = existing_admin.hub_account_id
		//console.log(existing_salesperson)
		
        if (existing_admin.hub_access_status === true){
			console.log(existing_admin.hub_access_status)
        	await Hub_Community.findOneAndDelete({_id:hub_account_id}).then(()=>{
				const query = {_id:id};
				const update = { $set: {
					hub_access_status: false,
					hub_account_id: ""
				}};
				const options = { };

				Admin.updateOne( query, update, options).then(()=>{
					return res.status(400).send("Sucessfully deleted hub account")
				})
			})
		}else{
			return res.status(400).send("could not find your hub_account, it does not exist or you did not create one")
		}
		
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this account at the moment")
    }
})

module.exports = router;