//modules imports
const express = require('express');
//models imports
const Order = require("../../models/Utils/Order.js");

let router = express.Router()

router.post("/",async (req,res)=>{
    const payload = req.body;

    if(!payload){
        return res.status(400).send('Bad request')
    }

    const id = payload._id
    //console.log(id)
    
    const existing_order = await Order.findOne({_id:id})
    
    //console.log(existing_order)
    if(!existing_order){
        return res.status(400).send('This order does not exist or may have been deleted')
    }
    try{
        const query = {_id:id};
        const update = { $set: {
			order_status: 				"rejected",
        }};
        const options = { };
        
        await Order.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
    }catch(err){
        return res.status(500).send("Could not edit this order, try again in a few minutes");
    }
})

module.exports = router;