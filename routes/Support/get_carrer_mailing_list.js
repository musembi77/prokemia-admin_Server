//modules imports
const express = require("express");
//models imports
const Mailing_list = require("../../models/Support/Career_mailing_list.js");

const router = express.Router()

router.get("/",async(req,res)=>{
	try{
		const mailing_list = await Mailing_list.find();
		
		return res.status(200).send(mailing_list)
	}catch(err){
		console.log(err)
		return res.status(500).send("Error while fetching mailing_list")
	}
})

module.exports = router;