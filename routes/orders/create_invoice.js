const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};
// const express = require("express");
// const Order = require("../../models/Order.js");
// const easyinvoice = require('easyinvoice');
// var fs = require("fs");

// const router = express.Router()

// router.post("/",async(req,res)=>{
// 	const order = req.body;

// 	if (!order)
// 		return res.send(401).send("Bad Request")

// 	const data = {
//     // Customize enables you to provide your own templates
//     // Please review the documentation for instructions and examples
//     "customize": {
//         //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
//     },
//     "images": {
//         // The logo on top of your invoice
//         logo: fs.readFileSync('Pro.png', 'base64'),
//         // The invoice background
//         //"background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
//     },
//     // Your own data
//     "sender": {
//         "company": "Sample Corp",
//         "address": "Sample Street 123",
//         "zip": "1234 AB",
//         "city": "Sampletown",
//         "country": "Samplecountry"
//         //"custom1": "custom value 1",
//         //"custom2": "custom value 2",
//         //"custom3": "custom value 3"
//     },
//     // Your recipient
//     "client": {
//         "company": "Client Corp",
//         "address": "Clientstreet 456",
//         "zip": "4567 CD",
//         "city": "Clientcity",
//         "country": "Clientcountry"
//         // "custom1": "custom value 1",
//         // "custom2": "custom value 2",
//         // "custom3": "custom value 3"
//     },
//     "information": {
//         // Invoice number
//         "number": "2021.0001",
//         // Invoice data
//         "date": "12-12-2021",
//         // Invoice due date
//         "due-date": "31-12-2021"
//     },
//     // The products you would like to see on your invoice
//     // Total values are being calculated automatically
//     "products": [
//         {
//             "quantity": 2,
//             "description": "Product 1",
//             "tax-rate": 6,
//             "price": 33.87
//         },
//         {
//             "quantity": 4.1,
//             "description": "Product 2",
//             "tax-rate": 6,
//             "price": 12.34
//         },
//         {
//             "quantity": 4.5678,
//             "description": "Product 3",
//             "tax-rate": 21,
//             "price": 6324.453456
//         }
//     ],
//     // The message you would like to display on the bottom of your invoice
//     "bottom-notice": "Kindly pay your invoice within 15 days.",
//     // Settings to customize your invoice
//     "settings": {
//         "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
//         // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
//         // "tax-notation": "gst", // Defaults to 'vat'
//         // "margin-top": 25, // Defaults to '25'
//         // "margin-right": 25, // Defaults to '25'
//         // "margin-left": 25, // Defaults to '25'
//         // "margin-bottom": 25, // Defaults to '25'
//         // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
//         // "height": "1000px", // allowed units: mm, cm, in, px
//         // "width": "500px", // allowed units: mm, cm, in, px
//         // "orientation": "landscape", // portrait or landscape, defaults to portrait
//     },
//     // Translate your invoice to your preferred language
//     "translate": {
//         // "invoice": "FACTUUR",  // Default to 'INVOICE'
//         // "number": "Nummer", // Defaults to 'Number'
//         // "date": "Datum", // Default to 'Date'
//         // "due-date": "Verloopdatum", // Defaults to 'Due Date'
//         // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
//         // "products": "Producten", // Defaults to 'Products'
//         // "quantity": "Aantal", // Default to 'Quantity'
//         // "price": "Prijs", // Defaults to 'Price'
//         // "product-total": "Totaal", // Defaults to 'Total'
//         // "total": "Totaal" // Defaults to 'Total'
//     },
// };

// 	try{
// 		easyinvoice.createInvoice(data, function (result) {
// 		    //The response will contain a base64 encoded PDF file
// 		    //fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
// 		    //console.log('PDF base64 string: ', result.pdf);
//             return res.status(200).send(result.pdf)
// 		});
		
		
// 	}catch(err){
// 		console.log(err)
// 		return res.status(500).send("Could not created order")
// 	}
// })

// module.exports = router;