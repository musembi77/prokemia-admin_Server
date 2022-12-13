//modules import
const express = require("express");

//models imports
const Manufacturer = require('../../../../models/Manufacturer/Manufacturer.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 

	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id //get the manufacturer id

	const existing_manufacturer = await Manufacturer.findOne({_id:id}) //checks if a manufacturer_Account already exists

	if (existing_manufacturer != null) //if there is a manufacturer_account
		try{
			const query = {_id:id};
	        const update = { $set: {
				suspension_status:  true,
	        }};
	        const options = { };
	        
	        await Manufacturer.updateOne( query, update, options).then((response)=>{
				return res.status(200).send("success")
			})	
    	}catch(err){
		console.log(err)
		return res.status(500).send("could not suspend profile at the moment");
	}
	else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;