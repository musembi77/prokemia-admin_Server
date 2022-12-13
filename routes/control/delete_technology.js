const express = require('express');
const Technology = require("../../models/Utils/Technology.js");

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
        const technology = await Technology.findOne({_id:id});
        if (!technology)
        	return res.status(400).send("could not find this technology as it does not exist or may have been deleted.")
		await Technology.findOneAndDelete({_id:id} ).then((response)=>{
			return res.status(200).send("Sucessfully deleted")
		})
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this technology at the moment")
    }
})

module.exports = router;