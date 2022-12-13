//modules imports
const express = require("express");
//models imports
const Support_Question = require("../../models/Support/Support_questions.js");

const router = express.Router()

router.get("/",async(req,res)=>{
	try{
		const questions = await Support_Question.find();
		
		return res.status(200).send(questions)
	}catch(err){
		console.log(err)
		return res.status(500).send("Error while fetching questions")
	}
})

module.exports = router;