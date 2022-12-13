const express = require("express");
const Technology = require("../../models/Utils/Technology.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload)
		return res.send(401).send("Bad Request")

	try{
		const new_Technology= await Technology.create({
			title:					payload.title,
			cover_image: 			payload.cover_image,
			verification_status: 	true,
		})
		return res.status(200).send("successfully added a new technology")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not add a new technology")
	}
})

module.exports = router;