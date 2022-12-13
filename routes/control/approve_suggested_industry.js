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
    
    const existing_industry = await Industry.findOne({_id:id})
    
    if(!existing_industry){
        return res.status(400).send('This industry does not exist or may have been deleted')
    }
    try{
        const query = {_id:id};
        const update = { $set: {
			verification_status: 			true,
        }};
        const options = { };
        
        await Industry.updateOne( query, update, options).then((response)=>{
            return res.status(200).send("success")
        })
    }catch(err){
        return res.status(500).send("Could not approve this industry, try again in a few minutes");
    }
})

module.exports = router;