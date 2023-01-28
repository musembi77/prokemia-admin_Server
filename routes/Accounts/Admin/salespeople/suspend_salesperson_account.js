//modules import
const express = require("express");
const axios = require('axios')

//models imports
const Sales = require('../../../../models/Sales/SalesPerson.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 

	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id //get the salesperson id

	const existing_salesperson = await Sales.findOne({_id:id}) //checks if a salesperson_Account already exists

	if (existing_salesperson != null) //if there is a salesperson_account
		try{
			const query = {_id:id};
	        const update = { $set: {
				suspension_status:  true,
	        }};
	        const options = { };
	        
	        await Sales.updateOne( query, update, options).then((response)=>{
	        	const email_payload = {
	        		email : existing_salesperson.email_of_salesperson
	        	}
	        	axios.post("http://localhost:5001/api/suspend_account_email",email_payload)
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