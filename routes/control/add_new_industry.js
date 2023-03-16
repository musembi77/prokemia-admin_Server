const express = require("express");
const Industry = require("../../models/Utils/Industry.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload){
		return res.send(401).send("Bad Request")
	}

	const allowed_scope_roles = ['IT','Manager','Supervisor','Sales']
    if (!allowed_scope_roles.includes(payload.auth_role)){
        return res.status(401).send("You are not assigned the role to add industries, kindly contact the Administrator")
    }

	try{
		const new_Industry = await Industry.create({
			title:						payload.title,
			description: 				payload.description,
			cover_image: 				payload.cover_image,
			verification_status:			true, 
		})
		return res.status(200).send("successfully added a new industry")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not add a new industry,try again in a few minutes")
	}
})

module.exports = router;