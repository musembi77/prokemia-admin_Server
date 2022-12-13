const express = require("express");
const Industry = require("../../models/Utils/Industry.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload)
		return res.send(401).send("Bad Request")

	try{
		const new_Industry = await Industry.create({
			title:						payload.title,
			cover_image: 				payload.cover_image,
			verification_status:			true, 
		})
		return res.status(200).send("successfully added a new industry")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not add a new industry")
	}
})

module.exports = router;