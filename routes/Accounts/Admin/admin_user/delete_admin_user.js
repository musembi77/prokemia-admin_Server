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
    
    try{
        if (!existing_admin)
        	return res.status(400).send("could not find this account")

		await Admin.findOneAndDelete({_id:id} ).then((response)=>{
			return res.status(200).send("Sucessfully deleted")
		})
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this user at the moment")
    }
})

module.exports = router;