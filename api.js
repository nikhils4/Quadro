// Installing all the dependencies
const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
require("hbs");
require("dotenv").config();

// connecting to the database
require("./model/connect.js")

// initialisation 
const router = express.Router()
const app = express();

// basic setup 
app.set('view engine', "hbs");
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//port 
const port = process.env.PORT || 3000;

// use router and mongoose for the backend 

// test route 
app.get("/", (req, res) => {
    res.status(200).render("test.hbs")
})

//open routes import 
const openRoutes = require("./routes/openRoutes.js");
app.use("/", openRoutes);

//auth routes import 
const authRoutes = require("./routes/auth.js");
app.use("/auth", authRoutes)

// random stuff 
console.log(app.use)


// script to run the server

app.listen(port, () => {
    console.log(`Server is up at ${port}`);
} )


