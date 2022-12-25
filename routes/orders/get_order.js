const express = require('express')
const Order = require("../../models/Utils/Order.js");

let router = express.Router()

router.post('/',async(req,res)=>{
    //get payload
    const  payload  = req.body;

    const id = payload._id
    //console.log(id)
    //use payload to find products
    if (!payload)
    	return res.status(401).send('Bad request')

    try{
        const order = await Order.findOne({_id:id});
        return res.status(200).send(order)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching order")
    }
})

module.exports = router;