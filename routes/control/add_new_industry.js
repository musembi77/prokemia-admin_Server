const express = require("express");
const Industry = require("../../models/Utils/Industry.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload){
		return res.status(401).send("No payload was found")
	}

	const allowed_scope_roles = ['IT','Manager','Supervisor','Sales']
    if (!allowed_scope_roles.includes(payload.auth_role)){
        return res.status(401).send("You are not assigned the role to add industries, kindly contact the Administrator")
    }

    //let tt = payload.title?.toLowerCase()
    //console.log(tt)
    const existing_industries = await Industry.find();
    const filtered_results = existing_industries.filter((ind)=> ind.title.toLowerCase() === payload.title?.toLowerCase());
    if (filtered_results.length === 0){
    	try{
			const new_Industry = await Industry.create({
				title:						payload.title,
				description: 				payload.description,
				cover_image: 				payload.cover_image,
				verification_status:			true, 
			})
			return res.status(200).send("successfully added a new industry")
		}catch(err){
			console.log(err)
			return res.status(500).send("Could not add a new industry,try again in a few minutes")
		}
    }else{
    	return res.status(401).send("This industry already exists");
    }
	
})

module.exports = router;