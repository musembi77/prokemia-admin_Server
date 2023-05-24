//modules imports
const express = require('express');
//models imports
const Admin_Role = require("../../../../models/Admin/Admin_scope_roles.js");
const Role_Verifier = require("../../../../controllers/role_verifier.js")

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 
	//console.log(payload)
	if (!payload)
		return res.status(400).send("Bad Request")

	//check if an admin user is authorised
    const verify_role_payload = {
        task:'roles',
        sub_task: 'edit_roles',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);

	if (!verified_result){
        return res.status(401).send("You are not authorized to edit roles, kindly contact the administrator or support for any issues");
    }else{
		const id = payload._id;
		const existing_role = await Admin_Role.findOne({_id:id})
		//console.log(existing_admin)
		if (existing_role)
			try{
				const query = {_id:id};
				const update = { $set: {
					title:		    payload.title,
					description: 	payload.description,
					scope:          payload.scope,
				}};
				const options = { };
				
				await Admin_Role.updateOne( query, update, options).then((response)=>{
					return res.status(200).send(`successfully edited ${payload?.title}`)
				}).catch((err)=>{
					console.log(err)
				})
			}catch(err){
				console.log(err)
				return res.status(500).send("Could not edit this role, try again in a few minutes");
			}
		else{
			return res.status(500).send("could not find this role,or this role exists.");
		}
    }
})

module.exports = router;