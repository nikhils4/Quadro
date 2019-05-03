const jwt = require("jsonwebtoken");

module.exports.session = (request, response, next) => {
    let token = request.cookies.sessionJWT;
    console.log(token);
    console.log("Token banate hain")
    if (token) {
        jwt.verify(token , process.env.SECRET , function (error , decode){
            console.log(decode);
            if (error) {
                response.send("The authentication failed, try logging")
            }
            else{
                request.decode = decode;
                next();
            }
        } )
    }
    else{
        response.send("This is private page, you cannot access it without authenticating yourself")
    }
}