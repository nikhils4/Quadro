const router = require("express").Router();
const userProfile = require("../model/model.js").userProfile;
const helpers = require("../model/helpers.js");

//NAME

router.post("/name", (request, response) => {
    if (request.decode == undefined){
        response.json({
            status : 400,
            message : "Login first, your session expired"
        })
    }
    userProfile.findOneAndUpdate({
        EMAIL : request.decode.email
    }, 
        { $set : {NAME : request.body.name}}
    ).then( res => {
        if (res){
            response.json({
                status : 200,
                message : "Successfully updated the profile - name"
            })  
        } else {
            response.json({
                status : 400,
                message : "There was error authenticating the user"
            })
        }
    }).catch( err => {
        response.json({
            status : 500,
            message : "There was some server error while updating your profile - name"
        })
    }) 
})


//PASSWORD


router.post("/password", (request, response) => {
    if (request.decode == undefined){
        response.json({
            status : 400,
            message : "Login first, your session expired"
        })
    }
    userProfile.findOneAndUpdate({
        EMAIL : request.decode.email
    }, 
        { $set : {PASSWORD : helpers.hashAndReturn(request.body.password)}}
    ).then( res => {
        if (res){
            response.json({
                status : 200,
                message : "Successfully updated the profile - password"
            })  
        } else {
            response.json({
                status : 400,
                message : "There was error authenticating the user"
            })
        }
    }).catch( err => {
        response.json({
            status : 500,
            message : "There was some server error while updating your profile - password"
        })
    }) 
})


//EXPERIENCE


router.post("/experience", (request, response) => {
    if (request.decode == undefined){
        response.json({
            status : 400,
            message : "Login first, your session expired"
        })
    }
    userProfile.findOneAndUpdate({
        EMAIL : request.decode.email
    }, 
        { $set : {EXPERIENCE : request.body.experience}}
    ).then( res => {
        if (res){
            response.json({
                status : 200,
                message : "Successfully updated the profile - experience"
            })  
        } else {
            response.json({
                status : 400,
                message : "There was error authenticating the user"
            })
        }
    }).catch( err => {
        response.json({
            status : 500,
            message : "There was some server error while updating your profile - experience"
        })
    }) 
})


//DOMAIN


router.post("/domain", (request, response) => {
    if (request.decode == undefined){
        response.json({
            status : 400,
            message : "Login first, your session expired"
        })
    }
    userProfile.findOneAndUpdate({
        EMAIL : request.decode.email
    }, 
        { $set : {DOMAIN : request.body.domain}}
    ).then( res => {
        if (res){
            response.json({
                status : 200,
                message : "Successfully updated the profile - domain"
            })  
        } else {
            response.json({
                status : 400,
                message : "There was error authenticating the user"
            })
        }
    }).catch( err => {
        response.json({
            status : 500,
            message : "There was some server error while updating your profile - domain"
        })
    }) 
})


//SHORT DESCRIPTION


router.post("/description", (request, response) => {
    if (request.decode == undefined){
        response.json({
            status : 400,
            message : "Login first, your session expired"
        })
    }
    userProfile.findOneAndUpdate({
        EMAIL : request.decode.email
    }, 
        { $set : {DESCRIPTION : request.body.description}}
    ).then( res => {
        if (res){
            response.json({
                status : 200,
                message : "Successfully updated the profile - description"
            })  
        } else {
            response.json({
                status : 400,
                message : "There was error authenticating the user"
            })
        }
    }).catch( err => {
        response.json({
            status : 500,
            message : "There was some server error while updating your profile - description"
        })
    }) 
})


module.exports = router;