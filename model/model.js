const mongoose = require("mongoose");

const userProfile = new mongoose.Schema({
    FIRSTNAME : {
        type : String,
        required : true,
        lowercase : true
    },
    LASTNAME : {
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
    USERNAME : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    PASSWORD : {
        type : String,
        required : true
    }
}) 



module.exports.userProfile = mongoose.model("userProfile", userProfile);