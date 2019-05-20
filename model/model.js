const mongoose = require("mongoose");

const userProfile = new mongoose.Schema({
    NAME : {
        type : String,
        required : true,
        lowercase : true
    },
    EMAIL : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    DOB : {
        type : Date,
        required : true,
    },
    GENDER : {
        type : String,
        required : true,
        lowercase : true
    },
    EXPERIENCE : {
        type : Number,
        required : true
    },
    DOMAIN : {
        type : String,
        required : true, 
        lowercase : true
    },
    PASSWORD : {
        type : String,
        required : true
    },
    DESCRIPTION : {
        type : String,
        default : "No description provided"
    },
    IMAGE : {
        type : String,
        required : true
    }
}) 



module.exports.userProfile = mongoose.model("userProfile", userProfile);