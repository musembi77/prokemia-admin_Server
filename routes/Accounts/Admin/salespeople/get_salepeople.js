//modules import
const express = require('express');
//models import
const Sales = require("../../../../models/Sales/SalesPerson.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const salespeople = await Sales.find();
        //console.log(salespeople)
        return res.status(200).send(salespeople)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching salespeople")
    }
})

module.exports = router;