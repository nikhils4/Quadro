const router = require("express").Router();



router.get("/private", (request, response) => {
    response.send("This is a private page")
})

module.exports = router;