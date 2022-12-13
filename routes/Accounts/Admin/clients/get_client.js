//modules import
const express = require('express');
//models import
const Client = require("../../../../models/Client/Client.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    //get payload
    const payload  = req.body;
    //check if payload exists
    if (!payload)
    	return res.status(401).send('Bad request')

    const id = payload._id;

    try{
        const client = await Client.findOne({_id:id});
        return res.send(client)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching client")
    }
})

module.exports = router