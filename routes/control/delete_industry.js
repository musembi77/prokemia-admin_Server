const express = require('express');
const Industry = require("../../models/Utils/Industry.js");

let router = express.Router()

router.post("/",async (req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload)
		return res.send(401).send("Bad Request")

    const id = payload._id
    //console.log(id)

    try{
        const industry = await Industry.findOne({_id:id});
        if (!industry)
        	return res.status(400).send("could not find this industry as it does not exist or may have been deleted")
		await Industry.findOneAndDelete({_id:id} ).then((response)=>{
			return res.status(200).send("Sucessfully deleted")
		})
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this industry at the moment")
    }
})

module.exports = router;