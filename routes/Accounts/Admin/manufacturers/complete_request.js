//modules import
const express = require('express');
//models import
const Requests = require("../../../../models/Manufacturer/Manufacturer_Request.js");

let router = express.Router()

router.post('/',async(req,res)=>{
    const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }
    const id = payload._id //get the Request id

	const existing_Request = await Requests.findOne({_id:id}) //checks if a request already exists

    console.log(existing_Request)

	if (existing_Request != null)
		try{
			const query = {_id:id};
	        const update = { $set: {
	            complete_request:   true,
	        }};
	        const options = { };
	        
	        await Requests.updateOne( query, update, options).then((response)=>{
				return res.status(200).send("success")
			})	
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not complete_request at the moment");
		}
	else{
		return res.status(500).send("could not find this request, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;