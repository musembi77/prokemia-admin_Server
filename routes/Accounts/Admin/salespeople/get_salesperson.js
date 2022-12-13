//modules import
const express = require('express');
//models import
const Sales = require("../../../../models/Sales/SalesPerson.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    //get payload
    const payload  = req.body;
    //check if payload exists
    if (!payload)
    	return res.status(401).send('Bad request')

    const id = payload._id;

    try{
        const salesperson = await Sales.findOne({_id:id});
        return res.status(200).json(salesperson)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching salespersons")
    }
})

module.exports = router