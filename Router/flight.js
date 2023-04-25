const express=require("express");
const flightRouter=express.Router();
const {flightModel}=require("../Models/flight.model");

flightRouter.post("/api/flights",async(req,res)=>{
    try {
        let {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price}=req.body;
        if(!airline||!flightNo||!departure||!arrival||!departureTime||!arrivalTime||!seats||!price){
            res.status(401).send({"msg":"provide all the details for registering a flight"})
        }else{
            const data={airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price};
            const flightData= flightModel(data);
            await flightData.save();
            res.status(201).send({"msg":"flight has been registered"})
        }
    } catch (error) {
        console.log("error",error);
        res.status(500).send({"msg":error})
    }
});
flightRouter.get("/api/flights",async(req,res)=>{
    try {
        let flightData=await flightModel.find();
        res.status(200).send(flightData)
    } catch (error) {
        console.log("error",error);
        res.status(500).send({"msg":error})
    }
})
flightRouter.get("/api/flights/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let flightData=await flightModel.findById({_id:id});
        if(flightData.length==0){
            res.status(409).send({"msg":"id is not valid"})
        }else{
            res.status(200).send(flightData)
        }
    } catch (error) {
        console.log("error",error);
        res.status(500).send({"msg":error})
    }
})
flightRouter.delete("/api/flights/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let flightData=await flightModel.findByIdAndDelete({_id:id});
        res.status(202).send({"msg":"particular flight has been deleted"})
    } catch (error) {
        console.log("error",error);
        res.status(500).send({"msg":error})
    }
});
flightRouter.patch("/api/flights/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        const updataedata=req.body
        let flightData=await flightModel.findByIdAndUpdate({_id:id},updataedata);
        if(flightData.length==0){
            res.status(409).send({"msg":"id is not valid"})
        }else{
            res.status(204).send({"msg":"particular flight data has been updated"})
        }
    } catch (error) {
        console.log("error",error);
        res.status(500).send({"msg":error})
    }
});
module.exports={
    flightRouter
}