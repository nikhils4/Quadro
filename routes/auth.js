const router = require("express").Router();
const userProfile = require("../model/model.js").userProfile;
const hashAndReturn = require("../model/helpers.js").hashAndReturn;




router.post("/signup", (request, response) => {

    let profile = new userProfile({
        FIRSTNAME : request.body.firstname,
        LASTNAME : request.body.lastname,
        EMAIL : request.body.email,
        USERNAME : request.body.username,
        PASSWORD : hashAndReturn(request.body.password)
    })

    profile.save((err, data) => {
        if (err){
            if (err.code === 11000){
                console.log("The given email id is already registered with us")
                response.send("The given email id is already registered with us")
            } else {
                console.log("There was some error saving the profile details", err)
                response.send("There was some error signing you up :<")
            }
        } else {
            console.log("Profile saved in the database")
            response.send("Data successfully saved")
        }
    })
    
    

})


module.exports = router;