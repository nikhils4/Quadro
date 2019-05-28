const router = require("express").Router();

router.get("/", (request, response) => {
    console.log("Connected route");
    response.send("Hello this is great ");
})

router.get("/about", (request, response) => {
    response.json({
        status : 200,
        message : "This is the about route"
    })
})

router.get("/theteam", (request, response) => {
    response.send("This is the team route")
})

router.get("/signup", (request, response) => {
    response.send("This is the signup route")
})

router.get("/login", (request, response) => {
    response.send("This is the login route")
})

router.get("/logout", (request, response) => {
    response.clearCookie("sessionJWT");
    response.send("You have been successfully logged out");
});

router.get("/*", (request, response) => {
    response.json({
        status : 404,
        message : "Nothing found here"
    }) 
})

module.exports = router;