//modules import
const express = require('express');
//models import
const Requests = require("../../../../models/Manufacturer/Manufacturer_Request.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const requests = await Requests.find();
        return res.status(200).json(requests)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching requests")
    }
})

module.exports = router;