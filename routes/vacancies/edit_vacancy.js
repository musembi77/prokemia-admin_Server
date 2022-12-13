//modules imports
const express = require("express");
//models imports
const Vacancy = require("../../models/Admin/Vacancies.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.send(401).send("Bad Request")

    const id = payload._id
    //console.log(id)
    
    const existing_vacancy = await Vacancy.findOne({_id:id})
    
    if(!existing_vacancy){
        return res.status(400).send('This vacancy does not exist or may have been deleted')
    }
    try{
        const query = {_id:id};
        const update = { $set: {
        	title:			payload.title,
			description:	payload.description,
			requirements:  	payload.requirements,
			link:			payload.link,
			company: 		payload.company,
			status: 		payload.status
        }};
        const options = { };
        
        await Vacancy.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
    }catch(err){
        return res.status(500).send("Could not edit this vacancy, try again in a few minutes");
    }
})

module.exports = router;