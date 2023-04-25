const express = require("express");
const { bookingModel } = require("../Models/booking.model");
const bookingRouter = express.Router();
const { flightModel } = require("../Models/flight.model");
const { userModel } = require("../Models/user.model")
const { validator } = require("../Middlewares/loginvalidator");

bookingRouter.post("/api/booking", validator, async (req, res) => {
    try {
        let { arrival } = req.body;
        let userId = req.body.userId;
        let findFlight = await flightModel.find({ arrival });
        console.log(userId);
        if (findFlight) {
            let flightid = findFlight[0]._id
            flightid = flightid.toString()
            console.log("flightid", findFlight[0]._id);
            let bookedFlight = bookingModel({ user: userId, flight: flightid });
            await bookedFlight.save();
            res.status(201).send({ "msg": "flight has been booked", bookedFlight })
        } else {
            res.status(409).send({ "msg": "flight is not available" })
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send({ "msg": error })
    }
});
bookingRouter.get("/api/dashboard", async (req, res) => {
    try {
        let data = await bookingModel.aggregate([
            {
                $lookup: {
                    from: "userModel",
                    foreignField: "_id",
                    localField: "user",
                    as: "userdetail"
                }
            },
            {
                $lookup: {
                    from: "flightModel",
                    foreignField: "_id",
                    localField: "flight",
                    as: "flightdetail"
                }
            },
            {
                $project: {
                    "_id": 1,
                    "userdetail": {$arrayElemAt:["$userdetail",0]},
                    "flightdetail": {$arrayElemAt:["$flightdetail",0]},
                }
            },
        ]);
        console.log(data);
        res.status(201).send(data)
    } catch (error) {
        console.log(error);
        res.send({"msg":error})
    }
})
module.exports = {
    bookingRouter
}