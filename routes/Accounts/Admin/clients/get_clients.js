//modules import
const express = require('express');
//models import
const Client = require("../../../../models/Client/Client.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const clients = await Client.find();
        return res.send(clients)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching clients")
    }
})

module.exports = router;