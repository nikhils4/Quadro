const router = require("express").Router();

router.get("/private", (request, response) => {
    response.json({
        status : 200,
        message : "This is the page displayed after authentication"
    })
})

module.exports = router;