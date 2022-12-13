//this endpoint will email lister to notify them that their listing has been declined.

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
        return res.status(400).send('could not find this product as it does not exist or it may have been deleted')
    }
    // const id = existingproduct._id
    //console.log(id)
    try{
        const query = {_id:id};
        const update = { $set: {
            verification_status:    false,
        }};
        const options = { };
        
        await Product.updateOne( query, update, options).then((response)=>{
            return res.status(200).send("success")
        })
    }catch(err){
        return res.status(500).send("Could not Verify this product, try again in a few minutes");
    }
})

module.exports = router;