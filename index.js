const express = require('express');
const {connection} = require("./db");
require("dotenv").config();
const {UserRouterSignup}  = require("./Routes/UserRouter");
const {UserRouterLogin}  = require("./Routes/UserRouter");
const {AppointmentRouter}  = require("./Routes/AppointmentRouter");
const cors =require("cors");

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());

app.use("/signup",UserRouterSignup)
app.use("/login",UserRouterLogin)
app.use("/appointments",AppointmentRouter)
app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("server connected to db")
    } catch (error) {
        console.log(error) 
    }
    console.log("server running")
})