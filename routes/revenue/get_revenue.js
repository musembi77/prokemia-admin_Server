const express = require('express')
const Revenue = require("../../models/Admin/Revenue.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const revenue = await Revenue.find();
        return res.status(200).json(revenue)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;