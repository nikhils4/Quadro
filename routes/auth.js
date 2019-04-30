const router = require("express").Router();
const userProfile = require("../model/model.js").userProfile;
const hashAndReturn = require("../model/helpers.js").hashAndReturn;
const emailValidate = require("../model/helpers.js").emailValidate;
const passwordAuth = require("../model/helpers.js").passwordAuth;



router.post("/signup", (request, response) => {

    if (!emailValidate(request.body.email)){
        console.log("There was error validating your email id")
        response.send("There was error validating your email id")
    } else {

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

    }
})


router.post("/login", (request, response) => {

    userProfile.findOne({
        USERNAME : request.body.username
    }, (err, data) => {
        if (err) {
            console.log("There was error fetching the details", err)
        } else if (data == null || data == undefined){
            console.log("No such user exist try signing up first")
        }
        else {
            if ((passwordAuth(data.PASSWORD, request.body.password))){
                console.log("Success, the password matched successfully")
                response.send("Success, the password matched successfully")
            }
            else {
                console.log("The password didn't matched")
                response.send("The password didn't matched")
            }
        }
    })

})


module.exports = router;