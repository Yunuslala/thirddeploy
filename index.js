const express=require("express");
const app=express();
const connection=require("./Config/db")
require('dotenv').config();
const cors=require("cors")
const {userRouter}=require("./Router/User");
const {flightRouter}=require("./Router/flight");
const {bookingRouter}=require("./Router/booking")
app.use(cors());
app.use(express.json());
app.use(flightRouter);
app.use(userRouter);
app.use(bookingRouter)






app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected");
    }
    console.log(`http://localhost:${process.env.port}`);
})