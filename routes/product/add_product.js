//modules import
const express = require("express");
//models import
const Product = require("../../models/Utils/Product.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;
	
	if (!payload)
		return res.send(401).send("Bad Request")

	try{
		//console.log(payload)
		console.time("new_Product")
		const new_Product = await Product.create({
			name_of_product: 					payload.name_of_product,
			manufactured_by: 					payload.manufactured_by,
			distributed_by:						payload.distributed_by,
			manufactured_date: 					payload.manufactured_date,
			description_of_product:				payload.description_of_product,
			chemical_name:  					payload.chemical_name,
			function:							payload.function,
			brand:								payload.brand,
			data_sheet:							payload.data_sheet,
			safety_data_sheet:					payload.safety_data_sheet,
			formulation_document: 				payload.formulation_document,
			features_of_product:				payload.features_of_product,
			application_of_product:				payload.application_of_product,
			packaging_of_product:				payload.packaging_of_product,
			storage_of_product:					payload.storage_of_product,
			sponsored:							false,
			industry: 							payload.industry,
			technology: 						payload.technology,
			email_of_lister: 					payload.email_of_lister,
			short_on_expiry: 					payload.short_on_expiry,
			listed_by_id:						payload.listed_by_id,
			website_link_to_Seller: 			payload.website_link_to_Seller,
			verification_status:				false,
		})
		console.timeEnd("new_Product")
		return res.status(200).send("successfully added a new product")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not add a new product")
	}
})

module.exports = router;