const router = require("express").Router();
const jwt = require("jsonwebtoken");
const userProfile = require("../model/model.js").userProfile;
const helpers = require("../model/helpers.js");


router.post("/signup", (request, response) => {

    if (!helpers.emailValidate(request.body.email)){
        console.log("There was error validating your email id")
        response.send("There was error validating your email id")
    } else {

        let profile = new userProfile({
            FIRSTNAME : request.body.firstname,
            LASTNAME : request.body.lastname,
            EMAIL : request.body.email,
            USERNAME : request.body.username,
            PASSWORD : helpers.hashAndReturn(request.body.password)
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


router.post("/login",  (request, response) => {
    
    userProfile.findOne({
        USERNAME : request.body.username
    }, (err, data) => {
        if (err) {
            console.log("There was error fetching the details", err)
        } else if (data == null || data == undefined){
            console.log("No such user exist try signing up first")
            response.send("No such user exist try signing up first")
        }
        else {
            if ((helpers.passwordAuth(data.PASSWORD, request.body.password))){
                const payload = {"username" : request.body.username};
                let token = jwt.sign(payload, process.env.SECRET);
                response.cookie('sessionJWT', token, { httpOnly: true});
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