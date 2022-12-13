//modules imports
const express = require('express');
//models imports
const Order = require("../../models/Utils/Order.js");

let router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const orders = await Order.find();
        return res.status(200).json(orders)
        //console.log(response)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;