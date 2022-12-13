//modules imports
const express = require("express");
//models imports
const Vacancy = require("../../models/Admin/Vacancies.js");

const router = express.Router()

router.get("/",async(req,res)=>{
    try{
        const vacancies = await Vacancy.find();
        return res.status(200).json(vacancies);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;