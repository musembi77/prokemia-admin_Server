//modules imports
const express = require('express');
//models imports
const Stats = require('../../models/Utils/Stats.js');

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const stats_info = await Stats.find();
        return res.status(200).json(stats_info)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching stats")
    }
})

module.exports = router;