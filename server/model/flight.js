const mongoose = require("mongoose");

const flightSchema= mongoose.Schema({

    Flight_No:{
        type:String,
        unique : true,
        required:true
    },

    From:{
        type:String,
        required:true
    },
    To:{ 
        type:String,
        required:true
    },
    DateD:{
        type:Date,
        required:true
    },
    DateA:{
        type:Date,
        required:true
    },
    FirstSeats:{
        type:Number,
        required:true
    },

    BusinessSeats:{
        type:Number,
        required:true
    },
    EconomySeats:{
        type:Number,
        required:true
    }
});

const flight =mongoose.model('flight',flightSchema);

module.exports= flight;
