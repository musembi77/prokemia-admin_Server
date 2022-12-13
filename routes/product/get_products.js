const express = require('express')
const Product = require("../../models/Utils/Product.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const products = await Product.find();
        //applying payload params to get results
        const response = (products?.sort((a,b)=> Number(b.sponsored) - Number(a.sponsored)));
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching products")
    }
})

module.exports = router;