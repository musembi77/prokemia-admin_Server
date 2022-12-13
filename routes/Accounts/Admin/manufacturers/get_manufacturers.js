//modules import
const express = require('express');
//models import
const Manufacturer = require("../../../../models/Manufacturer/Manufacturer.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const manufacturers = await Manufacturer.find();
        return res.status(200).json(manufacturers)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching manufacturers")
    }
})

module.exports = router;