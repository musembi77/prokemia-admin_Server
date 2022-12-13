const express = require('express')
const Expert = require("../../models/Utils/Consultants.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const experts = await Expert.find();
        return res.status(200).json(experts)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;