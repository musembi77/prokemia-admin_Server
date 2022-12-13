//quotations are emailed to products lister
const express = require("express");
//models imports
const Stats = require("../../models/Utils/Stats.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.send(401).send("Bad Request")

    const id = ""
    const stats = await Stats.findOne({_id:id});

	try{
        const quotation_object = {
            email_of_requester : payload.email_of_requester,
            email_of_lister :    payload.email_of_lister,
            description :        payload.description,
            volume :             payload.volume,
            unit :               payload.unit,
        }
		//function to send quotation object as email to lister of the product

        const count = stats.quotations

        const query = {_id:id};
        const update = { $set: {
            quotations: count + 1,
        }};
        const options = { };
        
        await Stats.updateOne( query, update, options).then((response)=>{
            return res.status(200).send("success")
        })
		//return res.status(200).send("successfully created a quotation")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not create a quotation")
	}
})

module.exports = router;