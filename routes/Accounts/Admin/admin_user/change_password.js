//modules imports
const express = require('express');
//models imports
const Admin = require('../../../../models/Admin/Admin.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 
	//console.log(payload)
	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id
    const salt = bcrypt.genSaltSync(10);
    const encrypted_password = bcrypt.hashSync(payload?.user_password, salt);

	const existing_admin = await Admin.findOne({_id:id})
	//console.log(existing_admin)
	if (existing_admin)
		try{
	        const query = {_id:id};
	        const update = { $set: {
                //security
                user_password:          encrypted_password,
	        }};
	        const options = { };
	        
	        await Admin.updateOne( query, update, options).then((response)=>{
				return res.status(200).send("success")
			}).catch((err)=>{
				console.log(err)
			})
	    }catch(err){
	    	console.log(err)
	        return res.status(500).send("Could not edit this password, try again in a few minutes");
	    }
	else{
		return res.status(500).send("could not find this account at the moment");
	}
})

module.exports = router;