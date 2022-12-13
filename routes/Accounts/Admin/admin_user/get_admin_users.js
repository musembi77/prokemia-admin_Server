//modules imports
const express = require('express');
//models imports
const Admin = require('../../../../models/Admin/Admin.js');

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const admins_users = await Admin.find();
        return res.status(200).json(admins_users)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching users")
    }
})

module.exports = router;