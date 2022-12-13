//modules import
const express = require('express');
//models import
const Distributor = require("../../../../models/Distributor/Distributor.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const distributors = await Distributor.find();
        return res.status(200).json(distributors)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching distributors")
    }
})

module.exports = router;