const router = require("express").Router();

router.get("/router", (request, response) => {
    console.log("Connected route");
    response.send("Hello this is great ");
})

module.exports = router;