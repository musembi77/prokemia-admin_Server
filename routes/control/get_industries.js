const express = require('express')
const Industry = require("../../models/Utils/Industry.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const industries = await Industry.find();
        //const response = (industries?.filter((item)=> item.verification_status?.includes("true")));
        return res.status(200).send(industries)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;