const router = require("express").Router();
const jwt = require("jsonwebtoken");
const userProfile = require("../model/model.js").userProfile;
const helpers = require("../model/helpers.js");


router.post("/signup", (request, response) => {

    if (!helpers.emailValidate(request.body.email)){
        console.log("There was error validating your email id")
        response.json({
            status : 400,
            message : "There was error validating your email id"
        })
    } else {

        let profile = new userProfile({
            NAME : request.body.name,
            EMAIL : request.body.email,
            DOB : request.body.dob,
            GENDER : request.body.gender,
            PASSWORD : helpers.hashAndReturn(request.body.password),
            EXPERIENCE : request.body.experience,
            DOMAIN : request.body.skill,
        })
    
        profile.save((err, data) => {
            if (err){
                if (err.code === 11000){
                    console.log("The given email id is already registered with us")
                    response.json({
                        status : 400,
                        message : "The given email id is already registered with us"
                    })
                } else {
                    console.log("There was some error saving the profile details", err)
                    response.json({
                        status : 500,
                        message : "There was some error signing you up :<"
                    })
                }
            } else {
                console.log("Profile saved in the database")
                response.send({
                    status : 200,
                    message : "You were successfully signed up"
                })
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
            response.json({
                status : 500,
                message : "There was error fetching the details"
            })
        } else if (data == null || data == undefined){
            console.log("No such user exist try signing up first")
            response.json({
                status : 400,
                message : "No such user exist try signing up first"
            })
        }
        else {
            if ((helpers.passwordAuth(data.PASSWORD, request.body.password))){
                const payload = {"username" : request.body.username};
                let token = jwt.sign(payload, process.env.SECRET);
                response.cookie('sessionJWT', token, { httpOnly: true});
                console.log("Success, the password matched successfully")
                response.json({
                    status : 200,
                    token : token,
                    message : "Success, the password matched successfully"
                    // Pass other required data 
                })
            }
            else {
                console.log("The password didn't matched")
                response.json({
                    status : 400,
                    message : "The password entered by the user was wrong"
                })
            }
        }
    })

})



module.exports = router;