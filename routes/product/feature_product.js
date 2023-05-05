const express = require('express');

const Product = require("../../models/Utils/Product.js");

let router = express.Router()

router.post("/",async (req,res)=>{
    //get product details
    const payload = req.body;

    console.log(payload)
    if(!payload){
        return res.status(400).send('Bad request')
    }

    const allowed_scope_roles = ['IT','Manager',"Sales"];
	if (!allowed_scope_roles.includes(payload.auth_role)){
	    return res.status(401).send("You are not assigned the role to feature this product, kindly contact the Support")
	}

    const id = payload._id
    //console.log(id)
    
    const existing_product = await Product.findOne({_id:id})
    
    //console.log(existing_product)
    if(!existing_product){
        return res.status(400).send('This product does not exist or may have been deleted')
    }
    // const id = existingproduct._id
    //console.log(id)
    try{
        const query = {_id:id};
        const update = { $set: {
            sponsored:    true,
        }};
        const options = { };
        
        await Product.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
    }catch(err){
        return res.status(500).send("Could not feature this product, try again in a few minutes");
    }
})

module.exports = router;