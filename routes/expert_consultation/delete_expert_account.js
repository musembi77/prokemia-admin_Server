const express = require('express');

const Expert = require("../../models/Utils/Consultants.js");

let router = express.Router()

router.post("/",async (req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.send(401).send("Bad Request")

	//find existing expert account
    const id = payload._id
	const existing_expert = await Expert.findOne({_id:id})
    try{
        if (!existing_expert)
        	return res.status(400).send("could not find this account")

		await Expert.findOneAndDelete({_id:id} ).then((response)=>{
			return res.status(200).send("Sucessfully deleted")
		})
		
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this account at the moment")
    }
})

module.exports = router;