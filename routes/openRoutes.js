const router = require("express").Router();

router.get("/home", (request, response) => {
    console.log("Connected route");
    response.send("Hello this is great ");
})

module.exports = router;