//modules imports
const express = require('express');
//models imports
const Admin_Roles = require("../../../../models/Admin/Admin_scope_roles.js")

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body;
    console.log(payload) 

	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id

	const existing_role = await Admin_Roles.findOne({_id:id})

	if (existing_role != null)
        return res.status(200).send(existing_role);
	else{
		return res.status(500).send("could not fetch this role at the moment");
	}
})

module.exports = router;