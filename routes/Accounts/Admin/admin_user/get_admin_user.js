//modules imports
const express = require('express');
//models imports
const Admin = require('../../../../models/Admin/Admin.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body;
    console.log(payload) 

	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id

	const existing_admin = await Admin.findOne({_id:id})

	if (existing_admin != null)
        return res.status(200).send(existing_admin);
	else{
		return res.status(500).send("could not fetch this account at the moment");
	}
})

module.exports = router;