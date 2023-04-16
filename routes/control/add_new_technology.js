const express = require("express");
const Technology = require("../../models/Utils/Technology.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload){
		return res.status(401).send("Bad Request")
	}

	const allowed_scope_roles = ['IT','Manager','Supervisor','Sales']
    if (!allowed_scope_roles.includes(payload.auth_role)){
        return res.status(401).send("You are not assigned the role to add technologies, kindly contact the Administrator")
    }

    const existing_technologies = await Technology.find();
    const filtered_results = existing_technologies.filter((ind)=> ind.title.toLowerCase() === payload.title?.toLowerCase());
    if (filtered_results.length === 0){
    	try{
			const new_Technology= await Technology.create({
				title:					payload.title,
				description: 				payload.description,
				cover_image: 			payload.cover_image,
				verification_status: 	true,
			})
			return res.status(200).send("successfully added a new technology")
		}catch(err){
			console.log(err)
			return res.status(500).send("Could not add a new technology")
		}
    }else{
    	return res.status(401).send("This technology already exists");
    }
})

module.exports = router;