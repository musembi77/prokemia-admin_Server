//modules imports
const express = require('express');
//models imports
const Admin_Role = require("../../../../models/Admin/Admin_scope_roles.js");
const Role_Verifier = require("../../../../controllers/role_verifier.js")
const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 
	//console.log(payload)

	if (!payload){
			return res.status(400).send("Bad Request")
	}


    //check if an admin user is authorised
    const verify_role_payload = {
        task:'roles',
        sub_task: 'delete_roles',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);
	
    if (!verified_result){
        return res.status(401).send("You are not authorized to delete roles, kindly contact the administrator or support for any issues");
    }else{
        const id = payload._id
		const existing_role = await Admin_Role.findOne({_id:id});
		
		try{
			if (!existing_role)
				return res.status(400).send("could not find this role")

			await Admin_Role.findOneAndDelete({_id:id} ).then((response)=>{
				return res.status(200).send("Sucessfully deleted")
			})
		}catch(err){
			console.log(err);
			return res.status(500).send("could not delete this role at the moment")
		}
    }

    
})

module.exports = router;