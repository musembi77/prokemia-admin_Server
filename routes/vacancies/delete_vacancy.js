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
    try{
        const existing_vacancy = await Vacancy.findOne({_id:id})
        if (!existing_vacancy)
        	return res.status(400).send("This vacancy does not exist or it may have been deleted")

		await Vacancy.findOneAndDelete({_id:id} ).then((response)=>{
			return res.status(200).send("Sucessfully deleted")
		})
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this vacancy at the moment")
    }
})

module.exports = router;