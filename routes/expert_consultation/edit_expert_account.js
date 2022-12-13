const express = require('express');

const Expert = require("../../models/Utils/Consultants.js");

let router = express.Router()

router.post("/",async (req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.send(401).send("Bad Request")

	//find existing expert account
    const id = payload._id
    //console.log(id)
    const existing_expert = await Expert.findOne({_id:id})
    
    //console.log(existing_expert)
    if(!existing_expert){
        return res.status(400).send('This account does not exist or may have been deleted')
    }
    try{
        const query = {_id:id};
        const update = { $set: {
            name:			payload.name,
			industry:		payload.industry,
			technology:   	payload.technology,
			email:			payload.email,
			mobile:			payload.mobile,
        }};
        const options = { };
        
        await Expert.updateOne( query, update, options).then((response)=>{
            return res.status(200).send("success")
        })
    }catch(err){
        return res.status(500).send("Could not edit this account, try again in a few minutes");
    }
})

module.exports = router;