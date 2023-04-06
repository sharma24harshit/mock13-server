const express = require('express');
const {DoctorModel} = require('../Models/Appointment.model');

const AppointmentRouter= express.Router();
//-------------------------------------  GET   ---------------------------------------//
AppointmentRouter.get("/", async(req,res)=>{
    try {
        const data = await DoctorModel.find();
            res.send(data)
    } catch (error) {
        res.send({"msg":error.message});
    }
})
//-------------------------------------  POST   ---------------------------------------//
AppointmentRouter.post("/", async(req,res)=>{
    const date = new Date().toString();
    const {name, image, specialization,experience, location, slots,fee} = req.body
    try {
        const data = new DoctorModel({name,image,specialization,location,date,
            experience:Number(experience),slots:Number(slots),fee:Number(fee)});
            await data.save();
            res.send({"msg":"Data saved successfully"})
    } catch (error) {
        res.send({"msg":error.message});
    }
})

module.exports  = {AppointmentRouter}