//modules imports
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//models imports
const Admin = require('../../../../models/Admin/Admin.js');
const Role_Verifier = require("../../../../controllers/role_verifier.js")

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body;
    //console.log(payload.user_name)
    //check if all params are available
    if(!payload){
        return  res.status(201).send('Bad Request');
    }

    //check if an admin user is authorised
    const verify_role_payload = {
        task:'administrators',
        sub_task: 'add_user',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);
    //console.log(verified_result)
    if (!verified_result){
        return res.status(401).send("You are not authorized to add a user, kindly contact the administrator or support for any issues");
    }else{

        if(payload.admin_password !== 'prokemia@2022'){
            return  res.status(201).send('You entered the wrong password, contact the administrator or support incase of any issues');
        }
        //sign a token and encrypt password
        const salt = bcrypt.genSaltSync(10);
        const encrypted_password = bcrypt.hashSync("default@prokemia.com", salt);
        const user_name = payload.user_name

        const existing_admin = await Admin.findOne({user_name:user_name})

        if (!existing_admin){
            try{
                const token = jwt.sign(
                    {user_name},
                    process.env.TOKEN_ADMIN_KEY,
                    {
                        expiresIn: '2d'
                    }
                )
                ////console.log(token)
                const new_Admin = await Admin.create({
                    //user info
                    user_name:		        payload?.user_name,
                    user_image: 	        '',
                    user_email:             '',
                    user_mobile:            '',
                    //user role
                    role:			        payload.role,
                    //security
                    user_password:          encrypted_password,
                    access_token: 	        token,
                    login_status:	    false,
                    hub_access_status: 	false,
                    hub_account_id: 	'',
                })
                ////console.log(new_Admin)
                return res.status(200).send(`successfully added ${payload?.user_name}.`)
            }catch(err){
                return res.status(201).send('Could not create new admin-user at the moment, try again')
            }
        }else{
            return res.status(201).send("an account with this username already exists")
        }
    }
});

module.exports = router