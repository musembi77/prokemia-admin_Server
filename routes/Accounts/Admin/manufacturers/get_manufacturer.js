//modules import
const express = require('express');
//models import
const Manufacturer = require("../../../../models/Manufacturer/Manufacturer.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    //get payload
    const payload  = req.body;
    //check if payload exists
    if (!payload)
        return res.status(401).send('Bad request')

    const id = payload._id;

    try{
        const manufacturer = await Manufacturer.findOne({_id:id});
        return res.status(200).json(manufacturer)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching manufacturer")
    }
})

module.exports = router