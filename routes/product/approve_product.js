//modules imports
const express = require('express');
//models imports
const Product = require("../../models/Utils/Product.js");

let router = express.Router()

router.post("/",async (req,res)=>{
    //get product details
    const payload = req.body;

    //console.log(payload)
    if(!payload){
        return res.status(400).send('Bad request')
    }

    const id = payload._id
    //console.log(id)
    
    const existing_product = await Product.findOne({_id:id})
    
    //console.log(existing_product)
    if(!existing_product){
        return res.status(400).send('This product does not exist or may have been deleted')
    }

    try{
        const query = {_id:id};
        const update = { $set: {
            verification_status:    true,
        }};
        const options = { };
        
        await Product.updateOne( query, update, options).then((response)=>{
            return res.status(200).send("success")
        })
    }catch(err){
        console.log(err)
        return res.status(500).send("Could not Verify this product, try again in a few minutes");
    }
})

module.exports = router;