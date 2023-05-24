const express = require('express');

const Product = require("../../models/Utils/Product.js");
const Role_Verifier = require("../../controllers/role_verifier.js");

let router = express.Router()

router.post("/",async (req,res)=>{
    //get product details
    const payload = req.body;

    console.log(payload)
    if(!payload){
        return res.status(400).send('Bad request')
    }

     //check if an admin user is authorised
     const verify_role_payload = {
        task:'products',
        sub_task: 'feature_product',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);
    //console.log(verified_result)
    if (!verified_result){
        return res.status(401).send("You are not authorized to feature this product, kindly contact the administrator or support for any issues");
    }else{
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
    }
})

module.exports = router;