const express = require("express");
const Expert = require("../../models/Utils/Consultants.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.send(401).send("Bad Request")

	//find existing expert account
	const existing_expert = await Expert.findOne({email:payload.email})

	if (!existing_expert)
		try{
			const new_Expert = await Expert.create({
				name:			payload.name,
				industry:		payload.industry,
				technology:   	payload.technology,
				email:			payload.email,
				mobile:			payload.mobile,
				uid:			payload._id,
				verification_status: false
			})
			return res.status(200).send("successfully created your account")
		}catch(err){
			console.log(err)
			return res.status(500).send("Could not create your new account")
		}
	return res.status(500).send("expert account already exists")
})

module.exports = router;