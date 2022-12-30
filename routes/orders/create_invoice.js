//modules imports
const express = require('express');
//models imports
const Order = require("../../models/Utils/Order.js");

const router = express.Router()

router.post("/",async(req,res)=>{
  //get payload
  const payload = req.body;
  //check if payload exists
  if (!payload)
    return res.send(401).send("Bad Request")

  const id = payload._id

  try{
        const query = {_id:id};
        const update = { $set: {
          order_status:    'completed',
        }};
        const options = { };
        
        await Order.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
  }catch(err){
    console.log(err)
    return res.status(500).send("Could not edit this order")
  }
})

module.exports = router;