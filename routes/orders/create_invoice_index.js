const { createInvoice } = require("./create_invoice.js");
//modules imports
const express = require('express');
//models imports
const Order = require("../../models/Utils/Order.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload)
		return res.send(401).send("Bad Request")

	const invoice = {
			shipping: {
			name: "John Doe",
			address: "1234 Main Street",
			city: "San Francisco",
			state: "CA",
			country: "US",
			postal_code: 94111
		},
		items: [
			{
			  item: "TC 100",
			  description: "Toner Cartridge",
			  quantity: 2,
			  amount: 6000
			},
			{
			  item: "USB_EXT",
			  description: "USB Cable Extender",
			  quantity: 1,
			  amount: 2000
			}
		],
			subtotal: 8000,
			paid: 0,
			invoice_nr: 1234
		};
		createInvoice(invoice, "invoice.pdf")

	// try{
	// 	const result = createInvoice(invoice, "invoice.pdf")
		
	// 	return res.status(200).send(result)
	// }catch(err){
	// 	console.log(err)
	// 	return res.status(500).send("Could not create your invoice")
	// }
})

module.exports = router;