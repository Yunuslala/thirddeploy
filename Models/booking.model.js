const mongoose=require("mongoose");

const bookingSchema=mongoose.Schema({
    user : String,
    flight : String

});

const bookingModel=mongoose.model("booking",bookingSchema);

module.exports={
    bookingModel
}