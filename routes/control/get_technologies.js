const express = require('express')
const Technology = require("../../models/Utils/Technology.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const technologies = await Technology.find();
        return res.status(200).json(technologies)
    }catch(err){
        console.log(err);
        return res.status(500).send('Could not fetch technologies data')
    }
})

module.exports = router;