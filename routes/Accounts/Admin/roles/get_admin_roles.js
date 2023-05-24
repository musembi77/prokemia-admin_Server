//modules imports
const express = require('express');
//models imports
const Admin_Roles = require("../../../../models/Admin/Admin_scope_roles.js")

let router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const admins_roles = await Admin_Roles.find();
        return res.status(200).send(admins_roles)
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching roles")
    }
})

module.exports = router;