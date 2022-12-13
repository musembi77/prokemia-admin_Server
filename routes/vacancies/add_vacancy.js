//modules imports
const express = require("express");
//models imports
const Vacancy = require("../../models/Admin/Vacancies.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.send(401).send("Bad Request")

	try{
		const new_Vacancy = await Vacancy.create({
			title:			payload.title,
			description:	payload.description,
			requirements:  	payload.requirements,
			link:			payload.link,
			company: 		payload.company,
			status: 		payload.status,
			valid_till: 	payload.valid_till,
		})
		
		return res.status(200).send("successfully added a  new vacancy")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not add a new vacancy")
	}
})

module.exports = router;