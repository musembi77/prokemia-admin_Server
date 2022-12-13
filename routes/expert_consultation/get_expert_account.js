//modules imports
const express = require('express');
//models import
const Expert = require("../../models/Utils/Consultants.js");

let router = express.Router()

router.get('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }
    const id = payload._id //get the salesperson id

	const existing_expert = await Expert.findOne({_id:id})

	if (existing_expert != null) //if there is a sales_account
		return res.status(200).send(existing_expert);
	return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
});

module.exports = router;